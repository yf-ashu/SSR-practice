var db = require('../models');
var Todo = db.Todo;

let todoController = {
  index: function (req, res) {
    Todo.findAll()
      .then(function (todos) {
        res.render('index.pug', {
          "todos": todos
        });
      });
  },
  post: function (req, res) {
    const list = {
      title: req.body.title,
      date: new Date()
    };
    Todo.create(list)
      .then(todos => {
        res.redirect('/task');
      }).catch(error => res.status(400).send(error));
  }
};
module.exports = todoController;