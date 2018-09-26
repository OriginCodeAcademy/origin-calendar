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
     at ${moment(time).format('hh:mm a')} was removed`,
  }, function(err, mail) {
    if (err) console.log(err);
    return cb(null, mail);
  });
  };

  Aptrequest.remoteMethod('removeApt', {
  accepts: [{arg: 'email', type: 'string', required: true},
            {arg: 'time', type: 'string', required: true},
            // {arg: 'instructorId', type: 'string', required: true},
            {arg: 'studentName', type: 'string', required: true}],

  returns: {arg: 'res', type: 'Object'},
  });
};  
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
