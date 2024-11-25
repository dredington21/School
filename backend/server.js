const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'school'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database to find the user by username (or ID)
  const query = 'SELECT * FROM users WHERE id = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Assume user record contains the role (e.g., staff, advisor, student, instructor)
    const user = results[0];
    res.json({
      success: true,
      role: user.role, // or any other role field
      studentId: user.id, // Include the studentId (or id)
    });
  });
});



app.get('/', (req, res) => {
  res.send('Hello World!');
});

const studentsRoutes = require('./routes/students');
app.use('/api/students', studentsRoutes);


const usersRoutes = require('./routes/users');
app.use('/api', usersRoutes);

const staffsRoutes = require('./routes/staffs');
app.use('/api', staffsRoutes);

const logsRoutes = require('./routes/logs');
app.use('/api', logsRoutes);

const instructorsRoutes = require('./routes/instructors');
app.use('/api', instructorsRoutes);


const enrollmentsRoutes = require('./routes/enrollments');
app.use('/api', enrollmentsRoutes);

const departmentsRoutes = require('./routes/departments');
app.use('/api', departmentsRoutes);

const coursesRoutes = require('./routes/courses');
app.use('/api', coursesRoutes);


const classinfoRoutes = require('./routes/classinfo');
app.use('/api', classinfoRoutes);

const advisorsRoutes = require('./routes/advisors');
app.use('/api', advisorsRoutes);

const summariesRoutes = require('./routes/summaries');
app.use('/api', summariesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});