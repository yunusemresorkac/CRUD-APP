const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourPassword',
    database: 'yourDatabaseName',
  });


connection.connect((err) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Connected.');
});

module.exports = connection;
