// controllers/cartController.js
import pool from '../db/connect.js';

// Helper: getOrCreateCart by user_id or session_id
async function getOrCreateCart({ user_id, session_id }) {
  if (user_id) {
    const { rows } = await pool.query('SELECT * FROM carts WHERE user_id=$1 LIMIT 1', [user_id]);
    if (rows.length) return rows[0];
    const r = await pool.query('INSERT INTO carts(user_id) VALUES($1) RETURNING *', [user_id]);
    return r.rows[0];
  } else if (session_id) {
    const { rows } = await pool.query('SELECT * FROM carts WHERE session_id=$1 LIMIT 1', [session_id]);
    if (rows.length) return rows[0];
    const r = await pool.query('INSERT INTO carts(session_id) VALUES($1) RETURNING *', [session_id]);
    return r.rows[0];
  } else {
    // create anonymous cart with random session id
    const sid = `s_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
    const r = await pool.query('INSERT INTO carts(session_id) VALUES($1) RETURNING *', [sid]);
    return r.rows[0];
  }
}

export const getCart = async (req, res) => {
  try {
    const { user_id, session_id } = req.query;
    const cart = await getOrCreateCart({ user_id, session_id });
    const { rows } = await pool.query(
      `SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.image
       FROM cart_items ci
       LEFT JOIN products p ON p.id = ci.product_id
       WHERE ci.cart_id = $1`,
      [cart.id]
    );
    res.json({ cart_id: cart.id, items: rows });
  } catch (err) {
    console.error('getCart failed', err);
    res.status(500).json({ error: 'Failed to get cart' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1, user_id, session_id } = req.body;
    if (!product_id) return res.status(400).json({ error: 'product_id required' });

    const cart = await getOrCreateCart({ user_id, session_id });

    // if item exists, increment
    const { rows: existing } = await pool.query('SELECT id, quantity FROM cart_items WHERE cart_id=$1 AND product_id=$2', [cart.id, product_id]);
    if (existing.length) {
      const newQty = existing[0].quantity + quantity;
      await pool.query('UPDATE cart_items SET quantity=$1 WHERE id=$2', [newQty, existing[0].id]);
    } else {
      await pool.query('INSERT INTO cart_items(cart_id, product_id, quantity) VALUES($1,$2,$3)', [cart.id, product_id, quantity]);
    }

    const { rows } = await pool.query(
      `SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.image
       FROM cart_items ci LEFT JOIN products p ON p.id = ci.product_id
       WHERE ci.cart_id=$1`,
      [cart.id]
    );

    await pool.query('UPDATE carts SET updated_at = now() WHERE id=$1', [cart.id]);

    res.json({ cart_id: cart.id, items: rows });
  } catch (err) {
    console.error('addToCart failed', err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params; // cart_items id
    const { quantity } = req.body;
    if (quantity < 1) return res.status(400).json({ error: 'quantity must be >= 1' });
    await pool.query('UPDATE cart_items SET quantity=$1 WHERE id=$2', [quantity, id]);
    res.json({ ok: true });
  } catch (err) {
    console.error('updateCartItem failed', err);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM cart_items WHERE id=$1', [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error('removeCartItem failed', err);
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
};

// Sync cart: replace server cart items with provided items (client authoritative)
export const syncCart = async (req, res) => {
  try {
    const { user_id, session_id, items = [] } = req.body;
    const cart = await getOrCreateCart({ user_id, session_id });
    // clear existing
    await pool.query('DELETE FROM cart_items WHERE cart_id=$1', [cart.id]);
    const insertPromises = items.map(it =>
      pool.query('INSERT INTO cart_items(cart_id, product_id, quantity) VALUES($1,$2,$3)', [cart.id, it.product_id, it.quantity])
    );
    await Promise.all(insertPromises);
    await pool.query('UPDATE carts SET updated_at = now() WHERE id=$1', [cart.id]);

    const { rows } = await pool.query(
      `SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.image
       FROM cart_items ci LEFT JOIN products p ON p.id = ci.product_id
       WHERE ci.cart_id = $1`,
      [cart.id]
    );

    res.json({ cart_id: cart.id, items: rows });
  } catch (err) {
    console.error('syncCart failed', err);
    res.status(500).json({ error: 'Failed to sync cart' });
  }
};
