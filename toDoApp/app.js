const express = require('express');
// MySQL の読み込み
const mysql = require('mysql');
const app = express();

// データベースと接続
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'progate',
  password: 'password',
  database: 'toDoApp',
  port: 3306
});
connection.connect((error) => {
  if (error) throw error;
  console.log('Connected');
});

// Assets ファイルの設定
app.use(express.static('public'));

//////////////////// CRUD機能の追加

// top
app.get('/', (req, res) => {
  res.render('top.ejs');
});

// index
app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      console.log(results);
      res.render('index.ejs', {items: results});
    }
  )
});

// new
app.get('/new', (req, res) => {
  res.render('new.ejs');
})

// サーバーを起動する
app.listen(3000);