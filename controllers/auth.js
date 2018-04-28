const db = require('../models');
const User = db.User;
var passport = require('passport')

let userController = {
  index: function (req, res) {
    User.findAll()
      .then(function (users) {
        res.render('login');
      });
  },
  signup: function (req, res) {
    require('../controllers/passport.js')(passport);
    res.render('signup');
  },
  login: function (req, res) {

  }


};
module.exports = userController;