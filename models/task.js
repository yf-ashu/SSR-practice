'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {//這裡的define因為controller裡面需要db.Task
    title: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Task;
};