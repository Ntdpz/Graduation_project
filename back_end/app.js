const mysql = require('mysql');

// กำหนดค่าการเชื่อมต่อ MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'graduation_project',
});

// เชื่อมต่อกับ MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// ทำ query ตามต้องการ
connection.query('SELECT * FROM users', (error, results, fields) => {
  if (error) throw error;
  console.log('Query results:', results);
});

// ปิดการเชื่อมต่อ MySQL เมื่อทำงานเสร็จ
connection.end();
