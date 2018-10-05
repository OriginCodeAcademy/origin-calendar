'use strict';

require('dotenv').config();
const {google} = require('googleapis');
const opn = require('opn');
const axios = require('axios');
let currentUser = {};

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
    currentUser = user;
    authorize(credentials);

    function authorize(credentials) {
      const {clientId, clientSecret, redirectUris} = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUris[0]);

      if (Object.keys(user.authToken).length == 0) {
        return getAccessToken(oAuth2Client);
      } else {
        oAuth2Client.refreshToken(user.authToken.refresh_token)
        .then(res => {
          Visitor.upsertWithWhere(
            {id: currentUser.id},
            {
              authToken: {
                access_token: res.tokens.access_token,
                refresh_token: user.authToken.refresh_token,
                scope: 'https://www.googleapis.com/auth/calendar',
                token_type: 'Bearer',
                expiry_date: res.tokens.expiry_date,
              },
            });
        })
        .catch(err => console.log(err));
      }

      oAuth2Client.setCredentials(user.authToken);
    }

    function getAccessToken(oAuth2Client) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://www.googleapis.com/auth/calendar'],
      });

      opn(authUrl);
    }
  };

  Visitor.remoteMethod('oAuth', {
    description: 'Returns a user oAuth.',
    accepts: [
      {arg: 'user', type: 'object'},
      {arg: 'res', type: 'object', http: ctx => ctx.res},
    ],
    http: {path: '/oAuth', verb: 'post'},
    returns: {arg: 'data', type: 'object', root: true},
  });

  Visitor.oAuthConfirm = (code, res) => {
    const {clientId, clientSecret, redirectUris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUris[0]);

    oAuth2Client.getToken(code, (err, token) => {
      console.log('Token: ', token);
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      Visitor.upsertWithWhere({id: currentUser.id}, {authToken: token});

      res.redirect('/');
    });
  };

  Visitor.remoteMethod('oAuthConfirm', {
    description: 'Returns a user oAuth Token.',
    accepts: [
      {arg: 'code', type: 'string'},
      {arg: 'res', type: 'object', http: ctx => ctx.res},
    ],
    http: {path: '/oAuthConfirm', verb: 'get'},
    returns: {arg: 'data', type: 'object', root: true},
  });
};
