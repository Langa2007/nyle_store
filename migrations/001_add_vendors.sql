-- 1) Vendors (companies)
CREATE TABLE IF NOT EXISTS vendors (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(150) NOT NULL,
  legal_name    VARCHAR(200),
  email         VARCHAR(150) UNIQUE NOT NULL,
  phone         VARCHAR(50),
  address       TEXT,
  status        VARCHAR(30) DEFAULT 'active', -- active | pending | suspended
  created_at    TIMESTAMP DEFAULT NOW()
);

-- 2) Vendor members (link users to vendors)
CREATE TABLE IF NOT EXISTS vendor_members (
  id            SERIAL PRIMARY KEY,
  vendor_id     INT NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  user_id       INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role          VARCHAR(30) NOT NULL, -- vendor_admin | vendor_staff
  UNIQUE (vendor_id, user_id)
);

-- 3) Products belong to vendors
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS vendor_id INT REFERENCES vendors(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_products_vendor ON products(vendor_id);

-- 4) Orders link to vendors through items
ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS vendor_id INT REFERENCES vendors(id) ON DELETE SET NULL;

-- 5) Payments and payout accounts
CREATE TABLE IF NOT EXISTS payments (
  id              SERIAL PRIMARY KEY,
  order_id        INT REFERENCES orders(id),
  provider        VARCHAR(50),           -- e.g., stripe, paystack
  provider_ref    VARCHAR(120),
  amount          NUMERIC(12,2) NOT NULL,
  currency        VARCHAR(10) DEFAULT 'KES',
  status          VARCHAR(30) DEFAULT 'pending', -- pending | succeeded | failed
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vendor_payout_accounts (
  id              SERIAL PRIMARY KEY,
  vendor_id       INT REFERENCES vendors(id) ON DELETE CASCADE,
  provider        VARCHAR(50),   -- stripe, paystack, flutterwave
  account_ref     VARCHAR(150),  -- connected_account id / subaccount code
  created_at      TIMESTAMP DEFAULT NOW(),
  UNIQUE (vendor_id, provider)
);
