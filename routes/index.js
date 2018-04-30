const taskController = require('../controllers/taskController.js');
const todoController = require('../controllers/todoController.js');
const auth = require('../controllers/auth.js');
const passport = require('passport');

module.exports = function(app) {
  app.get('/', todoController.customer);
  app.get('/signup', auth.signup);
  app.post('/signup', function(req, res, next) {
    passport.authenticate('signup', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.render('signup', { message: info.message });
      }
      return res.redirect('/signin');
    })(req, res, next);
  });
  app.get('/signin', auth.signin);
  app.post('/signin', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.render('login', { message: info.message });
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/task');
      });
    })(req, res, next);
  });
  app.get('/logout', auth.logout);
  app.get('/task',isLoggedIn, todoController.index);
  app.get('/task/:id', todoController.delete); //id要跟控制器裡面的一樣
  app.post('/task/update/:id', todoController.update);
  app.post('/task',  todoController.post);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/signin');
  }
};
