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
      authToken: {},
    },
  (err, visitor) => {
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
  Visitor.findOrCreate({
    where: {
      email: 'anthony@origincodeacademy.com',
    },
  },
    {
      email: 'anthony@origincodeacademy.com',
      firstName: 'Anthony',
      lastName: 'Valera',
      password: process.env.ADMIN_PASSWORD,
      emailVerified: true,
      authToken: {},
    },
    (err, visitor) => {
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
  Visitor.findOrCreate({
    where: {
      email: 'christian@origincodeacademy.com',
    },
  },
    {
      email: 'christian@origincodeacademy.com',
      firstName: 'Christian',
      lastName: 'McFarland',
      password: process.env.ADMIN_PASSWORD2,
      emailVerified: true,
      authToken: {},
    },
    (err, visitor) => {
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
  Visitor.findOrCreate({
    where: {
      email: 'michael@origincodeacademy.com',
    },
  },
    {
      email: 'michael@origincodeacademy.com',
      firstName: 'Michael',
      lastName: 'Roberts',
      password: process.env.ADMIN_PASSWORD3,
      emailVerified: true,
    },
    (err, visitor) => {
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

