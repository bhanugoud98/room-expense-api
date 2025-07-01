const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all expenses
router.get('/', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM expenses ORDER BY date DESC');
  res.json(rows);
});

// POST a new expense
router.post('/', async (req, res) => {
  const { name, item, amount } = req.body;
  const { rows } = await db.query(
    'INSERT INTO expenses (name, item, amount) VALUES ($1, $2, $3) RETURNING *',
    [name, item, amount]
  );
  res.json(rows[0]);
});

// Daily room total
router.get('/summary', async (req, res) => {
  const { rows } = await db.query(`
    SELECT date, SUM(amount) as total
    FROM expenses
    GROUP BY date
    ORDER BY date DESC
  `);
  res.json(rows);
});

// Per user summary
router.get('/summary/:name', async (req, res) => {
  const { name } = req.params;
  const { rows } = await db.query(`
    SELECT date, SUM(amount) as total
    FROM expenses
    WHERE name = $1
    GROUP BY date
    ORDER BY date DESC
  `, [name]);
  res.json(rows);
});

module.exports = router;

