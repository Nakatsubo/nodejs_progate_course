# Node.js
世界中で多く使われているサーバーサイドで動くJavaScript
Referenced by [progate](https://prog-8.com/courses/nodejs) Tutorials.

## インデックス
- 1. 買い物メモサービス

## 1. 買い物メモサービス

### Express EJS をインストール

```bash
$ npm init - y

// Expressをインストール
$ npm install -D express
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