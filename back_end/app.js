// Import express module
const express = require('express');

// Import userRoutes module (ที่เราสร้างไว้)
const userRoutes = require('./routes/userRoutes');

// Import db module (ที่เราสร้างไว้)
const db = require('./module/db');

// Create an Express application
const app = express();

// Set the port to 8080
const port = 8080;

// Use routes (สร้าง URL prefix '/api' สำหรับ userRoutes)
app.use('/api', userRoutes);

// Start the server and listen on port 8080
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
