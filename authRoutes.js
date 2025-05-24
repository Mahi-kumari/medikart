// authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Secret for JWT (keep this secure; move to environment variable for production)
const JWT_SECRET = 'your_secret_key'; 

// Signup Endpoint
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  
  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please enter all required fields.' });
  }

  try {
    // Hash the password (salt rounds: 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into the DB
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error during signup:', err);
        return res.status(500).json({ message: 'Error signing up. Please try again.' });
      }
      res.status(201).json({ message: 'Signup successful!' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during signup.' });
  }
});


// Signup Endpoint with duplicate error handling
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please enter all required fields.' });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      
      db.query(sql, [username, email, hashedPassword], (err, results) => {
        if (err) {
          // Check if error is a duplicate entry error
          if (err.code === 'ER_DUP_ENTRY') {
            if (err.sqlMessage.includes(username)) {
              return res.status(400).json({ message: 'Username already exists.' });
            }
            if (err.sqlMessage.includes(email)) {
              return res.status(400).json({ message: 'Email already exists.' });
            }
          }
          console.error('Error during signup:', err);
          return res.status(500).json({ message: 'Error signing up. Please try again.' });
        }
        res.status(201).json({ message: 'Signup successful!' });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error during signup.' });
    }
  });
  

// Login Endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter both email and password.' });
  }

  // Query user by email
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ message: 'Error logging in. Please try again.' });
    }
    
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare provided password with stored hashed password
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Create JWT token
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful!', token });
  });
});

module.exports = router;
