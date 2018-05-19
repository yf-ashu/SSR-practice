const db = require('../models');
const Blog = db.Blog;
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.originalname.split('.')[1])
  }
})

var upload = multer({
  storage: storage
})

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
        console.log(data)
        res.render('page', {
          data: data,
        });
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
  //post發表文章
  post: function (req, res) {
    // let file = req.file.name;
    // console.log(file);
    // console.log('文件类型：%s', file.mimetype);
    let Today = new Date();　
    let str = (Today.getFullYear() + " 年 " + (Today.getMonth() + 1) + " 月 " + Today.getDate() + " 日");

    let uploading = upload.single('uploading');
    uploading(req, res, function (err) {
      if (err) {
        return console.log(err);
      }
   
      var imageExist=req.file ? req.file.filename : null;
      // console.log('文件：' + test)
      const list = {
        name: req.body.name,
        context: req.body.textarea,
        time: str,
        upload:imageExist
      };
      Blog.create(list)
        .then(data => {
          res.redirect('/dashboard/article');
        }).catch(error => res.status(400).send(error));
    })
  },

  //發表文章的輸入頁面
  articleAdd: function (req, res) {
    Blog.findAll()
      .then(function (data) {
        res.render('page/articlePost', {
          data: data
        });
      });
  },
  //顯示所有文章＆可以修改刪除文章
  articleAll: function (req, res) {
    Blog.findAll()
      .then(function (data) {
        res.render('page/articleShow', {
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
    Blog.findOne(id)
      .then(function (data) {
        console.log(data.name);
        res.render('page/edit', {
          data: data,
        });
      });
  },
  //更新文章
  update: function (req, res) {
    const id = {
      where: {
        id: req.body.id
      }
    };
    const updateValues = {
      name: req.body.name,
      context: req.body.context
    };
    Blog.findOne(id)
      .then(data => {
        console.log(updateValues)
        data.update(updateValues).then(finish => {
          res.redirect('/dashboard/article');
        });
      })
      .catch(error => res.status(400).send(error));
  },
  delete: function (req, res) {
    const id = {
      where: {
        id: req.query.id
      }
    };
    Blog.findOne(id)
      .then(user => {
        // console.log(todos);
        user.destroy().then(() => {
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