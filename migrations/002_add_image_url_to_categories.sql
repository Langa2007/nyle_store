-- Add image_url column to categories table if it doesn't exist
ALTER TABLE categories ADD COLUMN IF NOT EXISTS image_url TEXT;
