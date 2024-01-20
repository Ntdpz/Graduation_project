// modules/db.js
const mysql = require('mysql');

// สร้าง connection ไปยังฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: '0.0.0.0',       // ที่อยู่ IP หรือชื่อโฮสต์ของ MySQL Server
  user: 'root',           // ชื่อผู้ใช้ MySQL
  password: '',           // รหัสผ่าน MySQL
  database: 'graduation_project', // ชื่อฐานข้อมูลที่ใช้
  charset: 'utf8mb4',     // เลือก charset utf8mb4
  timezone: 'UTC',        // กำหนด timezone UTC
});

// ...

// เชื่อมต่อกับ MySQL โดยใช้ Promise
const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('MySQL Connected');
        resolve();
      }
    });
  });
};

// ส่งออก connection และฟังก์ชัน connectToDatabase
module.exports = {
  db,
  connectToDatabase,
};
