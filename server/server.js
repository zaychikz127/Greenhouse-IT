const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: '192.168.247.38', // หรือ IP ของ server MySQL
  user: 'greenhouse_it_msu', // ชื่อผู้ใช้ MySQL
  password: 'abc123greenhouse', // รหัสผ่าน MySQL
  database: 'greenhouse_it_msu', // ชื่อฐานข้อมูล
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

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.json({ success: false, message: 'Error occurred during login' });
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});

// เริ่ม server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
