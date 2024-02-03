const express = require('express');
const router = express.Router();
const path = require('path');
const { db, connectToDatabase } = require(path.join(__dirname, '../modules/db'));

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

// Create a new system
router.post('/systems', async (req, res) => {
  try {
    const {
      system_id,
      system_nameTH,
      system_nameEN,
      system_shortname,
      project_id,
      system_progress,
      system_plan_start,
      system_plan_end,
    } = req.body;

    const query =
      'INSERT INTO Systems (system_id, system_nameTH, system_nameEN, system_shortname, project_id, system_progress, system_plan_start, system_plan_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    await new Promise((resolve, reject) => {
      db.query(
        query,
        [
          system_id,
          system_nameTH,
          system_nameEN,
          system_shortname,
          project_id,
          system_progress,
          system_plan_start,
          system_plan_end,
        ],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    res.send('System created successfully');
  } catch (error) {
    console.error('Error creating system:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get all systems
router.get('/systems', async (req, res) => {
  try {
    await connectToDatabase();
    const query = 'SELECT * FROM Systems';

    const results = await new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    res.json(results);
  } catch (error) {
    console.error('Error fetching systems:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get a specific system by system_id
router.get('/systems/:system_id', async (req, res) => {
  try {
    const { system_id } = req.params;
    await connectToDatabase();
    const query = 'SELECT * FROM Systems WHERE system_id = ?';

    const results = await new Promise((resolve, reject) => {
      db.query(query, [system_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    res.json(results);
  } catch (error) {
    console.error('Error fetching system:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a specific system by system_id
router.put('/systems/:system_id', async (req, res) => {
  try {
    const { system_id } = req.params;
    const {
      system_nameTH,
      system_nameEN,
      system_shortname,
      project_id,
      system_progress,
      system_plan_start,
      system_plan_end,
    } = req.body;

    const updatedSystemFields = {};

    if (system_nameTH !== undefined) {
      updatedSystemFields.system_nameTH = system_nameTH;
    }

    if (system_nameEN !== undefined) {
      updatedSystemFields.system_nameEN = system_nameEN;
    }

    if (system_shortname !== undefined) {
      updatedSystemFields.system_shortname = system_shortname;
    }

    if (project_id !== undefined) {
      updatedSystemFields.project_id = project_id;
    }

    if (system_progress !== undefined) {
      updatedSystemFields.system_progress = system_progress;
    }

    if (system_plan_start !== undefined) {
      updatedSystemFields.system_plan_start = system_plan_start;
    }

    if (system_plan_end !== undefined) {
      updatedSystemFields.system_plan_end = system_plan_end;
    }

    if (Object.keys(updatedSystemFields).length === 0) {
      return res.status(400).json({ error: 'No fields to update for system_id: ' + system_id });
    }

    const query = 'UPDATE Systems SET ? WHERE system_id = ?';

    await new Promise((resolve, reject) => {
      db.query(
        query,
        [updatedSystemFields, system_id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    res.send('System updated successfully');
  } catch (error) {
    console.error('Error updating system:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a specific system by system_id
router.delete('/systems/:system_id', async (req, res) => {
  try {
    const { system_id } = req.params;

    const query = 'DELETE FROM Systems WHERE system_id = ?';

    await new Promise((resolve, reject) => {
      db.query(query, [system_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    res.send('System deleted successfully');
  } catch (error) {
    console.error('Error deleting system:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;