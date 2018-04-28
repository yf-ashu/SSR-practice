const taskController = require('../controllers/taskController.js');
const todoController = require('../controllers/todoController.js');

module.exports = function (app) {
  app.post('/', passport.login);
  app.post('/regist',passport.login);
  app.get('/task', todoController.index);
  app.get('/:id', todoController.delete);
  app.post('/task', todoController.post);
};