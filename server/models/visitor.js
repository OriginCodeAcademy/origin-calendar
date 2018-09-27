'use strict';

// require('dotenv').config();
// const {google} = require('googleapis');
// const opn = require('opn');

module.exports = function(Visitor) {
  Visitor.isAdminRole = (id, callback) => {
    const {RoleMapping} = Visitor.app.models;
    RoleMapping.findOne({where: {
      'principalType': 'ADMIN', 'principalId': id,
    }})
    .then(results => callback(null, !!results));
  };

  Visitor.remoteMethod('isAdminRole', {
    description: 'Returns a user role.',
    accepts: {arg: 'id', type: 'string'},
    http: {path: '/isAdminRole', verb: 'get'},
    returns: {arg: 'data', type: 'object', root: true},
  });

  // Visitor.oAuth = (user) => {
  //   const SCOPES = ['https://www.googleapis.com/auth/calendar'];
  //   const TOKEN_PATH = './google-calendar/token.json';
  //   const credentials = {
  //     installed: {
  //       clientId: process.env.CLIENT_ID,
  //       projectId: process.env.PROJECT_ID,
  //       authuri: process.env.AUTH_URI,
  //       tokenUri: process.env.TOKEN_URI,
  //       authProviderX509CertUri: process.env.AUTH_PROVIDER_X509_CERT_URL,
  //       clientSecret: process.env.CLIENT_SECRET,
  //       redirectUris: JSON.parse(process.env.REDIRECT_URIS),
  //     },
  //   };

  //   authorize(credentials);

  //   function authorize(credentials, callback) {
  //     const {clientId, clientSecret, redirectUris} = credentials.installed;
  //     const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUris[0]);

  //   // Check if we have previously stored a token.
  //     if (!user.authToken) return getAccessToken(oAuth2Client);
  //     oAuth2Client.setCredentials(user.authToken);
  //     callback(oAuth2Client);
  //   }

  //   function getAccessToken(oAuth2Client) {
  //     const authUrl = oAuth2Client.generateAuthUrl({
  //       access_type: 'offline',
  //       scope: SCOPES,
  //     });
  //     opn(authUrl, 'Google Auth');
  //   }
  // };

  // Visitor.remoteMethod('oAuth', {
  //   description: 'Returns a user oAuth.',
  //   accepts: {arg: 'user', type: 'object'},
  //   http: {path: '/oAuth', verb: 'post'},
  //   returns: {arg: 'data', type: 'object', root: true},
  // });
};
