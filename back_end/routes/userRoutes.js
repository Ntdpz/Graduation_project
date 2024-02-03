const express = require('express');
const router = express.Router();
const path = require('path');
const { db, connectToDatabase } = require(path.join(__dirname, '../modules/db'));
const multer = require('multer');
const fs = require('fs');

router.use(express.json());

router.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).send('Internal Server Error');
  }
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadSingle = upload.single('user_pic');


//login API
router.post('/login', async (req, res) => {
  try {
    const { user_id, user_password } = req.body;

    const query = 'SELECT * FROM Users WHERE user_id = ? AND user_password = ?';

    const user = await new Promise((resolve, reject) => {
      db.query(query, [user_id, user_password], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    if (user.length === 0) {
      res.status(401).json({ error: 'Invalid user_id or password' });
    } else {
      res.json({ message: 'Login successful', user: user[0] });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Route: อัปเดตข้อมูลผู้ใช้
router.put('/users/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const updatedUserFields = {}; // สร้าง object เพื่อเก็บข้อมูลที่ต้องการอัปเดต

    // ตรวจสอบและเพิ่มข้อมูลที่ต้องการอัปเดตลงใน object
    const fieldsToUpdate = [
      'user_firstname',
      'user_lastname',
      'user_position',
      'user_department',
      'user_email',
      'user_password',
      'user_status',
      'user_role',
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        updatedUserFields[field] = req.body[field];
      }
    });

    // ตรวจสอบว่า user_pic ได้รับการส่งมาหรือไม่
    if (req.body.user_pic !== null) {
      const userPicBase64 = req.body.user_pic;
      updatedUserFields.user_pic = userPicBase64;
    } else {
      updatedUserFields.user_pic = null;
    }

    // ตรวจสอบว่ามีข้อมูลที่ต้องการอัปเดตหรือไม่
    if (Object.keys(updatedUserFields).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const query = 'UPDATE Users SET ? WHERE user_id = ?';

    await new Promise((resolve, reject) => {
      db.query(query, [updatedUserFields, user_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    res.send('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Route: สร้างผู้ใช้ใหม่
router.post('/users', async (req, res) => {
  try {
    const { Users } = req.body;

    if (!Users || !Array.isArray(Users)) {
      return res.status(400).json({ error: 'Users array is required' });
    }

    for (const user of Users) {
      const { user_id } = user;

      if (!user_id) {
        return res.status(400).json({ error: 'user_id is required for each user' });
      }

      const userPosition = user.user_position || 'Default Position';

      const query =
        'INSERT INTO Users (user_firstname, user_lastname, user_position, user_department, user_email, user_password, user_status, user_role, user_pic, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

      await new Promise((resolve, reject) => {
        db.query(
          query,
          [
            user.user_firstname,
            user.user_lastname,
            userPosition,
            user.user_department,
            user.user_email,
            user.user_password,
            user.user_status,
            user.user_role,
            user.user_pic,
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

// Middleware: อ่านไฟล์และแปลงเป็น base64
async function getFileAsBase64(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
async function getFileAsBase64(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}
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
