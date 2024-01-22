// Import express module
const express = require('express');
const cors = require('cors');

// Import userRoutes module
const userRoutes = require('./routes/userRoutes');

// Import db module
const { connectToDatabase } = require('./modules/db');

// Create an Express application
const app = express();

// Set up CORS middleware
app.use(cors());

// Set the port to 8080
const port = 8080;

// Use routes (สร้าง URL prefix '/api' สำหรับ userRoutes)
app.use('/api', userRoutes);

// Connect to the database and start the server
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Error connecting to the database:', error);
});
