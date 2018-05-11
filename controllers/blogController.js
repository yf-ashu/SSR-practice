const db = require('../models');
const Blog = db.Blog;
const passport = require('passport');

let blogdataController = {
  //前台
  index: function (req, res) {
    Blog.findAll()
      .then(function (data) {
        res.render('index', {
          user: 'HELLO',
        });
      });
  },
  listPost: function (req, res) {
    const id = {
      where: {
        id: req.params.id
      }
    };
    Blog.find(id)
      .then(data => {
        res.json(data);
      })
      .catch(error => res.status(400).send(error));
  },
  //後台
  dashboard: function (req, res) {
    Blog.findAll()
      .then(function (data) {
        res.render('page/dashboard', {
          user: 'req.user.username',
        });
      });
  },
  //發表文章
  post: function (req, res) {
    const list = {
      name: req.body.name,
      context: req.body.textarea
    };
    Blog.create(list)
      .then(data => {
        res.redirect('/dashboard/article');
      }).catch(error => res.status(400).send(error));
  },
  //顯示發表文章
  postnew: function (req, res) {
    Blog.findAll()
      .then(function (data) {
        res.render('page/post', {
          user: 'req.user.username',
        });
      });
  },
  //顯示所有文章
  all: function (req, res) {
    Blog.findAll()
      .then(function (data) {
        res.render('page/article', {
          data: data
        });
      });
  },
  //各別修改文章頁面
  edit: function (req, res) {
    const id = {
      where: {
        id: req.query.id
      }
    };
    Blog.find(id)
      .then(function (data) {
        console.log(data.name);
        res.render('page/edit', {
          data: data,
        });
      });
  },
  update: function (req, res) {
    const id = {
      where: {
        id: req.body.id
      }
    };
    const updateValues = {
      name:req.body.name,
      context: req.body.context
    };
    Blog.findById(req.body.id)
      .then(data => {
        console.log(updateValues)
        data.update(updateValues).then(finish => {
          res.redirect('/dashboard/article');
        });
      })
      .catch(error => res.status(400).send(error));
  },

  //給前端用的api
  indexApi: function (req, res) {
    Blog.findAll()
      .then(function (data) {
        res.json(data);
      });
  },
};
module.exports = blogdataController;