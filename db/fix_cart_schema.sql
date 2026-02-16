-- Fix Cart Schema
BEGIN;

-- 1. Create cart_items table if not exists
CREATE TABLE IF NOT EXISTS public.cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES public.cart(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1 NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

-- 2. Clean up cart table (remove legacy columns if they exist)
-- Check if columns exist before dropping to avoid errors
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cart' AND column_name='product_id') THEN
        ALTER TABLE public.cart DROP COLUMN product_id;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cart' AND column_name='quantity') THEN
        ALTER TABLE public.cart DROP COLUMN quantity;
    END IF;
END $$;

COMMIT;
