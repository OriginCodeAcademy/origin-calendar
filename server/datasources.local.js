'use strict';
console.log('using development settings...');
module.exports = {
  'mongo': {
    'url': 'mongodb://localhost:27017/origin-calendar',
    'name': 'mongo',
    'connector': 'mongodb',
  },
  'sendgrid': {
    'connector': 'loopback-connector-sendgrid',
    'api_key': `${process.env.SENDGRID_API_KEY}`,
  },
};
