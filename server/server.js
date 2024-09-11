const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// กำหนด CORS ให้อนุญาตการเข้าถึงจากโดเมนที่กำหนด
app.use(cors({
  origin: 'https://greenhouse-it.vercel.app', // เปลี่ยนเป็น URL ของแอปที่ deploy
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'greenhouse_it_msu',
  password: 'abc123greenhouse',
  database: 'greenhouse_it_msu',
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// ตรวจสอบการ login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.json({ success: false, message: 'Error occurred during login' });
    }

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.json({ success: false, message: 'Error occurred during password comparison' });
        }

        if (isMatch) {
          res.json({ success: true, message: 'Login successful' });
        } else {
          res.json({ success: false, message: 'Invalid username or password' });
        }
      });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});

// การเข้ารหัสรหัสผ่านใหม่ ก่อนเก็บในฐานข้อมูล
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.json({ success: false, message: 'Error occurred during password hashing' });
    }

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        return res.json({ success: false, message: 'Error occurred during registration' });
      }
      res.json({ success: true, message: 'Registration successful' });
    });
  });
});

// เริ่ม server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

