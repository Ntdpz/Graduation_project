const express = require('express');
const router = express.Router();
const { db } = require('../../modules/db');

// Middleware สำหรับการเชื่อมต่อกับฐานข้อมูล
router.use(async (req, res, next) => {
    try {
        // Implement your database connection logic here if needed
        next();
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route สำหรับสร้าง User Task
router.post('/user_tasks', async (req, res) => {
    try {
        const { user_task_id, user_id, task_id } = req.body;

        const query =
            'INSERT INTO user_task (user_task_id, user_id, task_id) VALUES (?, ?, ?)';

        await new Promise((resolve, reject) => {
            db.query(query, [user_task_id, user_id, task_id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        res.send('User Task created successfully');
    } catch (error) {
        console.error('Error creating user task:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route สำหรับดึงข้อมูล User Tasks ทั้งหมด
router.get('/user_tasks', async (req, res) => {
    try {
        const query = 'SELECT * FROM user_task';

        const results = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        res.json(results);
    } catch (error) {
        console.error('Error fetching user tasks:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route สำหรับดึงข้อมูล User Task ด้วย ID
router.get('/user_tasks/:user_task_id', async (req, res) => {
    try {
        const { user_task_id } = req.params;

        const query = 'SELECT * FROM user_task WHERE user_task_id = ?';

        const results = await new Promise((resolve, reject) => {
            db.query(query, [user_task_id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        if (results.length === 0) {
            res.status(404).json({ error: 'User Task not found' });
        } else {
            res.json(results[0]);
        }
    } catch (error) {
        console.error('Error fetching user task by ID:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route สำหรับอัปเดต User Task
router.put('/user_tasks/:user_task_id', async (req, res) => {
    try {
        const { user_id, task_id } = req.body;

        const { user_task_id } = req.params;

        const updatedUserTaskFields = {};

        // Check and add user_id if provided
        if (user_id !== undefined) {
            updatedUserTaskFields.user_id = user_id;
        }

        // Check and add task_id if provided
        if (task_id !== undefined) {
            updatedUserTaskFields.task_id = task_id;
        }

        if (Object.keys(updatedUserTaskFields).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const query = 'UPDATE user_task SET ? WHERE user_task_id = ?';

        await new Promise((resolve, reject) => {
            db.query(query, [updatedUserTaskFields, user_task_id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        res.send('User Task updated successfully');
    } catch (error) {
        console.error('Error updating user task:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route สำหรับลบ User Tasks
router.delete('/user_tasks/:user_task_id', async (req, res) => {
    try {
        const { user_task_id } = req.params;

        const query = 'DELETE FROM user_task WHERE user_task_id = ?';

        await new Promise((resolve, reject) => {
            db.query(query, [user_task_id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        res.send('User Task deleted successfully');
    } catch (error) {
        console.error('Error deleting user task:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
