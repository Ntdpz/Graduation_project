const mysql = require('mysql');

// สร้าง pool connection ไปยังฐานข้อมูล MySQL
const db = mysql.createPool({
  connectionLimit: 10, // จำนวน connection สูงสุดที่ pool สามารถจัดการได้
  host: '0.0.0.0',     // ที่อยู่ IP หรือชื่อโฮสต์ของ MySQL Server
  user: 'root',         // ชื่อผู้ใช้ MySQL
  password: '',         // รหัสผ่าน MySQL
  database: 'graduation_project', // ชื่อฐานข้อมูลที่ใช้
});

// เชื่อมต่อกับ MySQL โดยใช้ Promise
const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        console.log('MySQL Connected');
        connection.release();
        resolve();
      }
    });
  });
};

// ส่งออก pool connection และฟังก์ชัน connectToDatabase
module.exports = {
  db,
  connectToDatabase,
};