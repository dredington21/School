const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your database connection file

router.post('/staffs', (req, res) => {
    const { first_name, last_name, department_id } = req.body;
    const query = 'INSERT INTO staffs (first_name, last_name, department_id) VALUES (?, ?, ?)';
    db.query(query, [first_name, last_name, department_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send('Staff member added successfully');
    });
  });

  router.get('/staffs', (req, res) => {
    const query = 'SELECT * FROM staffs';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });

  router.get('/staffs/:staff_id', (req, res) => {
    const { staff_id } = req.params;
    const query = 'SELECT * FROM staffs WHERE staff_id = ?';
    db.query(query, [staff_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results[0]);
    });
  });

  router.put('/staffs/:staff_id', (req, res) => {
    const { staff_id } = req.params;
    const { first_name, last_name, department_id } = req.body;
    const query = 'UPDATE staffs SET first_name = ?, last_name = ?, department_id = ? WHERE staff_id = ?';
    db.query(query, [first_name, last_name, department_id, staff_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Staff member updated successfully');
    });
  });

  router.delete('/staffs/:staff_id', (req, res) => {
    const { staff_id } = req.params;
    const query = 'DELETE FROM staffs WHERE staff_id = ?';
    db.query(query, [staff_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Staff member deleted successfully');
    });
  });

  module.exports = router;