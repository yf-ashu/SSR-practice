'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {//這裡的define因為controller裡面需要db.Task
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};