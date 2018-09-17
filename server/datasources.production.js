'use strict';
console.log('using production settings...');
console.log(`process is in mode :::: ${process.env.NODE_ENV}`);
module.exports = {
  'mongo': {
    'url': process.env.MONGO_URI,
    'name': 'mongo',
    'connector': 'mongodb',
  },
  'sendgrid': {
    'connector': 'loopback-connector-sendgrid',
    'api_key': `${process.env.SENDGRID_API_KEY}`,
  },
};
