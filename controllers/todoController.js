var db = require('../models');
var Todo = db.Todo;

let todoController = {
  index: function (req, res) {
    Todo.findAll()
      .then(function (todos) {
        res.render('index', {
          "todos": todos
        });
      });
  },
  post: function (req, res) {
    const list = {
      title: req.body.title,
      date:new Date()
    };
     Todo.create(list)
      .then(todos => {
        res.status(201).send("OK!!"); // 如果 body 有 name ，把值回傳
      }).catch(error => res.status(400).send(error));

  }
};
module.exports = todoController;