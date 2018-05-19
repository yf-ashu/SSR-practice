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
  }, signupSubmit: function (req, res, next) {
    passport.authenticate('signup', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.render('page/signup', {
          message: info.message
        });
      }
      return res.redirect('../dashboard/');
    })(req, res, next);
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
  loginSubmit:  function (req, res, next) {
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
  },
  logout: function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/login');
    });
  }
};
module.exports = userdataController;