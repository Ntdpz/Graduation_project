// Import express module
const express = require('express');
const cors = require('cors');

// Import userRoutes and projectRoutes modules
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');  
const systemRoutes = require('./routes/systemRoutes'); 
const screensRoutes = require('./routes/screensRoutes.js');
const user_projectsRoutes = require('./routes/user/user_projectsRoutes.js');
const user_systemRoutes = require('./routes/user/user_systemsRoutes.js');
const user_screensRoutes = require('./routes/user/user_screensRoutes.js');
// Import db module
const { connectToDatabase } = require('./modules/db');


// Create an Express application
const app = express();

// Set up CORS middleware
app.use(cors());

// Set the port to 8080
const port = 8080;

// Connect to the database and start the server
connectToDatabase().then(() => {
  app.use(express.json());  // เพิ่ม middleware เพื่อให้ Express ทำการ parse ข้อมูล JSON ใน request body
  app.use('/api', userRoutes);
  app.use('/api', projectRoutes);  // เพิ่มการใช้งาน projectRoutes
  app.use('/api', systemRoutes);
  app.use('/api', screensRoutes);
  app.use('/api', user_projectsRoutes);
  app.use('/api', user_systemRoutes);
  app.use('/api', user_screensRoutes);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Error connecting to the database:', error);
});
