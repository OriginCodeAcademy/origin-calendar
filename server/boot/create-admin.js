'use strict';

require('dotenv').config();

module.exports = (app) => {
  const {Visitor, Role, RoleMapping} = app.models;
  Visitor.create({
    username: 'John',
    email: 'instructor@origincodeacademy.com',
    firstName: 'John',
    lastName: 'Doe',
    password: process.env.ADMIN_PASSWWORD,
    isAdmin: true,
  },
    (err, visitor) => {
      if (err) console.log(err);
      Role.create({
        name: 'ADMIN',
      },
        (err, role) => {
          if (err) console.log(err);
          RoleMapping.findOrCreate({
            where: {
              principalType: 'ADMIN',
              principalId: visitor.id,
            },
          },
            {
              principalType: 'ADMIN',
              principalId: visitor.id,
            }, (error, mapping) => {
              if (err) console.log(err);
            });
        });
    });
};
