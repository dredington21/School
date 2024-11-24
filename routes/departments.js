const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your database connection file

router.post('/departments', (req, res) => {
    const { department_name, location, courses } = req.body;
    const query = 'INSERT INTO departments (department_name, location, courses) VALUES (?, ?, ?)';
    db.query(query, [department_name, location, courses], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send('Department added successfully');
    });
  });
  router.get('/departments', (req, res) => {
    const query = 'SELECT * FROM departments';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });
  router.get('/departments/:department_id', (req, res) => {
    const { department_id } = req.params;
    const query = 'SELECT * FROM departments WHERE department_id = ?';
    db.query(query, [department_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results[0]);
    });
  });
  router.put('/departments/:department_id', (req, res) => {
    const { department_id } = req.params;
    const { department_name, location, courses } = req.body;
    const query = 'UPDATE departments SET department_name = ?, location = ?, courses = ? WHERE department_id = ?';
    db.query(query, [department_name, location, courses, department_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Department updated successfully');
    });
  });
  router.delete('/departments/:department_id', (req, res) => {
    const { department_id } = req.params;
    const query = 'DELETE FROM departments WHERE department_id = ?';
    db.query(query, [department_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Department deleted successfully');
    });
  });

  module.exports = router;