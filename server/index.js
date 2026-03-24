import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getDb, saveDb } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7777;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Authentication required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// --- Auth Routes ---

app.post('/api/signup', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  const db = await getDb();
  if (db.users.find(u => u.email === email)) return res.status(400).json({ message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), email, password: hashedPassword, name, initial_balance: 0 };
  db.users.push(newUser);
  await saveDb(db);

  const token = jwt.sign({ id: newUser.id, email }, JWT_SECRET, { expiresIn: '24h' });
  res.status(201).json({ token, user: { id: newUser.id, email, name, initial_balance: 0 } });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const db = await getDb();
  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, initial_balance: user.initial_balance } });
});

// --- Data Routes ---

app.get('/api/user', authenticateToken, async (req, res) => {
  const db = await getDb();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: user.id, email: user.email, name: user.name, initial_balance: user.initial_balance });
});

app.post('/api/user/balance', authenticateToken, async (req, res) => {
  const { balance } = req.body;
  const db = await getDb();
  const userIndex = db.users.findIndex(u => u.id === req.user.id);
  if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
  db.users[userIndex].initial_balance = balance;
  await saveDb(db);
  res.json({ message: 'Balance updated' });
});

app.get('/api/transactions', authenticateToken, async (req, res) => {
  const db = await getDb();
  const transactions = db.transactions.filter(t => t.user_id === req.user.id).sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(transactions);
});

app.post('/api/transactions', authenticateToken, async (req, res) => {
  const { amount, type, category, date, description } = req.body;
  const db = await getDb();
  const newTransaction = { id: Date.now(), user_id: req.user.id, amount, type, category, date, description };
  db.transactions.push(newTransaction);
  await saveDb(db);
  res.status(201).json(newTransaction);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
