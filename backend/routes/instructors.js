const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your database connection file

router.post('/instructors', (req, res) => {
    const { first_name, last_name, department_id } = req.body;
    const query = 'INSERT INTO instructors (first_name, last_name, department_id) VALUES (?, ?, ?)';
    db.query(query, [first_name, last_name, department_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send('Instructor added successfully');
    });
  });

  router.get('/instructors', (req, res) => {
    const query = 'SELECT * FROM instructors';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });

  router.get('/instructors/:instructor_id', (req, res) => {
    const { instructor_id } = req.params;
    const query = 'SELECT * FROM instructors WHERE instructor_id = ?';
    db.query(query, [instructor_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results[0]);
    });
  });

  router.get('/instructors/department/:instructor_id', (req, res) => {
    const { instructor_id } = req.params;
    const query = 'SELECT department_id FROM instructors WHERE instructor_id = ?';
    db.query(query, [instructor_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results[0]);
    });
  });


  router.put('/instructors/:instructor_id', (req, res) => {
    const { instructor_id } = req.params;
    const { first_name, last_name, department_id } = req.body;
    const query = 'UPDATE instructors SET first_name = ?, last_name = ?, department_id = ? WHERE instructor_id = ?';
    db.query(query, [first_name, last_name, department_id, instructor_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Instructor updated successfully');
    });
  });

  router.delete('/instructors/:instructor_id', (req, res) => {
    const { instructor_id } = req.params;
    const query = 'DELETE FROM instructors WHERE instructor_id = ?';
    db.query(query, [instructor_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Instructor deleted successfully');
    });
  });

  module.exports = router;