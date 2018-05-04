#Express 筆記

express 是基於 Node.js 的一種網頁開發框架，可以快速搭建一個功能完整的網站。

### 建立專案
安裝express
```
$ npm install express --save
```
快速建立express範例架構
```
$ npm install express-generator 
$ express myapp
```
會生出如下架構
```

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.jade
   create : myapp/views/layout.jade
   create : myapp/views/error.jade
   create : myapp/bin
   create : myapp/bin/www
```
要作部分修改的話
```
$ express --view=ejs myapp//view的部分就會變成ejs了
 create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.ejs
   create : myapp/views/layout.ejs
   create : myapp/views/error.ejs
   create : myapp/bin
   create : myapp/bin/www
```
### 建立程式進入點
要啟動伺服器的地方，在package.json裡面可以設定檔案
要啟動時會下
```
$ node 進入點名稱.js
如果你有設定的話可以下npm start(沒有設定的話預設會是node server.js )
```
範例的server.js
```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```
### Middleware

### Routing 路由