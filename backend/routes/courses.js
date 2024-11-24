const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your database connection file

router.post('/courses', (req, res) => {
    const { course_prefix, course_number, department_id, credits, semesters } = req.body;
    const query = 'INSERT INTO courses (course_prefix, course_number, department_id, credits, semesters) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [course_prefix, course_number, department_id, credits, semesters], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send('Course added successfully');
    });
  });
  router.get('/courses', (req, res) => {
    const query = 'SELECT * FROM courses';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });
  router.get('/courses/:course_id', (req, res) => {
    const { course_id } = req.params;
    const query = 'SELECT * FROM courses WHERE course_id = ?';
    db.query(query, [course_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results[0]);
    });
  });
  router.put('/courses/:course_id', (req, res) => {
    const { course_id } = req.params;
    const { course_prefix, course_number, department_id, credits, semesters } = req.body;
    const query = 'UPDATE courses SET course_prefix = ?, course_number = ?, department_id = ?, credits = ?, semesters = ? WHERE course_id = ?';
    db.query(query, [course_prefix, course_number, department_id, credits, semesters, course_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Course updated successfully');
    });
  });
  router.delete('/courses/:course_id', (req, res) => {
    const { course_id } = req.params;
    const query = 'DELETE FROM courses WHERE course_id = ?';
    db.query(query, [course_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Course deleted successfully');
    });
  });

  module.exports = router;