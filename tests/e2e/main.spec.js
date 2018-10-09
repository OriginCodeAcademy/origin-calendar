'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/server');
const Nightmare = require('nightmare');

let nightmare;

chai.use(chaiHttp);
const expect = chai.expect;

const path = 'http://localhost:7000';

describe('sending a success response', ()=>{
  before(() => {
    server.listen(7000);
  });

  beforeEach(()=>{
    nightmare = new Nightmare();
  });

  it('should render login field', () =>
    nightmare
      .goto(path)
      .wait('#inputEmail')
      .evaluate(() => document.querySelector('button').extst)
      .end()
    ).timeout(6500);

  it('should expect input textarea and submit buttons to exist', () =>
  nightmare
    .goto(path)
    .wait('#inputEmail')
    .type('#inputemail', 'student@origincodeacademy.com')
    .type('#inputemailpassword', 'abc123')
    .click('.btn-info')
    .wait('#reqtest')
    .click('#reqtest')
    .wait('#christian')
    .click('#christian')
    .wait('input')
    .exists('input')
    .wait('option')
    .exists('option')
    ).timeout(6500);

    it('should check to see if select is populated with values greater than current time', () =>
    nightmare
      .goto(path)
      .wait('#inputEmail')
      .type('#inputemail', 'student@origincodeacademy.com')
      .type('#inputemailpassword', 'abc123')
      .click('.btn-info')
      .wait('#reqtest')
      .click('#reqtest')
      .wait('#christian')
      .click('#christian')
      .wait('#formtest')
      .select('#formtest', '#optionselect')
  ).timeout(6500);
});
