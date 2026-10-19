import { createReadStream } from "fs";
import { spawn } from "child_process";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dumpFile = path.join(__dirname, "nyle_dump.sql");

function getOption(name, defaultValue) {
  const argument = process.argv.find((value) => value.startsWith(`${name}=`));
  return argument ? argument.slice(name.length + 1) : defaultValue;
}

function databaseUrl(value, credentials = {}) {
  if (!value) {
    throw new Error("A database URL is required");
  }

  const normalized = value.trim().replace(/^jdbc:/i, "");
  const url = new URL(normalized);

  if (!["postgres:", "postgresql:"].includes(url.protocol)) {
    throw new Error(`Unsupported database URL protocol: ${url.protocol}`);
  }

  if (!url.username && credentials.username) {
    url.username = credentials.username;
  }
  if (!url.password && credentials.password) {
    url.password = credentials.password;
  }

  return url.toString();
}

function runDump(sourceUrl) {
  return new Promise((resolve, reject) => {
    const command = spawn(
      "pg_dump",
      [
        sourceUrl,
        "--clean",
        "--if-exists",
        "--no-owner",
        "--no-privileges",
        "--file",
        dumpFile,
      ],
      { stdio: ["ignore", "ignore", "pipe"] },
    );
    let errorOutput = "";

    command.stderr.on("data", (chunk) => {
      errorOutput += chunk.toString();
    });
    command.on("error", reject);
    command.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(errorOutput.trim() || `pg_dump exited with code ${code}`));
      }
    });
  });
}

function restoreDump(targetUrl) {
  return new Promise((resolve, reject) => {
    const input = createReadStream(dumpFile);
    const command = spawn(
      "psql",
      [targetUrl, "--set", "ON_ERROR_STOP=1", "--no-psqlrc"],
      { stdio: ["pipe", "ignore", "pipe"] },
    );
    let errorOutput = "";

    input.on("error", reject);
    command.stderr.on("data", (chunk) => {
      errorOutput += chunk.toString();
    });
    command.on("error", reject);
    command.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(errorOutput.trim() || `psql exited with code ${code}`));
      }
    });
    input.pipe(command.stdin);
  });
}

async function main() {
  const direction = getOption("--from", "neon-to-local").toLowerCase();
  const localUrl = databaseUrl(process.env.DATABASE_URL_LOCAL, {
    username: process.env.DATABASE_URL_LOCAL_USERNAME,
    password: process.env.DATABASE_URL_LOCAL_PASSWORD,
  });
  const neonUrl = databaseUrl(process.env.DATABASE_URL_NEON);

  const directions = {
    "neon-to-local": {
      source: neonUrl,
      target: localUrl,
      label: "Neon → local",
    },
    "local-to-neon": {
      source: localUrl,
      target: neonUrl,
      label: "local → Neon",
    },
  };
  const selected = directions[direction];

  if (!selected) {
    throw new Error(
      `Unknown direction "${direction}". Use --from=neon-to-local (default) or --from=local-to-neon.`,
    );
  }

  console.log(`Starting sync ${selected.label}...`);
  console.log(`Dumping source database to ${dumpFile}...`);
  await runDump(selected.source);
  console.log("Source database dump complete.");
  console.log("Restoring dump to target database...");
  await restoreDump(selected.target);
  console.log(`Database sync complete: ${selected.label}.`);
}

main().catch((error) => {
  console.error(`Database sync failed: ${error.message}`);
  process.exitCode = 1;
});
