'use strict';

module.exports = function(Aptrequest) {
  Aptrequest.Email = function(email, cb) {
    Aptrequest.app.models.Email.send({
      to: email,
      from: 'instructor@origincodeacademy.com',
      subject: 'Appointment Denied',
      text: 'Your appointment was denied',
    }, function(err, mail) {
      console.log(mail);
      if (err) cb(err);
      return cb(null, mail);
    });
  };

  Aptrequest.remoteMethod('Email', {
    accepts: {arg: 'email', type: 'string', required: true},
    returns: {arg: 'res', type: 'Object'},
  });
};
