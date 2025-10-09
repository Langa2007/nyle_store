// models/usersModel.js
import pool from '../db/connect.js';

// ✅ Create a new user
export const createUser = async (name, email, hashedPassword) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password) 
     VALUES ($1, $2, $3) 
     RETURNING id, name, email, is_admin, created_at`,
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

// ✅ Get user by email (for login)
export const getUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0]; // returns undefined if not found
};

// ✅ Get user by ID
export const getUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, name, email, is_admin, created_at FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// ✅ Admin: Fetch all users (without passwords)
export const fetchAllUsers = async () => {
  const result = await pool.query(
    'SELECT id, name, email, is_admin, created_at FROM users ORDER BY id DESC'
  );
  return result.rows;
};

// ✅ Delete a user by ID
export const deleteUserById = async (id) => {
  const result = await pool.query(
    'DELETE FROM users WHERE id = $1 RETURNING id, name, email',
    [id]
  );
  return result.rows[0]; // null if user not found
};

// ✅ Promote a user to admin
export const promoteToAdmin = async (id) => {
  const result = await pool.query(
    'UPDATE users SET is_admin = true WHERE id = $1 RETURNING id, name, email, is_admin',
    [id]
  );
  return result.rows[0];
};
