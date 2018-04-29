const db = require('../models');
const Todo = db.Todo;
const User = db.User;

let todoController = {
  index: function (req, res) {
    console.log(req.session.passport);
    Todo.findAll().then(function (todos) {
      if (!req.session.passport) {
        todos.forEach(function (todo) {
          todo.dataValues.update = '';
          todo.dataValues.delete = '';
        });
        res.render('index', {
          todos: todos,
          user: '', //user後面就是你的資料庫，你設成name他就是name
          status: '登入',
          link: '/signin'
        });
      } else {
        todos.forEach(function (todo) {
          todo.dataValues.update = '修改';
          todo.dataValues.delete = '刪除';
        });
        res.render('index', {
          todos: todos,
          user: req.user.name,
          status: '登出',
          link: '/logout'
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
      })
      .catch(error => res.status(400).send(error));
  },
  delete: function (req, res) {
    const id = {
      where: {
        id: req.params.id
      }
    };
    Todo.find(id)
      .then(todos => {
        console.log(todos);
        todos.destroy().then(() => {
          res.redirect('/task');
        });
      })
      .catch(error => res.status(400).send(error));
  },
  update: function (req, res) {
    const id = {
      where: {
        id: req.params.id
      }
    };
    Todo.findOne(id)
      .then(todos => {

      }).catch(error => res.status(400).send(error));
  }
};
module.exports = todoController;