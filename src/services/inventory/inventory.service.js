// Initializes the `inventory` service on path `/inventory`
const { Inventory } = require('./inventory.class');
const createModel = require('../../models/inventory.model');
const hooks = require('./inventory.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/inventory', new Inventory(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('inventory');

  service.publish('created', () => { // publish created event
    return [
      app.channel('anonymous')
    ];
  });

  service.publish(() => { // publish all events to all anonymous users
    return [
      app.channel('anonymous')
    ];
  });
  

  service.hooks(hooks);
};
