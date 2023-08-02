const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'homemate',
  });


connection.connect((err) => {
    if (err) {
        console.error('Veritabanı bağlantısı başarısız:', err);
        return;
    }
    console.log('Veritabanı bağlantısı başarılı.');
});

module.exports = connection;