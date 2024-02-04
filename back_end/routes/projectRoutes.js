const express = require("express");
const router = express.Router();
const path = require("path");
const { db, connectToDatabase } = require(path.join(
  __dirname,
  "../modules/db"
));

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
router.get("/projects", async (req, res) => {
  try {
    const query = "SELECT * FROM Projects";

    const results = await new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    res.json(results);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ดึงข้อมูลโปรเจ็คด้วย ID
router.get("/projects/:project_id", async (req, res) => {
  try {
    const { project_id } = req.params;

    const query = "SELECT * FROM Projects WHERE project_id = ?";

    const results = await new Promise((resolve, reject) => {
      db.query(query, [project_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    if (results.length === 0) {
      res.status(404).json({ error: "Project not found" });
    } else {
      res.json(results[0]);
    }
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).send("Internal Server Error");
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
