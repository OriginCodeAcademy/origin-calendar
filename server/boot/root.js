'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  // router.get('/', server.loopback.status());
  router.get('/random', (req, res) => {
    const admin = {
      firstName: 'John',
      lastName: 'Doe',
    };
    res.render('index', {admin});
  });
  server.use(router);
};
