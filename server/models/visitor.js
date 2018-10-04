'use strict';

require('dotenv').config();
const {google} = require('googleapis');
const opn = require('opn');
const axios = require('axios');

const credentials = {
  installed: {
    clientId: process.env.CLIENT_ID,
    projectId: process.env.PROJECT_ID,
    authuri: process.env.AUTH_URI,
    tokenUri: process.env.TOKEN_URI,
    authProviderX509CertUri: process.env.AUTH_PROVIDER_X509_CERT_URL,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUris: JSON.parse(process.env.REDIRECT_URIS),
  },
};

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


  Visitor.oAuth = (user) => {
    authorize(credentials);

    function authorize(credentials, callback) {
      const {clientId, clientSecret, redirectUris} = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUris[0]);

    // Check if we have previously stored a token.
      if (!user.authToken) return getAccessToken(oAuth2Client);
      oAuth2Client.setCredentials(user.authToken);
      callback(oAuth2Client);
    }

    function getAccessToken(oAuth2Client) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'],
        user: user.id,
      });
      opn(authUrl);
    }
  };

  Visitor.remoteMethod('oAuth', {
    description: 'Returns a user oAuth.',
    accepts: {arg: 'user', type: 'object'},
    http: {path: '/oAuth', verb: 'post'},
    returns: {arg: 'data', type: 'object', root: true},
  });


  Visitor.oAuthConfirm = (code) => {
    console.log(code);
    // const {clientId, clientSecret, redirectUris} = credentials.installed;
    // const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUris[0]);

    // oAuth2Client.getToken(code, (err, token) => {
    //   if (err) return console.error('Error retrieving access token', err);
    //   oAuth2Client.setCredentials(token);
      
    //   axios.post()

    //   fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    //     if (err) console.error(err);
    //     console.log('Token stored to', TOKEN_PATH);
    //   });
    //   callback(oAuth2Client);
    // });
  };

  Visitor.remoteMethod('oAuthConfirm', {
    description: 'Returns a user oAuth Token.',
    accepts: {arg: 'code', type: 'string'},
    http: {path: '/oAuth/Confirm', verb: 'get'},
    returns: {arg: 'data', type: 'object', root: true},
  });
};
