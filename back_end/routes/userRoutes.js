// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { db, connectToDatabase } = require(path.join(__dirname, '../modules/db'));

// Middleware สำหรับการแปลง JSON
router.use(async (req, res, next) => {
  try {
    await connectToDatabase();  // ต้องรอให้การเชื่อมต่อเสร็จสิ้นก่อนที่จะไปต่อ
    next();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route สำหรับสร้างผู้ใช้ใหม่
router.post('/users', async (req, res) => {
  try {
    await connectToDatabase();

    const {
      user_firstname,
      user_lastname,
      user_id,
      user_position,
      user_department,
      user_email,
      user_password,
      user_status,
      user_role,
      user_pic,
    } = req.body;

    // เพิ่ม code เพื่อตรวจสอบค่า user_id และกำหนดค่า default หากไม่ได้รับค่ามา
    if (user_id == null) {
      return res.status(400).send('User ID cannot be null');
    }

    // เพิ่ม code เพื่อตรวจสอบและกำหนดค่า default ในกรณีที่ค่าอื่น ๆ เป็น null
    const defaultValues = {
      // ตัวอย่างเท่านี้เท่านั้น คุณต้องตรวจสอบและกำหนดค่า default ให้กับคอลัมน์ที่ต้องการ
      user_firstname: user_firstname || 'Default Firstname',
      user_lastname: user_lastname || 'Default Lastname',
      user_position: user_position || 'Default Position',
      // ... ต่อไปตามความต้องการ
    };

    const query =
      'INSERT INTO Users (user_firstname, user_lastname, user_id, user_position, user_department, user_email, user_password, user_status, user_role, user_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    await new Promise((resolve, reject) => {
      db.query(
        query,
        [
          defaultValues.user_firstname,
          defaultValues.user_lastname,
          user_id,
          defaultValues.user_position,
          user_department || 'Default Department',
          user_email || 'Default Email',
          user_password || 'Default Password',
          user_status || 'Default Status',
          user_role || 'Default Role',
          user_pic || 'Default Pic',
        ],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    res.send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Route สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/users', async (req, res) => {
  try {
    await connectToDatabase();  // ต้องรอให้การเชื่อมต่อเสร็จสิ้นก่อนที่จะไปต่อ
    const query = 'SELECT * FROM Users';

    const results = await new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    res.json(results);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
