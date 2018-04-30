const db = require('../models');
const User = db.User;
const Todo = db.Todo;
var passport = require('passport');

let userController = {
  signup: function(req, res) {
    require('../controllers/passport.js')(passport);
    res.render('signup', { message: '' });
  },
  signin: function(req, res) {
    require('../controllers/passport.js')(passport);
    res.render('login', { message: '' });
  },
  logout: function(req, res) {
    req.session.destroy(function(err) {
      res.redirect('/');
    });
  }
};
module.exports = userController;
