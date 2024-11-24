const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your database connection file

router.post('/advisors', (req, res) => {
    const { first_name, last_name, department_id } = req.body;
    const query = 'INSERT INTO advisors (first_name, last_name, department_id) VALUES (?, ?, ?)';
    db.query(query, [first_name, last_name, department_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send('Advisor added successfully');
    });
  });
  router.get('/advisors', (req, res) => {
    const query = 'SELECT * FROM advisors';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });
  router.get('/advisors/:advisor_id', (req, res) => {
    const { advisor_id } = req.params;
    const query = 'SELECT * FROM advisors WHERE advisor_id = ?';
    db.query(query, [advisor_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results[0]);
    });
  });
  router.put('/advisors/:advisor_id', (req, res) => {
    const { advisor_id } = req.params;
    const { first_name, last_name, department_id } = req.body;
    const query = 'UPDATE advisors SET first_name = ?, last_name = ?, department_id = ? WHERE advisor_id = ?';
    db.query(query, [first_name, last_name, department_id, advisor_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Advisor updated successfully');
    });
  });
  router.delete('/advisors/:advisor_id', (req, res) => {
    const { advisor_id } = req.params;
    const query = 'DELETE FROM advisors WHERE advisor_id = ?';
    db.query(query, [advisor_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Advisor deleted successfully');
    });
  });

  module.exports = router;