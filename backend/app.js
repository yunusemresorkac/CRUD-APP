const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');



const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Bu origin için CORS izni reddedildi.'));
    }
  },
};
app.use(cors(corsOptions));
app.use(bodyParser.json());




app.post('/add-data', (req, res) => {
  const { Title, Author, Publisher, Category, Description, PageCount, Price } = req.body;

  const PostId = generateRandomString();
  
  // Check the SQL query for syntax errors and placeholders
  const insertQuery = `INSERT INTO books (Title, Author, Publisher, Category, Description, PageCount, Price, PostId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [Title, Author, Publisher, Category, Description, PageCount, Price, PostId];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('Veri eklerken bir hata oluştu:', err);
      res.status(500).json({ error: 'Veri eklerken bir hata oluştu' });
      return;
    }
    console.log('Yeni veri eklendi:', result);
    res.json({ message: 'Veri başarıyla eklendi!' });
  });
});


app.put('/update-data/:postId', (req, res) => {
  const postId = req.params.postId;
  const { Title, Author, Publisher, Category, Description, PageCount, Price } = req.body;

  const updateQuery = `UPDATE books SET Title = ?, Author = ?, Publisher = ?, Category = ?, Description = ?, PageCount = ?, Price = ? WHERE PostId = ?`;
  const values = [Title, Author, Publisher, Category, Description, PageCount, Price, postId];

  db.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error('Veri güncellerken bir hata oluştu:', err);
      res.status(500).json({ error: 'Veri güncellerken bir hata oluştu' });
      return;
    }
    console.log('Veri başarıyla güncellendi:', result);
    res.json({ message: 'Veri başarıyla güncellendi!' });
  });
});

app.delete('/delete-data/:postId', (req, res) => {
  const { postId } = req.params;

  // Perform the deletion operation in the database
  const deleteQuery = `DELETE FROM books WHERE PostId = ?`;

  db.query(deleteQuery, [postId], (err, result) => {
    if (err) {
      console.error('Veri silerken bir hata oluştu:', err);
      res.status(500).json({ error: 'Veri silerken bir hata oluştu' });
      return;
    }
    console.log('Veri başarıyla silindi:', result);
    res.json({ message: 'Veri başarıyla silindi!' });
  });
});


app.get('/get-data', (req, res) => {
  const selectQuery = 'SELECT * FROM books';
  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Verileri alırken bir hata oluştu:', err);
      res.status(500).json({ error: 'Verileri alırken bir hata oluştu' });
      return;
    }

    res.json(results);
  });
});




app.get('/get-data/:postId', (req, res) => {
  const postId = req.params.postId;

  const selectQuery = 'SELECT * FROM books WHERE PostId = ?';
  db.query(selectQuery, [postId], (err, result) => {
    if (err) {
      console.error('Detay verilerini alırken bir hata oluştu:', err);
      res.status(500).json({ error: 'Detay verilerini alırken bir hata oluştu' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'Belirtilen ID ile eşleşen veri bulunamadı' });
      return;
    }

    res.json(result[0]);
  });
});

function generateRandomString() {
  const length = 8;
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});