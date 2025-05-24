const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new address
router.post('/add', (req, res) => {
  const { user_id, address, pincode } = req.body;
  db.query(
    'INSERT INTO addresses (user_id, address, pincode) VALUES (?, ?, ?)',
    [user_id, address, pincode],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Address added successfully' });
    }
  );
});

// Get user addresses
router.get('/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  db.query(
    'SELECT * FROM addresses WHERE user_id = ?',
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

module.exports = router;
