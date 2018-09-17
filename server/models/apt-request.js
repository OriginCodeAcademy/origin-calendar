'use strict';
const moment = require('moment');

module.exports = function(Aptrequest) {
  Aptrequest.denyEmail = function(email, time, cb) {
    Aptrequest.app.models.Email.send({
      to: email,
      from: 'instructor@origincodeacademy.com',
      subject: 'Appointment Denied',
      text: `Your appointment on ${moment(time).format('L')} at ${moment(time).format('hh:mm a')} was denied.`,
    }, function(err, mail) {
      console.log(mail);
      if (err) cb(err);
      return cb(null, mail);
    });
  };

  Aptrequest.remoteMethod('denyEmail', {
    accepts: [{arg: 'email', type: 'string', required: true},
              {arg: 'time', type: 'string', required: true}],
    returns: {arg: 'res', type: 'Object'},
  });

  Aptrequest.approveEmail = function(email, time, cb) {
    Aptrequest.app.models.Email.send({
      to: email,
      from: 'instructor@origincodeacademy.com',
      subject: 'Appointment Approved',
      text: `Your appointment on ${moment(time).format('L')} at ${moment(time).format('hh:mm a')} was approved`,
    }, function(err, mail) {
      console.log(mail);
      if (err) cb(err);
      return cb(null, mail);
    });
  };

  Aptrequest.remoteMethod('approveEmail', {
    accepts: [{arg: 'email', type: 'string', required: true},
              {arg: 'time', type: 'string', required: true}],
    returns: {arg: 'res', type: 'Object'},
  });
};
