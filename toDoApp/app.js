const express = require('express');
const app = express();

//
app.get('/', (req, res) => {
  res.render('hello.ejs')
});

// top
app.get('/top', (req, res) => {
  res.render('top.ejs');
});

// サーバーを起動する
app.listen(3000);