const fs = require('fs');
const https = require('https');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

// ตั้งค่า CORS ให้อนุญาตเฉพาะจาก Vercel domain
const corsOptions = {
  origin: 'https://greenhouse-it.vercel.app', // frontend domain
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// กำหนดการเชื่อมต่อกับฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: '45.91.133.140',
  port: 8081,
  user: 'greenhouse-it-msu',
  password: 'abc123greenhouse',
  database: 'greenhouse-it-msu',
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// กำหนด endpoint สำหรับ login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.json({ success: false, message: 'Error occurred during login' });
      return;
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});

// รันเซิร์ฟเวอร์ HTTP (ไม่มี SSL ตอนนี้)
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
