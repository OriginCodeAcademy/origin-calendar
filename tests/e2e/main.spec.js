'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/server');
const Nightmare = require('nightmare');

let nightmare;

chai.use(chaiHttp);
const expect = chai.expect;

const path = 'http://localhost:8080' || process.env.PORT;

describe('sending a success response', ()=>{
    before(() => {
        server.listen(8080);
    })

  beforeEach(()=>{
    nightmare = new Nightmare();
  });

  it('should expect input textarea and submit buttons to exist', () =>
  nightmare
    .goto(path)
    .type('#inputemail', 'student@origincodeacademy.com')//nightmare logs in with email
    .type('#inputemailpassword', 'testies')//nightmare logs in with password
    .click('.btn-info')//clicks on button
    .wait('#reqtest')
    .click('#reqtest')//clicks on request page
    .wait('#christian')
    .click('#christian')//clicks on christian
    .wait('input')
    .exists('input')//checks to see if there are input elements on the submit page
    .wait('option')
    .exists('option')//checks to see if there is an option value element on the submit page
    .evaluate(()=> document.querySelector('button[name=submit]'))
    .then(button => expect(button).to.equal)  
    ).timeout(30000)
  })
