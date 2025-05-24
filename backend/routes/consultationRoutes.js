const express = require('express');
const router = express.Router();
const db = require('../db');

// Example mapping: You can later store this in a database
const symptomToMedicineMap = {
  "fever": [
    { name: "Paracetamol", dosage: "500mg twice a day" }
  ],
  "headache": [
    { name: "Aspirin", dosage: "300mg after food" }
  ],
  "cold": [
    { name: "Cetirizine", dosage: "10mg once at night" }
  ],
  "cough": [
    { name: "Benadryl", dosage: "2 tsp thrice a day" }
  ],
  "body pain": [
    { name: "Ibuprofen", dosage: "400mg twice a day" }
  ]
};

router.post('/', (req, res) => {
  const { name, symptoms } = req.body;

  // Match symptom
  const lowerSymptoms = symptoms.toLowerCase();
  let recommendedMedicines = [];

  for (const [symptom, meds] of Object.entries(symptomToMedicineMap)) {
    if (lowerSymptoms.includes(symptom)) {
      recommendedMedicines.push(...meds);
    }
  }

  // Save to DB
  const sql = 'INSERT INTO consultations (name, symptoms, medicines) VALUES (?, ?, ?)';
  db.query(sql, [name, symptoms, JSON.stringify(recommendedMedicines)], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Failed to save consultation" });
    }

    res.status(200).json({
      message: "Consultation submitted successfully!",
      medicines: recommendedMedicines
    });
  });
});

module.exports = router;
