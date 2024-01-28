const express = require('express');
const router = express.Router();
const path = require('path');
const { db, connectToDatabase } = require(path.join(__dirname, '../modules/db'));

// Middleware สำหรับการแปลง JSON
router.use(express.json());

// Middleware สำหรับการเชื่อมต่อกับฐานข้อมูล
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
  try {
    const { Users } = req.body;

    // Check if Users array is provided
    if (!Users || !Array.isArray(Users)) {
      return res.status(400).json({ error: 'Users array is required' });
    }

    // Loop through each user in the array
    for (const user of Users) {
      const {
        user_firstname,
        user_lastname,
        user_position,
        user_department,
        user_email,
        user_password,
        user_status,
        user_role,
        user_pic,
        user_id,
      } = user;

      // Check if user_id is provided for each user
      if (!user_id) {
        return res.status(400).json({ error: 'user_id is required for each user' });
      }

      const userPosition = user_position || 'Default Position';

      const query =
        'INSERT INTO Users (user_firstname, user_lastname, user_position, user_department, user_email, user_password, user_status, user_role, user_pic, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

      await new Promise((resolve, reject) => {
        db.query(
          query,
          [
            user_firstname,
            user_lastname,
            userPosition,
            user_department,
            user_email,
            user_password,
            user_status,
            user_role,
            user_pic,
            user_id,
          ],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
    }

    res.send('Users created successfully');
  } catch (error) {
    console.error('Error creating users:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route สำหรับอัปเดตข้อมูลผู้ใช้
router.put('/users/:user_id', async (req, res) => {
  try {
    const { user_firstname, user_position } = req.body;
    const { user_id } = req.params;

    // Create an object to store only the fields that need to be updated
    const updatedUserFields = {};

    // Check and add user_firstname if provided
    if (user_firstname !== undefined) {
      updatedUserFields.user_firstname = user_firstname;
    }

    // Check and add user_position if provided
    if (user_position !== undefined) {
      updatedUserFields.user_position = user_position;
    }

    // Check if there are fields to update
    if (Object.keys(updatedUserFields).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const query = 'UPDATE Users SET ? WHERE user_id = ?';

    await new Promise((resolve, reject) => {
      db.query(
        query,
        [updatedUserFields, user_id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    res.send('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route สำหรับลบผู้ใช้
router.delete('/users/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const query = 'DELETE FROM Users WHERE user_id = ?';

    await new Promise((resolve, reject) => {
      db.query(query, [user_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    res.send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/users', async (req, res) => {
  try {
    await connectToDatabase();
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
// Route สำหรับดึงข้อมูลผู้ใช้ด้วย ID
router.get('/users/:user_id', async (req, res) => {
  try {
    await connectToDatabase();
    const { user_id } = req.params;

    const query = 'SELECT * FROM Users WHERE user_id = ?';

    const results = await new Promise((resolve, reject) => {
      db.query(query, [user_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(results[0]);
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
