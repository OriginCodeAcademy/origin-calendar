'use strict';
const moment = require('moment');

module.exports = function(BookedApt) {


    BookedApt.removedConfirmed = function(email, time, studentName, cb) {
        BookedApt.app.models.Email.send({
          to: email,
          from: 'instructor@origincodeacademy.com',
          subject: ' Confirmed Appointment Removed',
          text: `Your appointment on ${moment(time).format('L')}
         at ${moment(time).format('hh:mm a')} was removed${studentName}`,
        }, function(err, mail) {
          if (err) console.log(err);
          return cb(null, mail);
        });
      };
    
      BookedApt.remoteMethod('removedConfirmed', {
        accepts: [{arg: 'email', type: 'string', required: true},
                {arg: 'time', type: 'string', required: true},
                {arg: 'studentName', type: 'string', required: true}],
                http:{path:'/removedConfirmed', verb:'post'},
        returns: {arg: 'res', type: 'Object'},
      });

      

};
