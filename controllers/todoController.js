const db = require('../models');
const Todo = db.Todo;
const User = db.User;

let todoController = {
  index: function (req, res) {
    console.log(req.session.passport)
    Todo.findAll()
      .then(function (todos) {
        if (!req.session.passport) {

          res.render('index', {
            "todos": todos,
            "user": req.session.passport //user後面就是你的資料庫，你設成name他就是name
          });
        } else {
          res.render('index', {
            "todos": todos,
            "user": req.user.name //user後面就是你的資料庫，你設成name他就是name
          });
        }
      });
  },
  post: function (req, res) {
    const list = {
      title: req.body.title,
      date: new Date()
    };
    Todo.create(list)
      .then(todos => {
        res.status(201).redirect('/task');
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
        console.log(todos);
        todos.destroy()
          .then(() => {
            res.redirect('/task');
          })
      }).catch(error => res.status(400).send(error));
  }
};
module.exports = todoController;