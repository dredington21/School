const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your database connection file

router.post('/logs', (req, res) => {
    const { timestamp, username, action_performed, data_affected } = req.body;
    const query = 'INSERT INTO logs (timestamp, username, action_performed, data_affected) VALUES (?, ?, ?, ?)';
    db.query(query, [timestamp, username, action_performed, data_affected], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send('Log entry added successfully');
    });
  });

  router.get('/logs', (req, res) => {
    const query = 'SELECT * FROM logs';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });

  router.get('/logs/:log_id', (req, res) => {
    const { log_id } = req.params;
    const query = 'SELECT * FROM logs WHERE log_id = ?';
    db.query(query, [log_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results[0]);
    });
  });

  router.put('/logs/:log_id', (req, res) => {
    const { log_id } = req.params;
    const { timestamp, username, action_performed, data_affected } = req.body;
    const query = 'UPDATE logs SET timestamp = ?, username = ?, action_performed = ?, data_affected = ? WHERE log_id = ?';
    db.query(query, [timestamp, username, action_performed, data_affected, log_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Log entry updated successfully');
    });
  });

  router.delete('/logs/:log_id', (req, res) => {
    const { log_id } = req.params;
    const query = 'DELETE FROM logs WHERE log_id = ?';
    db.query(query, [log_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Log entry deleted successfully');
    });
  });

  module.exports = router;