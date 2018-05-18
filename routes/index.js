const userdataController = require('../controllers/userdataController.js');
const blogController = require('../controllers/blogController.js');
const multer  = require('multer')
const upload = multer({ dest: 'upload/' });
const passport = require('passport');

module.exports = function (app) {
  app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
//   app.post('/upload',upload.single('uploading'),function(req,res){
//     res.send('Complete!');
//  });
  // app.post('/profile', upload.single('upload'), blogController.upload);
  app.get('/', blogController.index);
  app.get('/article/posts/:id', blogController.listPost);
  app.get('/api/posts', blogController.indexApi);

  //後台首頁
  app.get('/dashboard', isLoggedIn, blogController.dashboard);
  //文章
  app.get('/dashboard/post', isLoggedIn, blogController.articleAdd);
  app.get('/dashboard/article', isLoggedIn, blogController.articleAll);
  app.get('/dashboard/edit', isLoggedIn, blogController.edit);

  app.post('/dashboard/article/post',isLoggedIn, blogController.post);
  app.post('/dashboard/edit', isLoggedIn, blogController.update);

  app.get('/dashboard/article/post', isLoggedIn, blogController.delete); //id要跟控制器裡面的一樣

  //帳號管理
  app.get('/dashboard/account', isLoggedIn, userdataController.accountShow);
  app.get('/dashboard/signup', isLoggedIn, userdataController.signup);
  app.get('/dashboard/logout', isLoggedIn, userdataController.logout);
  app.post('/dashboard/signup', isLoggedIn, function (req, res, next) {
    passport.authenticate('signup', isLoggedIn, function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.render('page/signup', {
          message: info.message
        });
      }
      return res.redirect('../dashboard/signup');
    })(req, res, next);
  });

  app.get('/login', userdataController.login);
  app.post('/login', function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.render('page/login', {
          message: info.message
        });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect('dashboard');
      });
    })(req, res, next);
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
};