// controllers/ordersController.js
import pool from '../db/connect.js';

export const createOrder = async (req, res) => {
  try {
    const { user_id = null, items = [] } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'No items' });

    // compute total and create order
    let total = 0;
    // fetch product prices to validate
    const productIds = items.map(i => i.product_id);
    const { rows: products } = await pool.query('SELECT id, price FROM products WHERE id = ANY($1)', [productIds]);

    const priceMap = new Map(products.map(p => [p.id, Number(p.price)]));

    for (const it of items) {
      const price = priceMap.get(it.product_id) ?? 0;
      total += price * (it.quantity || 1);
    }

    const { rows } = await pool.query('INSERT INTO orders(user_id, total, status) VALUES($1,$2,$3) RETURNING *', [user_id, total, 'pending']);
    const order = rows[0];

    // insert order items
    const insertPromises = items.map(it =>
      pool.query('INSERT INTO order_items(order_id, product_id, quantity, unit_price) VALUES($1,$2,$3,$4)', [order.id, it.product_id, it.quantity, priceMap.get(it.product_id) || 0])
    );
    await Promise.all(insertPromises);

    res.status(201).json({ order_id: order.id, total, status: order.status });
  } catch (err) {
    console.error('createOrder failed', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const listOrders = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: 'user_id required' });

    const { rows } = await pool.query('SELECT id, total, status, created_at FROM orders WHERE user_id=$1 ORDER BY created_at DESC', [user_id]);
    res.json(rows);
  } catch (err) {
    console.error('listOrders failed', err);
    res.status(500).json({ error: 'Failed to list orders' });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM orders WHERE id=$1', [id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    const order = rows[0];
    const { rows: items } = await pool.query('SELECT oi.*, p.name, p.image FROM order_items oi LEFT JOIN products p ON p.id = oi.product_id WHERE oi.order_id=$1', [id]);
    res.json({ order, items });
  } catch (err) {
    console.error('getOrder failed', err);
    res.status(500).json({ error: 'Failed to get order' });
  }
};
