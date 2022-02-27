# Node.js
世界中で多く使われているサーバーサイドで動くJavaScript.

Referenced by [progate](https://prog-8.com/courses/nodejs) Tutorials.

## 参考サイト
- [Macでmysqlを扱う方法](https://qiita.com/fuwamaki/items/194c2a82bd6865f26045)
- [Mac OS上に MySQL8.0 をインストールする](https://qiita.com/kobayashi-m42/items/dae22e49ab060adf920f)
- [Node.js+ExpressでMySQLに接続して一覧表示する](https://0forest.com/node-js-mysql/)
- [MySQLでユーザを作成し、権限を設定する方法](https://proengineer.internous.co.jp/content/columnfeature/6638)

## インデックス
1. [買い物メモサービス](https://github.com/NakatsuboYusuke/nodejs_progate_course#1-%E8%B2%B7%E3%81%84%E7%89%A9%E3%83%A1%E3%83%A2%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9)

## 1. 買い物メモサービス

### Express EJS MySQL をインストール

```bash
$ npm init - y

// Expressをインストール
$ npm install -D express
// EJSをインストール
$ npm install -D ejs
// MySQLをインストール
$ npm install -D mysql
```

### MySQL の設定

```bash
// MySQLのグローバルインストール
$ brew install mysql
// 起動
$ mysql.server start
// パスワードなしでログイン
$ mysql.server start --skip-grant-tables
// 停止
$ mysql.server stop

// rootでログイン
$ mysql -u root
// ログアウト
> exit
// セキュリティの設定
$ mysql_secure_installation
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

### ルーティングの設定

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

### ルーティングの追加(index)

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

### データベースの設定
MySQLへログインする

#### データベースを作成する前に MySQL のパスワードポリシーを変更しておく

>ERROR 1819 (HY000): Your password does not satisfy the current policy requirements

```bash
// サーバーをスタート
$ mysql.server start
// MySQLへログイン
$ mysql -uroot -p

mysql> SHOW VARIABLES LIKE 'validate_password%';
+--------------------------------------+--------+
| Variable_name                        | Value  |
+--------------------------------------+--------+
| validate_password.check_user_name    | ON     |
| validate_password.dictionary_file    |        |
| validate_password.length             | 8      |
| validate_password.mixed_case_count   | 1      |
| validate_password.number_count       | 1      |
| validate_password.policy             | MEDIUM |
| validate_password.special_char_count | 1      |
+--------------------------------------+--------+

// validate_password.policy を LOW に変更 
mysql> set global validate_password.policy=LOW;

mysql> show variables like 'validate_password%';
+--------------------------------------+-------+
| Variable_name                        | Value |
+--------------------------------------+-------+
| validate_password.check_user_name    | ON    |
| validate_password.dictionary_file    |       |
| validate_password.length             | 8     |
| validate_password.mixed_case_count   | 1     |
| validate_password.number_count       | 1     |
| validate_password.policy             | LOW   |
| validate_password.special_char_count | 1     |
+--------------------------------------+-------+

// ユーザーを作成、ユーザー権限を付与
mysql> CREATE USER 'progate'@'localhost' IDENTIFIED BY 'password';
mysql> GRANT ALL ON toDoApp.* TO 'progate'@'localhost';

// ユーザー一覧を表示
mysql> SELECT user, host FROM mysql.user;
```

#### MySQL8.0の認証プラグイン caching_sha2_password でエラーが発生した場合
ポリシーを mysql_native_password に変更する

```bash
code: 'ER_NOT_SUPPORTED_AUTH_MODE',
errno: 1251,
sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',
sqlState: '08004',
fatal: true
```

```bash
// ポリシーの変更
mysql> ALTER USER 'progate'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

mysql> SELECT user, host, plugin FROM mysql.user;
+------------------+-----------+-----------------------+
| user             | host      | plugin                |
+------------------+-----------+-----------------------+
// ...
| progate          | localhost | mysql_native_password |
// ...
+------------------+-----------+-----------------------+
```

```bash
// サーバーをスタート
$ mysql.server start
// MySQLへログイン
$ mysql -uroot -p
// ポート番号の確認
mysql> show variables like 'port';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| port          | 3306  |
+---------------+-------+
```

### データベースの作成
データベース名 toDoApp, テーブル名 items とする

```bash
// データベースを作成
mysql> CREATE DATABASE toDoApp;

// テーブルを作成
mysql> CREATE TABLE items(
    ->      id INT(11) AUTO_INCREMENT NOT NULL,
    ->      name VARCHAR(30) NOT NULL ,
    ->      PRIMARY KEY (id));

// テーブル情報の確認
mysql> DESC items;
+-------+-------------+------+-----+---------+----------------+
| Field | Type        | Null | Key | Default | Extra          |
+-------+-------------+------+-----+---------+----------------+
| id    | int         | NO   | PRI | NULL    | auto_increment |
| name  | varchar(30) | NO   |     | NULL    |                |
+-------+-------------+------+-----+---------+----------------+

// シードデータを投入
mysql> INSERT items(name) VALUES ('じゃがいも');
mysql> INSERT items(name) VALUES ('にんじん');
mysql> INSERT items(name) VALUES ('たまねぎ');
```

#### app.js

```javascript
const mysql = require('mysql');

// ...
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
```

### データベースからデータを取得

#### app.js

```javascript
// ...

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
```

```bash
❯ node app.js
Connected
[
  RowDataPacket { id: 1, name: 'じゃがいも' },
  RowDataPacket { id: 2, name: 'にんじん' },
  RowDataPacket { id: 3, name: 'たまねぎ' }
]
```

#### ~/views/index.ejs

```html
// ...
<ul class="table-body">
  <% items.forEach((item) => { %>
    <li>
      <div class="item-data">
        <span class="id-column"><%= item.id %></span>
        <span class="name-column"><%= item.name %></span>
      </div>
    </li>
  <% }) %>
</ul>
```

### ルーティングの追加(new)

#### app.js

```javascript
//...

// new
app.get('/new', (req, res) => {
  res.render('new.ejs');
});
```

#### ~/views/new.ejs

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
      <a href="/" class="header-logo">LIST APP</a>
    </header>
    <div class="container">
      <div class="container-header">
        <h1>買い物リスト作成</h1>
      </div>
      <div class="item-form-wrapper">
        <p class="form-label">買うもの</p>
        <input type="text">
        <input type="submit" value="作成する">
      </div>
      <a href="/index" class="cancel-button">もどる</a>
    </div>
  </body>
</html>
```

### ルーティングの追加(create)

#### app.js

```javascript
// ...

// フォームから入力された値を受け取る
app.use(express.urlencoded({extended: false}));

// ...

// create
app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO items (name) VALUE (?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/index');
    }
  )
});
```

#### ~/views/new.ejs

```html
// ...

// フォームにmethod属性, action属性を追加する
<form method="post" action="/create">
  // name属性を追加する(値をcreateアクションに渡す)
  <input type="text" name="itemName">
  <input type="submit" value="作成する">
</form>
```

```bash
.
├── README.md
└── toDoApp
    ├── app.js
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── css
    │   │   └── style.css
    │   └── images
    │       └── top.png
    └── views
        ├── hello.ejs
        ├── index.ejs
        ├── new.ejs
        └── top.ejs
```