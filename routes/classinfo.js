const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your database connection file

// Create a new class info entry
router.post('/classinfo', (req, res) => {
  const { instructor_id, course_id, semester } = req.body;
  const query = 'INSERT INTO classinfo (instructor_id, course_id, semester) VALUES (?, ?, ?)';
  db.query(query, [instructor_id, course_id, semester], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send('Class info added successfully');
  });
});

// Get all class info entries
router.get('/classinfo', (req, res) => {
  const query = 'SELECT * FROM classinfo';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Get a single class info entry by instructor ID and course ID
router.get('/classinfo/:instructor_id/:course_id', (req, res) => {
  const { instructor_id, course_id } = req.params;
  const query = 'SELECT * FROM classinfo WHERE instructor_id = ? AND course_id = ?';
  db.query(query, [instructor_id, course_id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});

// Update a class info entry by instructor ID and course ID
router.put('/classinfo/:instructor_id/:course_id', (req, res) => {
  const { instructor_id, course_id } = req.params;
  const { semester } = req.body;
  const query = 'UPDATE classinfo SET semester = ? WHERE instructor_id = ? AND course_id = ?';
  db.query(query, [semester, instructor_id, course_id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Class info updated successfully');
  });
});

// Delete a class info entry by instructor ID and course ID
router.delete('/classinfo/:instructor_id/:course_id', (req, res) => {
  const { instructor_id, course_id } = req.params;
  const query = 'DELETE FROM classinfo WHERE instructor_id = ? AND course_id = ?';
  db.query(query, [instructor_id, course_id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Class info deleted successfully');
  });
});

module.exports = router;