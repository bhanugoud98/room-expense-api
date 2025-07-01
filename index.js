const express = require('express');
const cors = require('cors');
require('dotenv').config();
const expensesRoutes = require('./routes/expenses');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/expenses', expensesRoutes);

app.get('/', (req, res) => res.send('Room Expense Tracker API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

