'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/server');
const Nightmare = require('nightmare');

let nightmare;

chai.use(chaiHttp);
const expect = chai.expect;

const path = 'http://localhost:8080';

describe('sending a success response', ()=>{
    before(() => {
      server.listen(8080);
    });

  beforeEach(()=>{
    nightmare = new Nightmare();
  });

  it('should expect input textarea and submit buttons to exist', () =>
  nightmare
    .goto(path)
    .type('#inputemail', 'student@origincodeacademy.com')
    .type('#inputemailpassword', 'testies')
    .click('.btn-info')
    .wait('#reqtest')
    .click('#reqtest')
    .wait('#christian')
    .click('#christian')
    .wait('input')
    .exists('input')
    .wait('option')
    .exists('option')
    .evaluate(()=> document.querySelector('button[name=submit]'))
    .then(button => expect(button).to.equal)
    ).timeout(30000);

    it('should check to see if select is populated with values greater than current time', ()=>
    nightmare
    .goto(path)
    .type('#inputemail', 'student@origincodeacademy.com')
    .type('#inputemailpassword', 'testies')
    .click('.btn-info')
    .wait('#reqtest')
    .click('#reqtest')
    .wait('#christian')
    .click('#christian')
    .wait('#formtest')
    .select('#formtest', '#optionselect')
  ).timeout(6500);
});
