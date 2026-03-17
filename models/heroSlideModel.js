import pool from '../db/connect.js';

export const createHeroSlideTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS hero_slides (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        subtitle TEXT,
        image_url TEXT NOT NULL,
        button_text VARCHAR(50) DEFAULT 'Shop Now',
        button_link VARCHAR(255) DEFAULT '/products',
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
    );
  `;
  try {
    await pool.query(query);
    console.log(" hero_slides table verified/created successfully");
  } catch (err) {
    console.error(" Failed to create hero_slides table:", err.message);
  }
};

createHeroSlideTable();

export const createHeroSlide = async (data) => {
  const { title, subtitle, image_url, button_text, button_link, order_index } = data;
  const result = await pool.query(
    `INSERT INTO hero_slides 
     (title, subtitle, image_url, button_text, button_link, order_index) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [title, subtitle, image_url, button_text || 'Shop Now', button_link || '/products', order_index || 0]
  );
  return result.rows[0];
};

export const getAllHeroSlides = async (onlyActive = false) => {
  let query = 'SELECT * FROM hero_slides';
  if (onlyActive) {
    query += ' WHERE is_active = true';
  }
  query += ' ORDER BY order_index ASC, created_at DESC';
  const result = await pool.query(query);
  return result.rows;
};

export const updateHeroSlide = async (id, data) => {
  const fields = [];
  const values = [];
  let idx = 1;

  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = $${idx}`);
    values.push(value);
    idx++;
  }

  if (fields.length === 0) return null;

  values.push(id);
  const query = `UPDATE hero_slides SET ${fields.join(', ')}, updated_at = now() WHERE id = $${idx} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteHeroSlide = async (id) => {
  const result = await pool.query('DELETE FROM hero_slides WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
