const db = require('../models');
const Todo = db.Todo;

let todoController = {
  index: function(req, res) {
    console.log(req.session.passport);
    Todo.findAll().then(function(todos) {
      console.log(req.session.passport);
      if (!req.session.passport) {
        res.render('index', {
          todos: todos,
          user: '', //user後面就是你的資料庫，你設成name他就是name
          status: '登入',
          link: '/signin'
        });
      } else {
        res.render('index', {
          todos: todos,
          user: req.user.name,
          status: '登出',
          link: '/logout'
        });
      }
    });
  },
  customer: function(req, res) {
    Todo.findAll().then(function(todos) {
      res.render('customer', {
        todos: todos,
        user: '訪客' //user後面就是你的資料庫，你設成name他就是name
      });
    });
  },
  post: function(req, res) {
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
  delete: function(req, res) {
    const id = {
      where: {
        id: req.params.id
      }
    };
    Todo.find(id)
      .then(todos => {
        // console.log(todos);
        todos.destroy().then(() => {
          res.redirect('/task');
        });
      })
      .catch(error => res.status(400).send(error));
  },
  update: function(req, res) {
    const id = {
      where: {
        id: req.params.id
      }
    };
    const updateValues = {
      title: req.body.display
    };
    Todo.findById(req.params.id)
      .then(todos => {
        todos.update(updateValues).then(finish => {
          res.redirect('/task');
        });
      })
      .catch(error => res.status(400).send(error));
  }
};
module.exports = todoController;
