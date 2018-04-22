var express = require('express');
var app = express();

var db = require('./models');

var bodyParser = require('body-parser');
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','ejs');
app.listen(3000, function() {
  db.sequelize.sync();
});

var routes = require('./routes')(app);