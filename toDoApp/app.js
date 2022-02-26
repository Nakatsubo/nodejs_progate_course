const express = require('express');
// MySQL の読み込み
const port = 3306
const mysql = require('mysql');
const app = express();

// データベースと接続
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: port
});
connection.connect((error) => {
  if (error) throw error;
  console.log('Connected');
});

// Assets ファイルの設定
app.use(express.static('public'));

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
      res.render('index.ejs');
    }
  )
});

// サーバーを起動する
app.listen(3000);