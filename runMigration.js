// runMigration.js - Run a specific migration file
import pool from './db/connect.js';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration(migrationFile) {
    try {
        console.log(`Running migration: ${migrationFile}`);

        const sqlPath = join(__dirname, 'migrations', migrationFile);
        const sql = await fs.readFile(sqlPath, 'utf-8');

        await pool.query(sql);

        console.log(`✅ Migration ${migrationFile} completed successfully`);
    } catch (error) {
        console.error(`❌ Migration failed:`, error);
        throw error;
    } finally {
        await pool.end();
    }
}

// Get migration file from command line argument
const migrationFile = process.argv[2];
if (!migrationFile) {
    console.error('Usage: node runMigration.js <migration-file>');
    console.error('Example: node runMigration.js 003_add_cart_tables.sql');
    process.exit(1);
}

runMigration(migrationFile);
