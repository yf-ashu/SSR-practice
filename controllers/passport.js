const db = require('../models');
const User = db.User;

let userController = {
  
  login: function (req, res) {
    const list = {
      name: req.body.name,
      password:req.body.password
    };
      User.create(list)
        .then(todos => {
          res.redirect('/');
          // res.status(201).send(dateLocal); // 如果 body 有 name ，把值回傳
        }).catch(error => res.status(400).send(error));
  }
};
module.exports = userController;