# Node.js
世界中で多く使われているサーバーサイドで動くJavaScript.

Referenced by [progate](https://prog-8.com/courses/nodejs) Tutorials.

## インデックス
1. [買い物メモサービス](https://github.com/NakatsuboYusuke/nodejs_progate_course#1-%E8%B2%B7%E3%81%84%E7%89%A9%E3%83%A1%E3%83%A2%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9)

## 1. 買い物メモサービス

### Express EJS をインストール

```bash
$ npm init - y

// Expressをインストール
$ npm install -D express
// EJSをインストール
$ npm install -D ejs
```

#### app.js

```javascript
const express = require('express');
const app = express();

//
app.get('/', (req, res) => {
  res.render('hello.ejs')
});

// サーバーを起動する
app.listen(3000);
```

#### ~/views/hello.ejs
ejsファイルはviewsディレクトリ配下に置く

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=p, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <p>Hello, World</p>
</body>
</html>
```

```bash
.
├── README.md
└── toDoApp
    ├── app.js
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    └── views
        └── hello.ejs
```

### ルーティング

#### app.js

```javascript
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
```

#### ~/views/top.ejs

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>LIST APP</title>
    <script src="/send_url.js"></script>
  </head>
  <body>
    <div class="top-wrapper">
      <div class="top-detail">
        <h2 class="subtitle">買い物リストアプリ</h2>
        <h1 class="title">LIST APP</h1>
        <p class="description">
          LIST APPは、買い物をリストアップするサービスです。
          <br>
          買いたいものをリストに追加してみましょう。
        </p>
        <a class="index-button">一覧を見る</a>
      </div>
      <div class="top-image">
      </div>
    </div>
  </body>
</html>
```

### Assets ファイルの設定
publicディレクトリ配下に置く

```bash
.
├── app.js
├── node_modules
├── package-lock.json
├── package.json
├── public
└── views
    ├── hello.ejs
    └── top.ejs
```

#### ~/public/css/style.css
#### ~/public/images/top.png

```html
// ...

<link rel="stylesheet" href="/css/style.css">

//...
<div class="top-image">
  <img src="/images/top.png">
</div>
```

### ルーティングの追加

#### app.js

```javascript
const express = require('express');
const app = express();

// Assets ファイルの設定 <- 追加
app.use(express.static('public'));

//
app.get('/', (req, res) => {
  res.render('hello.ejs')
});

// top
app.get('/top', (req, res) => {
  res.render('top.ejs');
});

// index <- 追加
app.get('/index', (req, res) => {
  res.render('index.ejs');
})

// サーバーを起動する
app.listen(3000);
```

#### ~/views/index.ejs

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>LIST APP</title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="/send_url.js"></script>
  </head>
  <body>
    <header>
      <a class="header-logo">LIST APP</a>
    </header>
    <div class="container">
      <div class="container-header">
        <h1>買い物リスト</h1>
      </div>
      <div class="index-table-wrapper">
        <div class="table-head">
          <span class="id-column">ID</span>
          <span>買うもの</span>
        </div>
        <ul class="table-body">
          <li>
            <span class="id-column">1</span>
            <span class="name-column">じゃがいも</span>
          </li>
          <li>
            <span class="id-column">2</span>
            <span class="name-column">にんじん</span>
          </li>
          <li>
            <span class="id-column">3</span>
            <span class="name-column">たまねぎ</span>
          </li>
        </ul>
      </div>
    </div>
  </body>
</html>
```
