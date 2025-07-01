const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all expenses
router.get('/', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM expenses ORDER BY date DESC');
  res.json(rows);
});

// Add new expense
router.post('/', async (req, res) => {
  const { name, item, amount } = req.body;
  const { rows } = await db.query(
    'INSERT INTO expenses (name, item, amount) VALUES ($1, $2, $3) RETURNING *',
    [name, item, amount]
  );
  res.json(rows[0]);
});

module.exports = router;

