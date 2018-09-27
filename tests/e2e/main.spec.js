'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/server');
const Nightmare = require('nightmare');

let nightmare;

chai.use(chaiHttp);
const expect = chai.expect;

const url = 'http://localhost:8080' || process.env.PORT;

describe('sending a success response', ()=>{
    before(() => {
        server.listen(8080);
    })

  beforeEach(()=>{
    nightmare = new Nightmare();
  });

  it('making sure button is clicked', () =>
  nightmare
    .goto(url)
    .type('#inputemail', `taylr`)
    .click('.btn-info')
   
    )
  })
