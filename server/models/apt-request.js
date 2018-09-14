'use strict';

module.exports = function(Aptrequest) {
  // setTimeout(() => {
  //   console.log(Aptrequest.app.models.Email.send());
  // }, 5000);
  Aptrequest.Email = function(cb) {
    Aptrequest.app.models.Email.send({
      to: 'psubing@gmail.com',
      from: 'you@gmail.com',
      subject: 'my subject',
      text: 'my text',
      html: 'my <em>html</em>',
    }, function(err, mail) {
      console.log(mail);
      if (err) cb(err);
      return cb(null, mail);
    });
  };

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
};
