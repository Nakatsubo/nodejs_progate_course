const express = require('express');
const app = express();

// Assets ファイルの設定
app.use(express.static('public'));

//
app.get('/', (req, res) => {
  res.render('hello.ejs')
});

// top
app.get('/top', (req, res) => {
  res.render('top.ejs');
});

// index
app.get('/index', (req, res) => {
  res.render('index.ejs');
})

// サーバーを起動する
app.listen(3000);