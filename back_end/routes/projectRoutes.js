const express = require("express");
const router = express.Router();
const path = require("path");
const { db, connectToDatabase } = require(path.join(
  __dirname,
  "../modules/db"
));
const moment = require('moment');
// Middleware เพื่อให้ทุกครั้งที่มี request เข้ามา จะทำการเชื่อมต่อกับฐานข้อมูล
router.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

// สร้างโปรเจ็คใหม่
router.post("/projects", async (req, res) => {
  try {
    const {
      project_id,
      project_name_TH,
      project_name_ENG,
      project_progress,
      project_plan_start,
      project_plan_end,
    } = req.body;

    const query =
      "INSERT INTO Projects (project_id, project_name_TH, project_name_ENG, project_progress, project_plan_start, project_plan_end) VALUES (?, ?, ?, ?, ?, ?)";

    await new Promise((resolve, reject) => {
      db.query(
        query,
        [
          project_id,
          project_name_TH,
          project_name_ENG,
          project_progress,
          project_plan_start,
          project_plan_end,
        ],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    res.send("Project created successfully");
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ดึงข้อมูลโปรเจ็คทั้งหมด
router.get('/projects', async (req, res) => {
  try {
    await connectToDatabase();
    const query = 'SELECT Projects.*, COUNT(DISTINCT Systems.system_id) AS system_count, AVG(Screens.screen_progress) AS project_progress, MIN(Screens.screen_plan_start) AS project_plan_start, MAX(Screens.screen_plan_end) AS latest_system_plan_end FROM Projects LEFT JOIN Systems ON Projects.project_id = Systems.project_id LEFT JOIN Screens ON Systems.system_id = Screens.system_id GROUP BY Projects.project_id';

    const results = await new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    // Calculate overall progress and earliest plan_start
    results.forEach(project => {
      project.project_progress = parseFloat(project.project_progress || 0).toFixed(2);
      // Check if project_plan_start is null and replace it with "Not determined"
      project.project_plan_start = !project.project_plan_start ? "Not determined" : moment(project.project_plan_start).format('YYYY-MM-DD');
      // Check if latest_system_plan_end is not null, and replace project_plan_end with it
      project.project_plan_end = project.latest_system_plan_end ? moment(project.latest_system_plan_end).format('YYYY-MM-DD') : "Not determined";
      // Remove the "system_count" property
      delete project.system_count;
      // Remove the "latest_system_plan_end" property
      delete project.latest_system_plan_end;
    });

    res.json(results);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send('Internal Server Error');
  }
});


// ดึงข้อมูลโปรเจ็คด้วย ID
router.get('/projects/:project_id', async (req, res) => {
  try {
    await connectToDatabase();
    const { project_id } = req.params;

    // Get project details
    const projectQuery = 'SELECT * FROM Projects WHERE project_id = ?';
    const projectResult = await new Promise((resolve, reject) => {
      db.query(projectQuery, [project_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    // Check if project exists
    if (projectResult.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const { project_name_TH, project_name_ENG } = projectResult[0];

    // Get system count
    const systemCountQuery = 'SELECT COUNT(DISTINCT Systems.system_id) AS system_count FROM Systems WHERE Systems.project_id = ?';
    const systemCountResult = await new Promise((resolve, reject) => {
      db.query(systemCountQuery, [project_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    const system_count = systemCountResult[0].system_count;

    // Get screen count
    const screenCountQuery = 'SELECT COUNT(DISTINCT Screens.screen_id) AS screen_count FROM Screens INNER JOIN Systems ON Screens.system_id = Systems.system_id WHERE Systems.project_id = ?';
    const screenCountResult = await new Promise((resolve, reject) => {
      db.query(screenCountQuery, [project_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    const screen_count = screenCountResult[0].screen_count;

    // Get task count
    const taskCountQuery = 'SELECT COUNT(DISTINCT Tasks.task_id) AS task_count FROM Tasks INNER JOIN Screens ON Tasks.screen_id = Screens.screen_id INNER JOIN Systems ON Screens.system_id = Systems.system_id WHERE Systems.project_id = ?';
    const taskCountResult = await new Promise((resolve, reject) => {
      db.query(taskCountQuery, [project_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    const task_count = taskCountResult[0].task_count;

    // Get project_plan_start and project_plan_end
    const projectPlanQuery = 'SELECT MIN(Screens.screen_plan_start) AS project_plan_start, MAX(Screens.screen_plan_end) AS project_plan_end FROM Screens INNER JOIN Systems ON Screens.system_id = Systems.system_id WHERE Systems.project_id = ?';
    const projectPlanResult = await new Promise((resolve, reject) => {
      db.query(projectPlanQuery, [project_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    const { project_plan_start, project_plan_end } = projectPlanResult[0];

    // Format dates to 'YYYY-MM-DD'
    const formatted_project_plan_start = moment(project_plan_start).format('YYYY-MM-DD');
    const formatted_project_plan_end = moment(project_plan_end).format('YYYY-MM-DD');

    res.json({ project_id, project_name_TH, project_name_ENG, system_count, screen_count, task_count, project_plan_start: formatted_project_plan_start, project_plan_end: formatted_project_plan_end });
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).send('Internal Server Error');
  }
});



// อัปเดตโปรเจ็คด้วย ID
router.put("/projects/:project_id", async (req, res) => {
  try {
    const {
      project_name_TH,
      project_name_ENG,
      project_progress,
      project_plan_start,
      project_plan_end,
    } = req.body;

    const { project_id } = req.params;

    const updatedProjectFields = {};

    if (project_name_TH !== undefined) {
      updatedProjectFields.project_name_TH = project_name_TH;
    }

    if (project_name_ENG !== undefined) {
      updatedProjectFields.project_name_ENG = project_name_ENG;
    }

    if (project_progress !== undefined) {
      updatedProjectFields.project_progress = project_progress;
    }

    if (project_plan_start !== undefined) {
      updatedProjectFields.project_plan_start = project_plan_start;
    }

    if (project_plan_end !== undefined) {
      updatedProjectFields.project_plan_end = project_plan_end;
    }

    if (Object.keys(updatedProjectFields).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const query = "UPDATE Projects SET ? WHERE project_id = ?";

    await new Promise((resolve, reject) => {
      db.query(query, [updatedProjectFields, project_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    res.send("Project updated successfully");
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ลบโปรเจ็คด้วย ID
router.delete("/projects/:project_id", async (req, res) => {
  try {
    const { project_id } = req.params;

    const query = "DELETE FROM Projects WHERE project_id = ?";

    await new Promise((resolve, reject) => {
      db.query(query, [project_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    res.send("Project deleted successfully");
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
