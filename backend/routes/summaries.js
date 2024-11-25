const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your database connection file



  router.get('/summaries/gpaRanking', (req, res) => {
    const query = `
        SELECT d.department_name, AVG(s.gpa) AS average_gpa
        FROM departments d
        LEFT JOIN students s
        ON d.department_id = s.department_id
        GROUP BY d.department_name
        ORDER BY COALESCE(average_gpa, 0) DESC;
    `;
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });

  router.get('/summaries/gpaBreakdown/:dept_id', (req, res) => {
    const { dept_id } = req.params;
    const query = `
        SELECT m.major_name, MAX(s.gpa) as max_gpa, AVG(s.gpa) AS average_gpa, MIN(s.gpa) as min_gpa
        FROM majors m
        LEFT JOIN students s
        ON m.major_id = s.major_id
        WHERE m.department_id = ?
        GROUP BY m.major_name;
    `;
    db.query(query, [dept_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });

  router.get('/summaries/courseHistory/:dept_id', (req, res) => {
    const { dept_id } = req.params;
    const query = `
      SELECT 
          c.course_prefix,
          c.course_number,
          e.semester,
          e.year_taken,
          COUNT(*) AS total_enrollments,
          AVG(
            CASE 
              WHEN e.grade = 'A' THEN 4
                    WHEN e.grade = 'S' THEN 4
              WHEN e.grade = 'B' THEN 3
                    WHEN e.grade = 'C' THEN 2
                    WHEN e.grade = 'D' THEN 1
                    WHEN e.grade = 'F' THEN 0
                    WHEN e.grade = 'U' THEN 0
                    WHEN e.grade = 'I' THEN 0
              ELSE 0
            END
          ) as avg_grade
      FROM enrollments e
      JOIN courses c ON e.course_id = c.course_id
      WHERE c.department_id = ?
      GROUP BY e.course_id, e.semester, e.year_taken
      ORDER BY e.year_taken, e.semester, e.course_id;
    `;
    db.query(query, [dept_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });




  module.exports = router;