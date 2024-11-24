const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your database connection file

router.post('/students', (req, res) => {
    const { first_name, last_name, department_id, gpa, total_credits } = req.body;
    const query = 'INSERT INTO students (first_name, last_name, department_id, gpa, total_credits) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [first_name, last_name, department_id, gpa, total_credits], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send('Student added successfully');
    });
  });

  router.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });

  router.get('/:student_id', (req, res) => {
    console.log('Request received');
    const { student_id } = req.params;
    console.log('Student ID:', student_id);
    const query = 'SELECT * FROM students WHERE student_id = ?';
    db.query(query, [student_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send(err);
        }
        console.log('Query results:', results);
        res.json(results[0]);
    });
});

  router.put('/students/:student_id', (req, res) => {
    const { student_id } = req.params;
    const { first_name, last_name, department_id, gpa, total_credits } = req.body;
    const query = 'UPDATE students SET first_name = ?, last_name = ?, department_id = ?, gpa = ?, total_credits = ? WHERE student_id = ?';
    db.query(query, [first_name, last_name, department_id, gpa, total_credits, student_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Student updated successfully');
    });
  });

  router.delete('/students/:student_id', (req, res) => {
    const { student_id } = req.params;
    const query = 'DELETE FROM students WHERE student_id = ?';
    db.query(query, [student_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Student deleted successfully');
    });
  });

  router.get('/students/:student_id/enrollments/current', (req, res) => {
    const { student_id } = req.params;
    const currentSemester = 'F'; // Example: Fall
    const currentYear = 2024;

    const query = `
        SELECT e.*, c.prefix, c.number, c.credits 
        FROM enrollments e
        JOIN courses c ON e.course_id = c.course_id
        WHERE e.student_id = ? AND e.year_taken = ? AND e.semester = ?;
    `;
    db.query(query, [student_id, currentYear, currentSemester], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get('/students/:student_id/enrollments/past', (req, res) => {
    const { student_id } = req.params;
    const currentSemester = 'F'; // Example: Fall
    const currentYear = 2024;

    const query = `
        SELECT e.*, c.prefix, c.number, c.credits 
        FROM enrollments e
        JOIN courses c ON e.course_id = c.course_id
        WHERE e.student_id = ? AND (e.year_taken < ? OR (e.year_taken = ? AND e.semester < ?));
    `;
    db.query(query, [student_id, currentYear, currentYear, currentSemester], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

  module.exports = router;
