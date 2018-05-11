const userdataController = require('../controllers/userdataController.js');
const blogController = require('../controllers/blogController.js');

const passport = require('passport');

module.exports = function (app) {
  app.get('/', blogController.index);
  app.get('/article/posts/:id', blogController.listPost);
  app.get('/api/posts', blogController.indexApi);

  //後台
  app.get('/dashboard', blogController.dashboard);
  //文章
  app.get('/dashboard/post', blogController.postnew);
  app.post('/dashboard/article/post', blogController.post);
  app.get('/dashboard/article', blogController.all);
  app.get('/dashboard/edit', blogController.edit);
  app.post('/dashboard/edit', blogController.update);

  app.get('/dashboard/account',isLoggedIn, userdataController.accountShow);
  app.get('/dashboard/signup',isLoggedIn, userdataController.signup);
  app.get('/dashboard/logout', userdataController.logout);

  //
  app.post('/dashboard/signup', function (req, res, next) {
    passport.authenticate('signup', function (err, user, info) {
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