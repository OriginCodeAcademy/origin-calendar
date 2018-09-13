'use strict';

module.exports = function(Visitor) {
  Visitor.isAdminRole = (id, callback) => {
    const {RoleMapping} = Visitor.app.models;
    RoleMapping.findOne({where: {
      'principalType': 'ADMIN', 'principalId': id,
    }})
    .then(results => callback(null, !!results));
  };

  Visitor.remoteMethod('isAdminRole', {
    description: 'Returns a user role.',
    accepts: {arg: 'id', type: 'string'},
    http: {path: '/isAdminRole', verb: 'get'},
    returns: {arg: 'data', type: 'object', root: true},
  });
};
