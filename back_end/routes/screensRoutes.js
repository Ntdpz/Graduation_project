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

        // Calculate screen_manday based on the number of tasks
        const screenManday = tasks.reduce((total, task) => total + task.task_manday, 0);

        // Find the latest task and earliest task_plan_start
        const latestTask = tasks.reduce((latest, task) => (!latest || task.task_plan_end > latest.task_plan_end ? task : latest), null);
        const screenPlanStart = tasks.reduce((earliest, task) => (!earliest || task.task_plan_start < earliest ? task.task_plan_start : earliest), null);

        // Convert dates to the desired format (without time)
        const formattedScreenPlanStart = moment(screenPlanStart).format('YYYY-MM-DD');
        const formattedLatestTaskPlanEnd = latestTask ? moment(latestTask.task_plan_end).format('YYYY-MM-DD') : null;

        // Build the modified screen object with additional information
        const screenWithTasks = {
          ...screen,
          task_count: tasks.length,
          screen_progress: screenProgress,
          screen_plan_end: formattedLatestTaskPlanEnd,
          screen_plan_start: formattedScreenPlanStart,
          screen_manday: screenManday,
        };

        // Update or insert the modified screen data into the database
        await updateOrInsertScreen(screenWithTasks);

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


async function updateOrInsertScreen(screen) {
  // Check if the screen already exists in the database
  const existingScreenQuery = 'SELECT * FROM Screens WHERE screen_id = ?';
  const existingScreen = await executeQuery(existingScreenQuery, [screen.screen_id]);

  if (existingScreen.length > 0) {
    // Update the existing screen in the database
    const updateQuery = `
      UPDATE Screens 
      SET 
        screen_name = ?, 
        screen_status = ?, 
        screen_level = ?, 
        screen_manday = ?, 
        system_id = ?, 
        screen_progress = ?, 
        screen_plan_start = ?, 
        screen_plan_end = ?, 
        screen_pic = ?
      WHERE screen_id = ?
    `;
    await executeQuery(updateQuery, [
      screen.screen_name,
      screen.screen_status,
      screen.screen_level,
      screen.screen_manday,
      screen.system_id,
      screen.screen_progress,
      screen.screen_plan_start,
      screen.screen_plan_end,
      screen.screen_pic,
      screen.screen_id
    ]);
  } else {
    // Insert the new screen into the database
    const insertQuery = `
      INSERT INTO Screens 
        (screen_id, screen_name, screen_status, screen_level, screen_manday, system_id, screen_progress, screen_plan_start, screen_plan_end, screen_pic) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await executeQuery(insertQuery, [
      screen.screen_id,
      screen.screen_name,
      screen.screen_status,
      screen.screen_level,
      screen.screen_manday,
      screen.system_id,
      screen.screen_progress,
      screen.screen_plan_start,
      screen.screen_plan_end,
      screen.screen_pic
    ]);
  }
}

// Route สำหรับดึงข้อมูล Screen ด้วย ID
router.get('/screens/:screen_id', async (req, res) => {
  try {
    const { screen_id } = req.params;

    // Query to fetch screen details
    const screenQuery = 'SELECT Screens.*, COUNT(Tasks.task_id) AS task_count FROM Screens LEFT JOIN Tasks ON Screens.screen_id = Tasks.screen_id WHERE Screens.screen_id = ?';
    const screenResults = await executeQuery(screenQuery, [screen_id]);

    // Check if screen exists
    if (screenResults.length === 0) {
      return res.status(404).json({ error: 'Screen not found' });
    }

    const screen = screenResults[0];

    // Format screen plan dates
    screen.screen_plan_start = moment(screen.screen_plan_start).format('YYYY-MM-DD');
    screen.screen_plan_end = moment(screen.screen_plan_end).format('YYYY-MM-DD');

    res.json(screen);
  } catch (error) {
    console.error('Error fetching screen by ID:', error);
    res.status(500).send('An error occurred while fetching the screen details. Please try again later.');
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
    const { screen_name, screen_status, screen_level, system_id, screen_pic } = req.body;

    // Check if any other fields are being updated
    const allowedFields = ['screen_name', 'screen_status', 'screen_level', 'system_id', 'screen_pic'];
    const invalidFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
      return res.status(400).json({ error: `Invalid fields: ${invalidFields.join(', ')}` });
    }

    const updatedScreenFields = {};

    if (screen_name !== undefined) updatedScreenFields.screen_name = screen_name;
    if (screen_status !== undefined) updatedScreenFields.screen_status = screen_status;
    if (screen_level !== undefined) updatedScreenFields.screen_level = screen_level;
    if (system_id !== undefined) updatedScreenFields.system_id = system_id;
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
        if (err) {
          console.error('Error deleting screen:', err);
          reject('Error deleting screen: Database error');
        } else {
          if (result.affectedRows === 0) {
            res.status(404).send('Error deleting screen: Screen not found');
          } else {
            res.send('Screen deleted successfully');
          }
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.error('Error deleting screen:', error);
    res.status(500).send('Error deleting screen:  Please try again later.');
  }
});

module.exports = router;
