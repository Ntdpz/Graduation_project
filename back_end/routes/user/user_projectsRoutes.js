// Import necessary modules
const express = require('express');
const router = express.Router();
const { db } = require('../../modules/db');

// Create user_projects relationship
router.post('/user_projects', async (req, res) => {
    try {
        const { UserProjects } = req.body;

        // Check if UserProjects array is provided
        if (!UserProjects || !Array.isArray(UserProjects)) {
            return res.status(400).json({ error: 'UserProjects array is required' });
        }

        // Loop through each UserProject in the array
        for (const userProject of UserProjects) {
            const { user_id, project_id } = userProject;

            // Check if user_id and project_id are provided
            if (!user_id || !project_id) {
                return res.status(400).json({ error: 'user_id and project_id are required for each UserProject' });
            }

            // Insert into user_projects table
            await new Promise((resolve, reject) => {
                const query = 'INSERT INTO user_projects (user_id, project_id) VALUES (?, ?)';
                db.query(query, [user_id, project_id], (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        }

        res.send('UserProjects created successfully');
    } catch (error) {
        console.error('Error creating UserProjects:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/user_projects', async (req, res) => {
    try {
        // Select all rows from user_projects table
        const query = 'SELECT * FROM user_projects';
        const results = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        res.json(results);
    } catch (error) {
        console.error('Error fetching UserProjects:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/user_projects/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Delete from user_projects table
      await new Promise((resolve, reject) => {
        const query = 'DELETE FROM user_projects WHERE id = ?';
        db.query(query, [id], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
  
      res.send('UserProjects deleted successfully');
    } catch (error) {
      console.error('Error deleting UserProjects:', error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;