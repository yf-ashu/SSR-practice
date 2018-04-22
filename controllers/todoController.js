var db = require('../models');
var Todo = db.Todo;

let todoController = {
  index: function (req, res) {
    Todo.findAll()
      .then(function (todos) {
        res.render('index', {"todos": todos});
      });
  },
};
module.exports = todoController;