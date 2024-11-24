const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your database connection file

router.post('/enrollments', (req, res) => {
    const { student_id, course_id, semester, grade, year_taken } = req.body;
    const query = 'INSERT INTO enrollments (student_id, course_id, semester, grade, year_taken) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [student_id, course_id, semester, grade, year_taken], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send('Enrollment added successfully');
    });
  });

  router.get('/enrollments', (req, res) => {
    const query = 'SELECT * FROM enrollments';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });

  router.get('/enrollments/:student_id/:course_id', (req, res) => {
    const { student_id, course_id } = req.params;
    const query = 'SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?';
    db.query(query, [student_id, course_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results[0]);
    });
  });

  router.put('/enrollments/:student_id/:course_id', (req, res) => {
    const { student_id, course_id } = req.params;
    const { semester, grade, year_taken } = req.body;
    const query = 'UPDATE enrollments SET semester = ?, grade = ?, year_taken = ? WHERE student_id = ? AND course_id = ?';
    db.query(query, [semester, grade, year_taken, student_id, course_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Enrollment updated successfully');
    });
  });

  router.delete('/enrollments/:student_id/:course_id', (req, res) => {
    const { student_id, course_id } = req.params;
    const query = 'DELETE FROM enrollments WHERE student_id = ? AND course_id = ?';
    db.query(query, [student_id, course_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Enrollment deleted successfully');
    });
  });

  router.get('/enrollments/current/:student_id', (req, res) => {
    console.log('Request received');
    const { student_id } = req.params;
    console.log('Student ID:', student_id);
    const query = `
      SELECT * FROM enrollments 
      WHERE student_id = ? AND year_taken = 2024 
      AND semester = 'F';
    `;
    db.query(query, [student_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send(err);
        }
        console.log('Query results:', results);
        res.json(results);
    });
});

  module.exports = router;