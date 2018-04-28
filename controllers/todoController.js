const db = require('../models');
const Todo = db.Todo;

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
      date: new Date()
    };
      Todo.create(list)
        .then(todos => {
          res.redirect('/');
          // res.status(201).send(dateLocal); // 如果 body 有 name ，把值回傳
        }).catch(error => res.status(400).send(error));
    
  },
  delete: function (req, res) {

    const id = {
      where: {
        id: req.params.id
      }
    }
    Todo.find(id)
      .then(todos => {
        todos.destroy()
          .then(() => {
            res.redirect('/');
          })
      }).catch(error => res.status(400).send(error));
  }
};
module.exports = todoController;