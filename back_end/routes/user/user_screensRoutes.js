// Import express module
const express = require('express');
const router = express.Router();
const path = require('path');
const { db, connectToDatabase } = require('../../modules/db');

// Middleware for JSON parsing
router.use(express.json());

// Middleware for database connection
router.use(async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Route for getting all user_screen relationships
router.get('/user_screens', async (req, res) => {
    try {
        // Get all user_screen relationships from the database
        const query = 'SELECT * FROM user_screen';
        const results = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        res.json(results);
    } catch (error) {
        console.error('Error fetching user-screen relationships:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for getting user_screen relationship by user_screen_id
router.get('/user_screens/:user_screen_id', async (req, res) => {
    try {
        const { user_screen_id } = req.params;

        // Get user_screen relationship by user_screen_id from the database
        const query = 'SELECT * FROM user_screen WHERE user_screen_id = ?';
        const result = await new Promise((resolve, reject) => {
            db.query(query, [user_screen_id], (err, result) => {
                if (err) reject(err);
                resolve(result[0]);
            });
        });

        // Check if user_screen relationship exists
        if (!result) {
            return res.status(404).json({ error: 'User-Screen relationship not found' });
        }

        res.json(result);
    } catch (error) {
        console.error('Error fetching user-screen relationship:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for creating a new user_screen relationship
router.post('/user_screens', async (req, res) => {
    try {
        const { user_id, screen_id } = req.body;

        // Check if user_id and screen_id are provided
        if (!user_id || !screen_id) {
            return res.status(400).json({ error: 'user_id and screen_id are required' });
        }

        // Check if the user and screen exist in the database
        const userExists = await checkExistence('Users', 'user_id', user_id);
        const screenExists = await checkExistence('Screens', 'screen_id', screen_id);

        if (!userExists || !screenExists) {
            return res.status(400).json({ error: 'User or Screen does not exist' });
        }

        // Check if the user_screen relationship already exists
        const relationshipExists = await checkRelationshipExistence('user_screen', 'user_id', user_id, 'screen_id', screen_id);

        if (relationshipExists) {
            return res.status(400).json({ error: 'User-Screen relationship already exists' });
        }

        // Insert the user_screen relationship into the database
        const query = 'INSERT INTO user_screen (user_id, screen_id) VALUES (?, ?)';
        await new Promise((resolve, reject) => {
            db.query(query, [user_id, screen_id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        res.send('User-Screen relationship created successfully');
    } catch (error) {
        console.error('Error creating user-screen relationship:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for deleting a user_screen relationship
router.delete('/user_screens/:user_screen_id', async (req, res) => {
    try {
        const { user_screen_id } = req.params;

        // Delete the user_screen relationship from the database
        const query = 'DELETE FROM user_screen WHERE user_screen_id = ?';
        await new Promise((resolve, reject) => {
            db.query(query, [user_screen_id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        res.send('User-Screen relationship deleted successfully');
    } catch (error) {
        console.error('Error deleting user-screen relationship:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Function to check existence of a record in a table
async function checkExistence(tableName, columnName, value) {
    const query = `SELECT * FROM ${tableName} WHERE ${columnName} = ?`;
    const result = await new Promise((resolve, reject) => {
        db.query(query, [value], (err, result) => {
            if (err) reject(err);
            resolve(result.length > 0);
        });
    });
    return result;
}

// Function to check existence of a relationship in a junction table
async function checkRelationshipExistence(junctionTableName, column1Name, value1, column2Name, value2) {
    const query = `SELECT * FROM ${junctionTableName} WHERE ${column1Name} = ? AND ${column2Name} = ?`;
    const result = await new Promise((resolve, reject) => {
        db.query(query, [value1, value2], (err, result) => {
            if (err) reject(err);
            resolve(result.length > 0);
        });
    });
    return result;
}

module.exports = router;