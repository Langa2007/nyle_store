import pool from '../db/connect.js';

const defaultHeroSlides = [
  {
    title: 'Discover Amazing Products Daily',
    subtitle: 'Your premier destination for quality products from trusted vendors across Kenya.',
    image_url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop',
    button_text: 'Start Shopping',
    button_link: '#products',
    order_index: 0,
  },
  {
    title: 'Smart Home, Smart Living',
    subtitle: 'Experience the future with our curated collection of smart appliances.',
    image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    button_text: 'View Appliances',
    button_link: '#products',
    order_index: 1,
  },
  {
    title: 'Elevate Your Style',
    subtitle: 'New arrivals in fashion. Trendy, authentic, and affordable.',
    image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
    button_text: 'Browse Fashion',
    button_link: '#products',
    order_index: 2,
  },
  {
    title: 'Modern Tech Essentials',
    subtitle: 'Gadgets that power your productivity and entertainment.',
    image_url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop',
    button_text: 'Shop Tech',
    button_link: '#products',
    order_index: 3,
  },
  {
    title: 'Quality for Your Family',
    subtitle: 'Everything you need for a comfortable and happy home.',
    image_url: 'https://images.unsplash.com/photo-1556911220-e15201887572?q=80&w=2070&auto=format&fit=crop',
    button_text: 'Explore Home',
    button_link: '#products',
    order_index: 4,
  },
];

let heroSlidesInitPromise;

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

const seedDefaultHeroSlides = async () => {
  const countResult = await pool.query('SELECT COUNT(*)::int AS count FROM hero_slides');
  const slideCount = countResult.rows[0]?.count || 0;

  if (slideCount > 0) {
    return;
  }

  for (const slide of defaultHeroSlides) {
    await pool.query(
      `INSERT INTO hero_slides
       (title, subtitle, image_url, button_text, button_link, order_index, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        slide.title,
        slide.subtitle,
        slide.image_url,
        slide.button_text,
        slide.button_link,
        slide.order_index,
        true,
      ]
    );
  }

  console.log(' Seeded default hero slides for admin management');
};

const ensureHeroSlidesReady = async () => {
  if (!heroSlidesInitPromise) {
    heroSlidesInitPromise = (async () => {
      await createHeroSlideTable();
      await seedDefaultHeroSlides();
    })().catch((err) => {
      heroSlidesInitPromise = null;
      throw err;
    });
  }

  return heroSlidesInitPromise;
};

ensureHeroSlidesReady().catch((err) => {
  console.error(' Failed to initialize hero slides:', err.message);
});

export const createHeroSlide = async (data) => {
  await ensureHeroSlidesReady();
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
  await ensureHeroSlidesReady();
  let query = 'SELECT * FROM hero_slides';
  if (onlyActive) {
    query += ' WHERE is_active = true';
  }
  query += ' ORDER BY order_index ASC, created_at DESC';
  const result = await pool.query(query);
  return result.rows;
};

export const updateHeroSlide = async (id, data) => {
  await ensureHeroSlidesReady();
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
  await ensureHeroSlidesReady();
  const result = await pool.query('DELETE FROM hero_slides WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
