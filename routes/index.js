const todoController = require('../controllers/todoController.js');

module.exports = function (app) {
  app.get('/', todoController.index);
  app.get('/task', todoController.index);
  app.post('/task',todoController.post);
};