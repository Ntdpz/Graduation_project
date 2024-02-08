const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');  // Import bodyParser module

const taskRoutes = require('./routes/task_routes.js');
const user_taskRoutes = require('./routes/user/user_taskRoutes.js');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');  
const systemRoutes = require('./routes/systemRoutes'); 
const screensRoutes = require('./routes/screensRoutes.js');
const user_projectsRoutes = require('./routes/user/user_projectsRoutes.js');
const user_systemRoutes = require('./routes/user/user_systemsRoutes.js');
const user_screensRoutes = require('./routes/user/user_screensRoutes.js');
const { connectToDatabase } = require('./modules/db');

const app = express();

app.use(cors());

const port = 8080;

connectToDatabase().then(() => {
  // เปลี่ยน express.json() และ express.urlencoded() เป็น bodyParser.json() และ bodyParser.urlencoded()
  app.use(bodyParser.json({ limit: '50mb' })); // ตั้งขนาดสูงสุดของ JSON payload
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // ตั้งขนาดสูงสุดของ URL-encoded payload
  
  app.use('/api', taskRoutes);
  app.use('/api', user_taskRoutes);
  app.use('/api', userRoutes);
  app.use('/api', projectRoutes);
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