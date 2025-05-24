const express = require('express');
const cors = require('cors');
const path = require('path');

const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const addressRoutes = require('./routes/addressRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/prescription', prescriptionRoutes);
app.use('/api/consultation', consultationRoutes);

app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

app.get('/test', (req, res) => {
  res.json({ message: 'Working fine!' });
});

// ✅ Updated: Search medicines with dosage info
app.get("/api/medicines/search", (req, res) => {
  const query = req.query.query;
  if (!query) return res.json([]);

  const sql = "SELECT * FROM medicines WHERE name LIKE ? OR brand LIKE ?";
  const searchTerm = `%${query}%`;

  db.query(sql, [searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Server error" });
    }

    const dosageMap = {
      'Paracetamol': '500 mg',
      'Ibuprofen': '200 mg',
      'Amoxicillin': '250 mg',
      'Ciprofloxacin': '500 mg',
      'Cetirizine': '10 mg',
      'Azithromycin': '250 mg',
      'Metformin': '500 mg',
      'Pantoprazole': '40 mg',
      'Loratadine': '10 mg',
      'Dolo': '650 mg'
    };

    const resultsWithDosage = results.map(med => ({
      ...med,
      dosage: dosageMap[med.name] || 'Dosage info not available'
    }));

    res.json(resultsWithDosage);
  });
});

// OTP Send (simulation)
app.post('/api/otp/send', (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: 'Phone number required' });

  console.log(`Sending OTP to: ${phone}`);
  res.status(200).json({ message: `OTP sent to ${phone}` });
});

// Save Order
app.post("/api/order", (req, res) => {
  const { medicine, base_price, gst, delivery, total, payment_method } = req.body;

  const sql = `
    INSERT INTO orders (medicine, base_price, gst, delivery, total, payment_method) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [medicine, base_price, gst, delivery, total, payment_method], (err) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ message: "Failed to save order" });
    }
    res.status(200).json({ message: "Order saved successfully" });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
