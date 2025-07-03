import React, { useState, useEffect } from 'react';

const API_URL = "https://room-expense-api.onrender.com/expenses";

function App() {
  const [name, setName] = useState("Aravind");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch(API_URL.trim())
      .then(async (res) => {
        console.log("GET /expenses status:", res.status);
        const text = await res.text();
        console.log("Response text:", text);

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = JSON.parse(text);
        setExpenses(data);
      })
      .catch((err) => {
        console.error("🚨 Failed to load expenses:", err);
        alert("⚠️ Could not load expenses. Check console.");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!item || !amount) {
      alert("Please enter both item and amount.");
      return;
    }

    try {
      const payload = {
        name,
        item,
        amount: parseFloat(amount),
      };

      console.log("Sending:", payload);

      const res = await fetch(API_URL.trim(), {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("POST /expenses status:", res.status);
      const text = await res.text();
      console.log("Response text:", text);

      if (!res.ok) {
        alert("❌ Failed to add expense. Check console for details.");
        return;
      }

      alert("✅ Expense added");
      setItem("");
      setAmount("");

      const updated = await fetch(API_URL).then((r) => r.json());
      setExpenses(updated);
    } catch (err) {
      console.error("❌ Submit failed:", err);
      alert("Submit failed due to network or server error.");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>🏠 Room Expense Tracker</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <label>
          👤 Member:
          <select value={name} onChange={(e) => setName(e.target.value)} style={{ marginLeft: 10 }}>
            <option>Aravind</option>
            <option>Manohar</option>
            <option>Mahesh</option>
            <option>Bhanu</option>
          </select>
        </label>
        <br /><br />

        <label>
          🛒 Item:
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            style={{ width: '100%' }}
            required
          />
        </label>
        <br /><br />

        <label>
          💸 Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: '100%' }}
            required
          />
        </label>
        <br /><br />

        <button type="submit">Add Expense</button>
      </form>

      <h3>📅 Recent Expenses</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {expenses.map((exp) => (
          <li key={exp.id} style={{ padding: 8, borderBottom: '1px solid #ccc' }}>
            <strong>{exp.name}</strong> spent ₹{exp.amount} on <em>{exp.item}</em> ({exp.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


