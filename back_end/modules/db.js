// modules/db.js
const mysql = require('mysql');

const db = mysql.createConnection({
  host: '0.0.0.0',
  user: 'root',
  password: '',
  database: 'graduation_project',
  // charset: 'utf8mb4',
  // timezone: 'UTC',
});

// ...

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('MySQL Connected');
        resolve();
      }
    });
  });
};


module.exports = {
  db,
  connectToDatabase,
};
