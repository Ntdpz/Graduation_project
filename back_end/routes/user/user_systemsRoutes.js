const express = require('express');
const router = express.Router();
const { db } = require('../../modules/db');


// Middleware สำหรับการแปลง JSON
router.use(express.json());

// Route สำหรับดึงข้อมูล user_systems ทั้งหมด
router.get('/user_systems', async (req, res) => {
  try {
    const query = 'SELECT * FROM user_systems';
    const results = await new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
    res.json(results);
  } catch (error) {
    console.error('Error fetching user_systems:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route สำหรับดึงข้อมูล user_systems ตาม user_systems_id
router.get('/user_systems/:user_systems_id', async (req, res) => {
  try {
    const { user_systems_id } = req.params;
    const query = 'SELECT * FROM user_systems WHERE user_systems_id = ?';
    const results = await new Promise((resolve, reject) => {
      db.query(query, [user_systems_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching user_systems by user_systems_id:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route สำหรับเพิ่มข้อมูล user_systems
router.post('/user_systems', async (req, res) => {
  try {
    const { user_id, system_id } = req.body;

    const query = 'INSERT INTO user_systems (user_id, system_id) VALUES (?, ?)';
    await new Promise((resolve, reject) => {
      db.query(query, [user_id, system_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    res.send('UserSystems added successfully');
  } catch (error) {
    console.error('Error adding user_systems:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route สำหรับแก้ไขข้อมูล user_systems
router.put('/user_systems/:user_systems_id', async (req, res) => {
  try {
    const { user_systems_id } = req.params;
    const { user_id, system_id } = req.body;

    const updatedUserSystemsFields = {};
    if (user_id !== undefined) updatedUserSystemsFields.user_id = user_id;
    if (system_id !== undefined) updatedUserSystemsFields.system_id = system_id;

    const query = 'UPDATE user_systems SET ? WHERE user_systems_id = ?';

    await new Promise((resolve, reject) => {
      db.query(query, [updatedUserSystemsFields, user_systems_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    res.send('UserSystems updated successfully');
  } catch (error) {
    console.error('Error updating user_systems:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route สำหรับลบข้อมูล user_systems
router.delete('/user_systems/:user_systems_id', async (req, res) => {
  try {
    const { user_systems_id } = req.params;

    const query = 'DELETE FROM user_systems WHERE user_systems_id = ?';

    await new Promise((resolve, reject) => {
      db.query(query, [user_systems_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    res.send('UserSystems deleted successfully');
  } catch (error) {
    console.error('Error deleting user_systems:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;