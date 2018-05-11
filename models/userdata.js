'use strict';
module.exports = (sequelize, DataTypes) => {
  var Userdata = sequelize.define('Userdata', {//這裡的define因為controller裡面需要db.Task
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Userdata;
};