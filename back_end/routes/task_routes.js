const express = require('express');
const router = express.Router();
const { db } = require('../modules/db');

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

// Route สำหรับสร้าง Task
router.post('/tasks', async (req, res) => {
    try {
        const {
            task_id,
            task_name,
            task_status,
            task_manday,
            screen_id,
            system_id,
            project_id,
            task_progress,
            task_plan_start,
            task_plan_end,
            task_actual_start,
            task_actual_end,
        } = req.body;

        // Perform validation if needed

        const query =
            'INSERT INTO Tasks (task_id, task_name, task_status, task_manday, screen_id, system_id, project_id, task_progress, task_plan_start, task_plan_end, task_actual_start, task_actual_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        await new Promise((resolve, reject) => {
            db.query(
                query,
                [
                    task_id,
                    task_name,
                    task_status,
                    task_manday,
                    screen_id,
                    system_id,
                    project_id,
                    task_progress,
                    task_plan_start,
                    task_plan_end,
                    task_actual_start,
                    task_actual_end,
                ],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });

        res.send('Task created successfully');
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route สำหรับดึงข้อมูล Task ทั้งหมด
router.get('/tasks', async (req, res) => {
    try {
        const query = 'SELECT * FROM Tasks';

        const results = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        res.json(results);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/tasks/:task_id', async (req, res) => {
    try {
        const { task_id } = req.params;

        const query = 'SELECT * FROM Tasks WHERE task_id = ?';

        const results = await new Promise((resolve, reject) => {
            db.query(query, [task_id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        if (results.length === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json(results[0]);
        }
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route สำหรับอัปเดตข้อมูล Task
router.put('/tasks/:task_id', async (req, res) => {
    try {
        const {
            task_name,
            task_status,
            task_manday,
            task_progress,
            task_plan_start,
            task_plan_end,
            task_actual_start,
            task_actual_end,
        } = req.body;

        const { task_id } = req.params;

        const updatedTaskFields = {};

        // Check and add task_name if provided
        if (task_name !== undefined) {
            updatedTaskFields.task_name = task_name;
        }

        // Check and add task_status if provided
        if (task_status !== undefined) {
            updatedTaskFields.task_status = task_status;
        }

        // Check and add task_manday if provided
        if (task_manday !== undefined) {
            updatedTaskFields.task_manday = task_manday;
        }

        // Check and add other fields if needed

        if (Object.keys(updatedTaskFields).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const query = 'UPDATE Tasks SET ? WHERE task_id = ?';

        await new Promise((resolve, reject) => {
            db.query(query, [updatedTaskFields, task_id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        res.send('Task updated successfully');
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route สำหรับลบ Task
router.delete('/tasks/:task_id', async (req, res) => {
    try {
        const { task_id } = req.params;

        const query = 'DELETE FROM Tasks WHERE task_id = ?';

        await new Promise((resolve, reject) => {
            db.query(query, [task_id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        res.send('Task deleted successfully');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
