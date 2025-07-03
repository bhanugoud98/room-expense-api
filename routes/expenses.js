const express = require('express');
const router = express.Router();
const db = require('../db');

// 🧾 Get all expenses
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM expenses ORDER BY date DESC');
    res.json(rows);
  } catch (err) {
    console.error("❌ GET /expenses failed:", err);
    res.status(500).send('Internal server error');
  }
});

// ➕ Add new expense
router.post('/', async (req, res) => {
  try {
    const { name, item, amount } = req.body;

    // ✅ Validate input
    if (!name || !item || typeof amount !== 'number') {
      console.warn("⚠️ Invalid input:", req.body);
      return res.status(400).send("Missing or invalid fields");
    }

    // ✅ Log the input
    console.log("📥 Adding expense:", req.body);

    const query = `
      INSERT INTO expenses (name, item, amount)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, item, amount];

    const result = await db.query(query, values);

    console.log("✅ Expense added:", result.rows[0]);
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("❌ POST /expenses failed:", err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;

