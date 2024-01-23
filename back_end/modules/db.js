const mysql = require('mysql');

const db = mysql.createPool({
  connectionLimit: 10,
  host: '0.0.0.0',
  user: 'root',
  password: '',
  database: 'graduation_project',
});

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        console.log('MySQL Connected');
        connection.release();
        resolve();
      }
    });
  });
};

module.exports = {
  db,
  connectToDatabase,
};