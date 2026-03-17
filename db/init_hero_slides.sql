-- db/init_hero_slides.sql
CREATE TABLE IF NOT EXISTS public.hero_slides (
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

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_hero_slides_is_active ON public.hero_slides(is_active);
CREATE INDEX IF NOT EXISTS idx_hero_slides_order ON public.hero_slides(order_index);
