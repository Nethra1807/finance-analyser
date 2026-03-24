import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'db.json');

async function ensureDb() {
  try {
    await readFile(DB_PATH, 'utf8');
  } catch (err) {
    const initialData = { users: [], transactions: [] };
    await writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
  }
}

export async function getDb() {
  await ensureDb();
  const data = await readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

export async function saveDb(data) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2));
}
