var bCrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');
const User = db.User;


module.exports = function (passport) {
  passport.use('signup', new LocalStrategy({
      passReqToCallback: true
    },
    function (req, username, password, done) {

      var generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

      };
      User.findOne({
        where: {
          name: username
        }
      }).then((user)=> {

        if (user) {
          return done(null, false, res.send('User already exists'));

        } else

        {
          var userPassword = generateHash(password);
          var data = {
            name: username,
            password: userPassword,

          };


          User.create(data).then(function (newUser, created) {

            if (!newUser) {

              return done(null, false);

            }

            if (newUser) {

              return done(null, newUser);

            }

          });

        }

      }).catch(error => console.log(error));
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
      done(null, user);
    }).catch(function (e) {
      done(e, false);
    });
  });

}