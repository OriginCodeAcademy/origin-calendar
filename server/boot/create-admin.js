'use strict';

module.exports = (app) => {
  const {Visitor, Role, RoleMapping} = app.models;

  const instructors = [
    {
      email: 'instructor@origincodeacademy.com',
      firstName: 'John',
      lastName: 'Doe',
      password: process.env.ADMIN_PASSWORD,
    },
    {
      email: 'anthony@origincodeacademy.com',
      firstName: 'Anthony',
      lastName: 'Valera',
      password: process.env.ADMIN_PASSWORD,
    },
    {
      email: 'christian@origincodeacademy.com',
      firstName: 'Christian',
      lastName: 'McFarland',
      password: process.env.ADMIN_PASSWORD2,
    },
    {
      email: 'michael@origincodeacademy.com',
      firstName: 'Michael',
      lastName: 'Roberts',
      password: process.env.ADMIN_PASSWORD3,
    },
  ];

  instructors.forEach(({email, firstName, lastName, password}) => {
    Visitor.findOrCreate({
      where: {
        email,
      },
    },
      {
        email,
        firstName,
        lastName,
        password,
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
  });

  Visitor.findOrCreate({
    where: {
      email: 'student@origincodeacademy.com',
    },
  },
    {
      email: 'student@origincodeacademy.com',
      firstName: 'Student',
      lastName: 'Studentson',
      password: 'abc123',
      emailVerified: true,
    });
};
