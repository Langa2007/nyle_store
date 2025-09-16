const { pool } = require('../db/connect');

// Create tables if they don't exist
const createOrderTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        total_amount NUMERIC(10,2),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price NUMERIC(10,2)
      );
    `);

    console.log('✅ Orders and Order_Items tables created or already exist');
  } catch (err) {
    console.error('❌ Failed to create orders tables:', err.message);
  }
};

createOrderTables();

// Create a new order and its items
const createOrder = async (user_id, items, total_amount) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    let total = 0;

    // ✅ Check stock and calculate total
    for (const item of items) {
      const { product_id, quantity } = item;

      const productRes = await client.query('SELECT price, stock FROM products WHERE id = $1 FOR UPDATE', [product_id]);

      if (productRes.rows.length === 0) {
        throw new Error(`Product ID ${product_id} not found`);
      }

      const product = productRes.rows[0];
      if (product.stock < quantity) {
        throw new Error(`Insufficient stock for Product ID ${product_id}`);
      }

      total += parseFloat(product.price) * quantity;
    }

    // ✅ Insert into orders
    const orderRes = await client.query(
      'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id',
      [user_id, total]
    );
    const orderId = orderRes.rows[0].id;

    // ✅ Insert order_items and update stock
    for (const item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)',
        [orderId, item.product_id, item.quantity]
      );
      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    await client.query('COMMIT');
    return { order_id: orderId, total };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};


// Get all orders with items
const getAllOrders = async () => {
  const client = await pool.connect();
  try {
    const ordersRes = await client.query('SELECT * FROM orders ORDER BY created_at DESC');
    const orders = ordersRes.rows;

    for (const order of orders) {
      const itemsRes = await client.query(
        'SELECT product_id, quantity, price FROM order_items WHERE order_id = $1',
        [order.id]
      );
      order.items = itemsRes.rows;
    }

    return orders;
  } finally {
    client.release();
  }
};

// Get all orders for a specific user
const getOrdersByUser = async (userId) => {
  const client = await pool.connect();
  try {
    const ordersRes = await client.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    const orders = ordersRes.rows;

    for (const order of orders) {
      const itemsRes = await client.query(
        'SELECT product_id, quantity, price FROM order_items WHERE order_id = $1',
        [order.id]
      );
      order.items = itemsRes.rows;
    }

    return orders;
  } finally {
    client.release();
  }
};

// Update the status of an order
const updateStatus = async (orderId, status) => {
  await pool.query(
    'UPDATE orders SET status = $1 WHERE id = $2',
    [status, orderId]
  );
};

const getAllOrdersWithDetails = async () => {
  const result = await pool.query(`
    SELECT
      o.id AS order_id,
      o.created_at,
      o.total,
      u.id AS user_id,
      u.name AS user_name,
      u.email AS user_email,
      json_agg(json_build_object(
        'product_id', p.id,
        'product_name', p.name,
        'price', p.price,
        'quantity', oi.quantity
      )) AS items
    FROM orders o
    JOIN users u ON o.user_id = u.id
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    GROUP BY o.id, u.id
    ORDER BY o.created_at DESC
  `);

  return result.rows;
};


module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateStatus,
  getAllOrdersWithDetails
};
