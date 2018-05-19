const userdataController = require('../controllers/userdataController.js');
const blogController = require('../controllers/blogController.js');

module.exports = function (app) {
  app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
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
  app.get('/dashboard/signup', userdataController.signup);
  app.get('/dashboard/logout', isLoggedIn, userdataController.logout);
  app.post('/dashboard/signup', isLoggedIn,userdataController.signupSubmit);
  app.get('/login', userdataController.login);
  app.post('/login',userdataController.loginSubmit);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
};