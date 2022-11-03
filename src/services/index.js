const todos = require('./todos/todos.service.js');
const users = require('./users/users.service.js');
const tasks = require('./tasks/tasks.service.js');
const inventory = require('./inventory/inventory.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(todos);
  app.configure(users);
  app.configure(tasks);
  app.configure(inventory);
}
