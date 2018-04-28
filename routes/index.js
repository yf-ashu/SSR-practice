const taskController = require('../controllers/taskController.js');
const todoController = require('../controllers/todoController.js');
const auth = require('../controllers/auth.js');
var passport = require('passport');

module.exports = function(app) {
  app.get('/', auth.index);
  app.get('/signup', auth.signup);
  app.post(
    '/signup',
    passport.authenticate('signup', {
      successRedirect: '/singin',
      failureRedirect: '/signup'
    })
  );
  app.get('/signin', auth.signin);
  app.post(
    '/signin',
    passport.authenticate('login',{
      successRedirect: '/task',
      failureRedirect: '/signin'
    })
    // , function(req, res) {
    //   // 如果這個 function 有執行，表示通過驗證
    //   // 在 req.user 中會回傳被認證的使用者
    //   res.redirect('/task/' + req.user.name);//有回傳但變成這個[object%20SequelizeInstance:User]
    // }
  );
  app.get('/logout', auth.logout);
  app.get('/task',  todoController.index);
  app.get('/task/:id', todoController.delete);//id要跟控制器裡面的一樣
  app.post('/task', todoController.post);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/signin');
  }
};
