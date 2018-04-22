var db = require('../models');
var Todo = db.Todo;

let todoController = {
  index: function (req, res) {
    Todo.findAll()
      .then(function (todos) {
        res.render('index', {"todos": todos});
      });
  },
  post: function(req,res){
    console.log(req.body); // 印出 request 的 body 
    res.send(req.body.name); // 如果 body 有 name ，把值回傳
  }
};
module.exports = todoController;