const taskController = require('../controllers/taskController.js');
const todoController = require('../controllers/todoController.js');
const auth = require('../controllers/auth.js');
var passport = require('passport')

module.exports = function (app) {
  app.get('/', auth.index);
  app.get('/signup', auth.signup);
  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/login',
    failureRedirect: '/signup'
  }));
  // app.post('/', passport.login);
  // app.post('/regist', passport.login);
  app.get('/task', todoController.index);
  app.get('/:id', todoController.delete);
  app.post('/task', todoController.post);
};