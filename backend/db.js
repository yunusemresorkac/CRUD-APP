const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'homemate',
  });


connection.connect((err) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Connected.');
});

module.exports = connection;