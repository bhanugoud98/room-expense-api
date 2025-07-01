import React, { useState } from 'react';

const API_URL = "https://room-expense-api.onrender.com/expenses";

function App() {
  const [name, setName] = useState("Aravind");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, item, amount: parseFloat(amount) })
    });
    const data = await res.json();
    alert("Expense Added: " + JSON.stringify(data));
    setItem("");
    setAmount("");
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h2>Room Expense Tracker</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Member:
          <select value={name} onChange={e => setName(e.target.value)}>
            <option>Aravind</option>
            <option>Manohar</option>
            <option>Mahesh</option>
            <option>Bhanu</option>
          </select>
        </label>
        <br /><br />

        <label>
          Item: <br />
          <input value={item} onChange={e => setItem(e.target.value)} required />
        </label>
        <br /><br />

        <label>
          Amount (₹): <br />
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
        </label>
        <br /><br />

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default App;

