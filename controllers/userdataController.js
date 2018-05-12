const db = require('../models');
const UserData = db.Userdata;
const passport = require('passport');

let userdataController = {
  index: function (req, res) {
    UserData.findAll()
      .then(function (userdatas) {
        res.render('page/login', {
          "todos": userdatas
        });
      });
  },
  signup: function (req, res) {
    // console.log('帳號：' + req.user.username);
    if (!req.session.passport) {
      return res.redirect('../dashboard');
    } else {
      if (req.user.username !== 'admin') {
        return res.redirect('../dashboard');
      } else {
        require('../controllers/passport.js')(passport);
        res.render('page/signup', {
          message: ''
        });
      }
    }
  },
  accountShow: function (req, res) {
    UserData.findAll()
      .then(function (data) {
        res.render('page/accountShow', {
          data: data
        });
      });
  },
  login: function (req, res) {
    require('../controllers/passport.js')(passport);
    res.render('page/login', {
      message: ''
    });
  },
  logout: function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/login');
    });
  }
};
module.exports = userdataController;