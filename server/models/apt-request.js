'use strict';

module.exports = function(Aptrequest) {
  // setTimeout(() => {
  //   console.log(Aptrequest.app.models.Email.send());
  // }, 5000);
<<<<<<< HEAD
  Aptrequest.Email = function(email, cb) {
    Aptrequest.app.models.Email.send({
      to: email,
      from: 'instructor@origincodeacademy.com',
      subject: 'Appointment Denied',
      text: 'Your appointment was denied',
=======
  Aptrequest.Email = function(cb) {
    Aptrequest.app.models.Email.send({
      to: 'psubing@gmail.com',
      from: 'you@gmail.com',
      subject: 'my subject',
      text: 'my text',
      html: 'my <em>html</em>',
>>>>>>> cddba922964dec6d18f7ea145cf5f81d5a31f319
    }, function(err, mail) {
      console.log(mail);
      if (err) cb(err);
      return cb(null, mail);
    });
  };

<<<<<<< HEAD
  // Aptrequest.remoteMethod('Email', {
  //   accepts: {arg: 'email', type: 'string'},
  //   returns: {arg: 'Email', type: 'string', root: true}
  // })

  Aptrequest.remoteMethod('Email', {
    accepts: [//{arg: 'id', type: 'string', required: true},
            {arg: 'email', type: 'string', required: true}],
    //http: {path: '/Visitors/:id', verb: 'get', source: 'query'},
    returns: {arg: 'res', type: 'Object'},
  });

  // Aptrequest.greet = function(msg, cb) {
  //   console.log('Greetings... ' + msg);
  //   return cb(null, 'Greetings... ' + msg);
  // }

  // Aptrequest.remoteMethod('greet', {
  //       accepts: {arg: 'msg', type: 'string'},
  //       returns: {arg: 'greeting', type: 'string', root: true }
  // });
=======
  Aptrequest.remoteMethod('Email', {
    accepts: {arg: 'email', type: 'string'},
    returns: {arg: 'Email', type: 'string', root: true}
  })

  Aptrequest.greet = function(msg, cb) {
    console.log('Greetings... ' + msg);
    return cb(null, 'Greetings... ' + msg);
  }

  Aptrequest.remoteMethod('greet', {
        accepts: {arg: 'msg', type: 'string'},
        returns: {arg: 'greeting', type: 'string', root: true }
  });
>>>>>>> cddba922964dec6d18f7ea145cf5f81d5a31f319
};
