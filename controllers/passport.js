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
        const saltRounds = 10;
       var hash=bCrypt.hashSync(password, bCrypt.genSaltSync(saltRounds));
        return hash;

      };
      User.findOne({
        where: {
          name: username
        }
      }).then((user) => {

        if (user) {
          return done(null, false, {
            message: 'error'
          });

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
  passport.use('login', new LocalStrategy(
    {
      passReqToCallback: true 
    },
    function (req, username, password, done) {
      var isValidPassword = function ( password,check) {

        return bCrypt.compareSync(password,check);
      }

      User.findOne({
        where: {
          name: username
        }
      }).then(function (user) {

        if (!user) {
          return done(null, false, {
            message: 'error'
          });
        }
        if (!isValidPassword(password,user.password)) {

          return done(null, false, {
            message: 'Incorrect password.'
          });

        }


        var userinfo = user.get();
        return done(null, userinfo);


      }).catch(function (err) {

        console.log("Error:", err);

        return done(null, false, {
          message: 'Something went wrong with your Signin'
        });

      });

    }

  ));


  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    }).catch(function (e) {
      done(e, false);
    });
  });



}