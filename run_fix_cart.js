import pool from "./db/connect.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runFix() {
    try {
        const sqlPath = path.join(__dirname, "db", "fix_cart_schema.sql");
        const sql = fs.readFileSync(sqlPath, "utf8");

        console.log("Executing SQL fix...");
        await pool.query(sql);
        console.log("SQL fix executed successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Error executing SQL fix:", err.message);
        process.exit(1);
    }
}

runFix();
