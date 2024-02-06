const express = require('express');
const router = express.Router();
const { connectToDatabase, db } = require('../modules/db'); // Adjust the path accordingly

const moment = require('moment');

// Assuming you have a function to execute SQL queries, similar to db.query
const executeQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

router.get('/screens', async (req, res) => {
  try {
    // Query to get all screens
    const screensQuery = 'SELECT * FROM Screens';
    const screens = await executeQuery(screensQuery);

    // Fetch additional information for each screen
    const screensWithTasks = await Promise.all(
      screens.map(async (screen) => {
        // Query to get all tasks associated with the current screen
        const tasksQuery = 'SELECT * FROM Tasks WHERE screen_id = ?';
        const tasks = await executeQuery(tasksQuery, [screen.screen_id]);

        // Calculate screen_progress based on task_progress in each task
        const totalTaskProgress = tasks.reduce((total, task) => total + task.task_progress, 0);
        const screenProgress = tasks.length > 0 ? totalTaskProgress / tasks.length : null;

        // Find the latest task and earliest task_plan_start
        const latestTask = tasks.reduce((latest, task) => (!latest || task.task_plan_end > latest.task_plan_end ? task : latest), null);
        const screenPlanStart = tasks.reduce((earliest, task) => (!earliest || task.task_plan_start < earliest ? task.task_plan_start : earliest), null);

        // Build the modified screen object with additional information
        const screenWithTasks = {
          ...screen,
          task_count: tasks.length,
          screen_progress: screenProgress,
          screen_plan_end: latestTask ? latestTask.task_plan_end : null,
          screen_plan_start: screenPlanStart ? screenPlanStart : null,
        };

        return screenWithTasks;
      })
    );

    // Respond with the modified screens data
    res.json(screensWithTasks);
  } catch (error) {
    console.error('Error fetching screens:', error);
    res.status(500).send('Internal Server Error');
  }
});




// Route สำหรับดึงข้อมูล Screen ด้วย ID
router.get('/screens/:screen_id', async (req, res) => {
  try {
    const { screen_id } = req.params;

    const query = 'SELECT * FROM Screens WHERE screen_id = ?';

    const screen = await new Promise((resolve, reject) => {
      db.query(query, [screen_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    if (screen.length === 0) {
      res.status(404).json({ error: 'Screen not found' });
    } else {
      res.json(screen[0]);
    }
  } catch (error) {
    console.error('Error fetching screen by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Create a new screen
router.post('/screens', async (req, res) => {
  try {
    const {
      screen_id,
      screen_name,
      screen_status,
      screen_level,
      screen_manday,
      system_id,
      screen_progress,
      screen_plan_start,
      screen_plan_end,
      screen_pic
    } = req.body;

    const query =
      'INSERT INTO Screens (screen_id, screen_name, screen_status, screen_level, screen_manday, system_id, screen_progress, screen_plan_start, screen_plan_end, screen_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    await new Promise((resolve, reject) => {
      db.query(
        query,
        [
          screen_id,
          screen_name,
          screen_status,
          screen_level,
          screen_manday,
          system_id,
          screen_progress,
          screen_plan_start,
          screen_plan_end,
          null, // screen_actual_start
          null, // screen_actual_end
          screen_pic
        ],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    res.send('Screen created successfully');
  } catch (error) {
    console.error('Error creating screen:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Update an existing screen
router.put('/screens/:screen_id', async (req, res) => {
  try {
    const { screen_id } = req.params;
    const { screen_name, screen_status, screen_level, screen_manday, system_id, project_id, screen_progress, screen_plan_start, screen_plan_end, screen_actual_start, screen_actual_end, screen_pic } = req.body;

    const updatedScreenFields = {};

    if (screen_name !== undefined) updatedScreenFields.screen_name = screen_name;
    if (screen_status !== undefined) updatedScreenFields.screen_status = screen_status;
    if (screen_level !== undefined) updatedScreenFields.screen_level = screen_level;
    if (screen_manday !== undefined) updatedScreenFields.screen_manday = screen_manday;
    if (system_id !== undefined) updatedScreenFields.system_id = system_id;
    if (project_id !== undefined) updatedScreenFields.project_id = project_id;
    if (screen_progress !== undefined) updatedScreenFields.screen_progress = screen_progress;
    if (screen_plan_start !== undefined) updatedScreenFields.screen_plan_start = screen_plan_start;
    if (screen_plan_end !== undefined) updatedScreenFields.screen_plan_end = screen_plan_end;
    if (screen_actual_start !== undefined) updatedScreenFields.screen_actual_start = screen_actual_start;
    if (screen_actual_end !== undefined) updatedScreenFields.screen_actual_end = screen_actual_end;
    if (screen_pic !== undefined) updatedScreenFields.screen_pic = screen_pic;

    const query = 'UPDATE Screens SET ? WHERE screen_id = ?';

    await new Promise((resolve, reject) => {
      db.query(
        query,
        [updatedScreenFields, screen_id],
        (err, result) => {
          if (err) {
            console.error('Error updating screen:', err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });


    res.send('Screen updated successfully');
  } catch (error) {
    console.error('Error updating screen:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete an existing screen
router.delete('/screens/:screen_id', async (req, res) => {
  try {
    const { screen_id } = req.params;

    const query = 'DELETE FROM Screens WHERE screen_id = ?';

    await new Promise((resolve, reject) => {
      db.query(query, [screen_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    res.send('Screen deleted successfully');
  } catch (error) {
    console.error('Error deleting screen:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
