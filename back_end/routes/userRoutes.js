// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { db, connectToDatabase } = require(path.join(__dirname, '../module/db'));

// Middleware สำหรับการแปลง JSON
router.use(async (req, res, next) => {
    try {
      await connectToDatabase();
      next();
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.status(500).send('Internal Server Error');
    }
});

// Route สำหรับสร้างผู้ใช้ใหม่
router.post('/users', async (req, res) => {
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

  const query =
    'INSERT INTO Users (user_firstname, user_lastname, user_id, user_position, user_department, user_email, user_password, user_status, user_role, user_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  try {
    await connectToDatabase();
    await new Promise((resolve, reject) => {
      db.query(
        query,
        [
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
    const query = 'SELECT * FROM Users';
  
    try {
      await connectToDatabase();
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
