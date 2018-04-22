const taskController = require('../controllers/taskController.js');
const todoController = require('../controllers/todoController.js');

module.exports = function (app) {

  app.get('/tasks', taskController.index);
  app.get('/todos', todoController.index);
  app.get('/api/tasks', taskController.indexApi);
  app.post('/',todoController.post);
};