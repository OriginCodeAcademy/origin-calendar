'use strict';

require('dotenv').config();

module.exports = (app) => {
  const {Visitor, Role, RoleMapping} = app.models;
  Visitor.findOrCreate({
    where: {
      email: 'instructor@origincodeacademy.com',
    },
  },
    {
      email: 'instructor@origincodeacademy.com',
      firstName: 'John',
      lastName: 'Doe',
      password: process.env.ADMIN_PASSWORD,
      emailVerified: true,
    },
    (err, visitor) => {
      if (err) console.log(err);
      Role.findOrCreate({
        where: {
          name: 'ADMIN',
        },
      },
        {
          name: 'ADMIN',
        },
        (err, role) => {
          if (err) console.log('error creating role', err);
          RoleMapping.findOrCreate({
            where: {
              principalType: 'ADMIN',
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
