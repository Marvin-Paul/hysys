const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();
const JWT_EXPIRES = '7d';

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, first_name, last_name, company } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (exists.rows.length > 0) return res.status(409).json({ error: 'An account with this email already exists' });

    const hash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, company, role)
       VALUES ($1, $2, $3, $4, $5, 'user') RETURNING id, email, first_name, last_name, company, role`,
      [email.toLowerCase(), hash, first_name || '', last_name || '', company || '']
    );
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.status(201).json({ token, user: { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, company: user.company, role: user.role } });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({ token, user: { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, company: user.company, role: user.role } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// GET /api/auth/me
router.get('/me', require('../middleware/auth').authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, company, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/auth/profile
router.put('/profile', require('../middleware/auth').authenticateToken, async (req, res) => {
  try {
    const { first_name, last_name, company } = req.body;
    const result = await pool.query(
      'UPDATE users SET first_name=$1, last_name=$2, company=$3 WHERE id=$4 RETURNING id,email,first_name,last_name,company,role',
      [first_name, last_name, company, req.user.id]
    );
    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
