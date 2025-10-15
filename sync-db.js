import { exec } from "child_process";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dumpFile = path.join(__dirname, "nyle_dump.sql");

// ✅ Read from environment
const LOCAL_DB = process.env.DATABASE_URL_LOCAL;
const NEON_DB = process.env.DATABASE_URL_NEON;

// ✅ Validation
if (!LOCAL_DB || !NEON_DB) {
  console.error("❌ Missing DATABASE_URL_LOCAL or DATABASE_URL_NEON in .env");
  process.exit(1);
}

console.log("🚀 Starting sync between local → Neon...");
console.log("📦 Dumping local DB...");

// Step 1: Dump local database
exec(`pg_dump "${LOCAL_DB}" > "${dumpFile}"`, (dumpErr) => {
  if (dumpErr) {
    console.error("❌ Error dumping local DB:", dumpErr.message);
    return;
  }

  console.log("✅ Local DB dump complete:", dumpFile);
  console.log("☁️ Uploading dump to Neon...");

  // Step 2: Restore into Neon
  exec(`psql "${NEON_DB}" < "${dumpFile}"`, (restoreErr) => {
    if (restoreErr) {
      console.error("❌ Error restoring to Neon:", restoreErr.message);
      return;
    }

    console.log("✅ Neon DB successfully synced with local DB!");
    console.log("🧠 Your cloud database is now up-to-date with your local data.");
  });
});
