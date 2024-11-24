const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your database connection file

router.post('/users', (req, res) => {
    const { id, password, role } = req.body;
    const query = 'INSERT INTO users (id, password, role) VALUES (?, ?, ?)';
    db.query(query, [id, password, role], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send('User added successfully');
    });
  });

  router.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });

  router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results[0]);
    });
  });

  router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { password, role } = req.body;
    const query = 'UPDATE users SET password = ?, role = ? WHERE id = ?';
    db.query(query, [password, role, id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('User updated successfully');
    });
  });

  router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('User deleted successfully');
    });
  });

  module.exports = router;