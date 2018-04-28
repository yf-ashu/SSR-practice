const taskController = require('../controllers/taskController.js');
const todoController = require('../controllers/todoController.js');
const auth = require('../controllers/auth.js');
var passport = require('passport')

module.exports = function (app) {
  app.get('/', auth.index);
  app.get('/signup', auth.signup);
  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }));
  app.get('/signin', auth.signin);
  app.post('/signin', passport.authenticate('login', {
    successRedirect: '/task',
    failureRedirect: '/signin'
  }));
  app.get('/logout', auth.logout);
  app.get('/task', isLoggedIn, todoController.index);
  app.get('/:id', todoController.delete);
  app.post('/task', todoController.post);

  function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())

      return next();

    res.redirect('/signin');

  }
};