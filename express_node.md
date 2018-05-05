# Express 筆記

express 是基於 Node.js 的一種網頁開發框架，可以快速搭建一個功能完整的網站。

### 建立專案
安裝express
```
$ npm install express --save
```

快速建立express範例架構
```
$ npm install express-generator 
$ express myapp
$ npm init
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
var express = require('express');//需要的套件
var app = express();//設一個啟動點

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {//告訴server你會在port 3000來執行
  console.log('Example app listening on port 3000!');
});
```

### Routing 路由
server端根據路由設定來回應client的請求
```
app.METHOD(PATH, HANDLER)
```
* PATH是伺服器上的路徑
* HANDLER是你要針對這個路徑的請求作什麼事情

例如：
```
app.get('/', function (req, res) {
  res.send('Got a POST request');
});
```
會傳送一個消息到前端的畫面上

#### 獲取參數的方法
在res.方法(參數)裡
1. req.body.名稱:用在POST方法時
例如：給值name:123，那req.body.name就會等於123
2. req.params.名稱:用在get方法，對應路由的冒號後面
例如：路由設定/user/:name，實際網址列：/user/toy，req.params.name就會是toy
3. req.query.名稱，用在get方法，對應路由的問號
例如：路由設定：/about，實際網址列：/about?name=tom&nickname=tommy，req.query.name就會是tom
#### 其他回應方式
1. res.json():回傳json格式的物件
2. res.render('你的網頁',執行函數或callback)，
res.render('login', { message: info.message });

### Middleware
因為不同的資料類型或者應用軟體皆有差異，所以就有中介軟體來從中間連接及轉換他們，達到溝通及整合的目的

在Express理的中介軟體可以做到
* 執行任何程式碼。
* 對要求和回應物件進行變更。
* 結束要求/回應循環。
* 呼叫堆疊中的下一個中介軟體函數。
如果中介軟體函數不會結束要求/回應循環，它必須呼叫 next()

例如：
```
var app = express();
var bodyParser = require('body-parser');

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
```
* bodyParser是解析POST資料的一個中介軟體
### 靜態檔案路徑

app.use('/hello', express.static(__dirname + '/public/image'));
第一個參數就是路由名稱，第二個就是靜態檔案存放資料夾的實體位址
所以可做到虛擬路徑
如：127.0.0:3000/hello/img.jpg(實際存在public/image裡)


### 參考資料
1. [Express官網](https://hellolynn.hpd.io/2017/08/11/node-js-express-%E5%88%9D%E5%85%A5%E9%96%80-%E4%B8%8A%E9%9B%86/)
2. [Express入門](https://hellolynn.hpd.io/2017/08/11/node-js-express-%E5%88%9D%E5%85%A5%E9%96%80-%E4%B8%8A%E9%9B%86/)
