import pool from './connect.js';

/**
 * Initialize all database tables in the correct order to respect foreign keys
 */
export const initDB = async () => {
    try {
        console.log(" Starting database initialization...");

        // 1. Users table (Base for many others)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                is_verified BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log(" Users table initialized");

        // 2. Vendors table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS vendors (
                id SERIAL PRIMARY KEY,
                legal_name VARCHAR(255),
                company_name VARCHAR(255),
                contact_person VARCHAR(255),
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(50),
                address TEXT,
                country VARCHAR(100),
                business_type VARCHAR(100),
                password VARCHAR(255),
                status VARCHAR(50) DEFAULT 'pending',
                is_verified BOOLEAN DEFAULT false,
                verification_token VARCHAR(255),
                verification_expires TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log(" Vendors table initialized");

        // 3. Vendor Leads table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS vendor_leads (
                id SERIAL PRIMARY KEY,
                full_name VARCHAR(255),
                business_name VARCHAR(255),
                email VARCHAR(255) NOT NULL,
                business_email VARCHAR(255),
                phone VARCHAR(50) NOT NULL,
                business_phone VARCHAR(50),
                location TEXT,
                country VARCHAR(100),
                latitude NUMERIC,
                longitude NUMERIC,
                type VARCHAR(20) DEFAULT 'kenyan',
                status VARCHAR(50) DEFAULT 'interested',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log(" Vendor Leads table initialized");

        // 4. User Locations table (References Users)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_locations (
                id SERIAL PRIMARY KEY,
                user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                name VARCHAR(100),
                address TEXT NOT NULL,
                latitude DECIMAL(10, 8),
                longitude DECIMAL(11, 8),
                is_default BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log(" User Locations table initialized");

        // 5. Partner Applications table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS partner_applications (
                id SERIAL PRIMARY KEY,
                partner_type VARCHAR(100) NOT NULL,
                partnership_tier VARCHAR(100),
                organization_name VARCHAR(255) NOT NULL,
                registration_number VARCHAR(255),
                year_established VARCHAR(100),
                business_size VARCHAR(100),
                website VARCHAR(255),
                linkedin VARCHAR(255),
                full_name VARCHAR(255) NOT NULL,
                job_title VARCHAR(255),
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                alternative_phone VARCHAR(50),
                country VARCHAR(100),
                city VARCHAR(100),
                address TEXT,
                description TEXT,
                services JSONB,
                target_markets JSONB,
                key_clients TEXT,
                annual_revenue VARCHAR(100),
                countries_of_operation JSONB,
                partnership_goals TEXT,
                expected_volume VARCHAR(100),
                integration_timeline VARCHAR(100),
                additional_info TEXT,
                status VARCHAR(50) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await pool.query(`
            ALTER TABLE partner_applications
            ADD COLUMN IF NOT EXISTS contacted_at TIMESTAMP,
            ADD COLUMN IF NOT EXISTS contacted_by INTEGER,
            ADD COLUMN IF NOT EXISTS termination_reason TEXT,
            ADD COLUMN IF NOT EXISTS termination_notice_sent_at TIMESTAMP,
            ADD COLUMN IF NOT EXISTS termination_deadline TIMESTAMP,
            ADD COLUMN IF NOT EXISTS terminated_at TIMESTAMP
        `);
        console.log("Partner Applications table initialized");

        // 6. Reported Issues table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS reported_issues (
                id SERIAL PRIMARY KEY,
                reporter_name VARCHAR(255),
                reporter_email VARCHAR(255),
                reporter_phone VARCHAR(50),
                issue_category_id INTEGER,
                issue_title VARCHAR(255),
                description TEXT NOT NULL,
                url TEXT,
                priority VARCHAR(20) DEFAULT 'normal',
                status VARCHAR(20) DEFAULT 'open',
                resolution_message TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await pool.query(`
            ALTER TABLE reported_issues
            ADD COLUMN IF NOT EXISTS reporter_name VARCHAR(255),
            ADD COLUMN IF NOT EXISTS reporter_phone VARCHAR(50),
            ADD COLUMN IF NOT EXISTS issue_category_id INTEGER,
            ADD COLUMN IF NOT EXISTS issue_title VARCHAR(255),
            ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'normal',
            ADD COLUMN IF NOT EXISTS resolution_message TEXT,
            ADD COLUMN IF NOT EXISTS url TEXT
        `);
        console.log(" Reported Issues table initialized");

        console.log(" Database initialization complete!");
    } catch (err) {
        console.error(" Database initialization failed:", err.message);
        throw err;
    }
};

