'use strict';
const moment = require('moment');

module.exports = function(Aptrequest) {
  Aptrequest.denyEmail = function(email, time, cb) {
    Aptrequest.app.models.Email.send({
      to: email,
      from: 'instructor@origincodeacademy.com',
      subject: 'Appointment Denied',
      text: `Your appointment on ${moment(time).format('L')}
       at ${moment(time).format('hh:mm a')} was denied.`,
    }, function(err, mail) {
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
      text: `Your appointment on ${moment(time).format('L')}
       at ${moment(time).format('hh:mm a')} was approved`,
    }, function(err, mail) {
      if (err) cb(err);
      return cb(null, mail);
    });
  };

  Aptrequest.remoteMethod('approveEmail', {
    accepts: [{arg: 'email', type: 'string', required: true},
              {arg: 'time', type: 'string', required: true}],
    returns: {arg: 'res', type: 'Object'},
  });

  Aptrequest.removeApt = function(email, time, studentName, cb) {
    Aptrequest.app.models.Email.send({
      to: email,
      from: 'instructor@origincodeacademy.com',
      subject: 'Appointment Removed',
      text: `Your appointment on ${moment(time).format('L')}
<<<<<<< HEAD
     at ${moment(time).format('hh:mm a')} was removed`,
=======
      at ${moment(time).format('hh:mm a')} was removed`,
>>>>>>> 79808fab72d7d09bc4aa93f1ccf087bd72e4fd49
    }, function(err, mail) {
      if (err) console.log(err);
      return cb(null, mail);
    });
  };

  Aptrequest.remoteMethod('removeApt', {
    accepts: [{arg: 'email', type: 'string', required: true},
<<<<<<< HEAD
            {arg: 'time', type: 'string', required: true},
            // {arg: 'instructorId', type: 'string', required: true},
            {arg: 'studentName', type: 'string', required: true}],
    returns: {arg: 'res', type: 'Object'},
  });

  Aptrequest.replacedApt = function(email, time, cb) {
    Aptrequest.app.models.Email.send({
      to: email,
      from: 'instructor@origincodeacademy.com',
      subject: 'Appointment unavailable',
      text: `Your appointment on ${moment(time).format('L')}
       at ${moment(time).format('hh:mm a')} is no longer available.`,
    }, function(err, mail) {
      if (err) cb(err);
      return cb(null, mail);
    });
  };

  Aptrequest.remoteMethod('replacedApt', {
    accepts: [{arg: 'email', type: 'string', required: true},
              {arg: 'time', type: 'string', required: true}],
=======
              {arg: 'time', type: 'string', required: true},
              // {arg: 'instructorId', type: 'string', required: true},
              {arg: 'studentName', type: 'string', required: true}],

>>>>>>> 79808fab72d7d09bc4aa93f1ccf087bd72e4fd49
    returns: {arg: 'res', type: 'Object'},
  });

  Aptrequest.emailAdmin = function(instructorEmail, time, studentName, cb) {
    Aptrequest.app.models.Email.send({
      to: instructorEmail,
      from: 'instructor@origincodeacademy.com',
      subject: `${studentName} Requested Your 
      ${moment(time).format('hh:mma')} Appointment`,
      text: `${studentName} has requested your appointment at 
      ${moment(time).format('hh:mm a')} on ${moment(time).format('L')}`,
    }, function(err, mail) {
      if (err) cb(err);
      return cb(null, mail);
    });
  };

  Aptrequest.remoteMethod('emailAdmin', {
    accepts: [{arg: 'instructorEmail', type: 'string', required: true},
              {arg: 'time', type: 'string', required: true},
              {arg: 'studentName', type: 'string', required: true}],
    returns: {arg: 'res', type: 'Object'},
  });
};
