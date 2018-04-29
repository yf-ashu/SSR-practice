'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define(
    'Todo',
    {
      //這裡的define因為controller裡面需要db.Task
      title: DataTypes.STRING,
      date: DataTypes.DATE
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      },
      timestamps: true,
      paranoid: true
    }
  );
  return Todo;
};
