require('supertest');
require('../config/config');
// Wrapper that creates admin user to allow api calls
let Employee = require('../models/Employee');
let Email = require('../notification/email');
let TextModel = require('../notification/text');

// SAMPLE : [{phone_number: "XXX-XXX-XXXX", email: "XXXXX@XXXXX.com"}];
let employees = [];

describe("Notification", function() {
    it('It should send an email', function(done){
      this.timeout(9000);
      Email.sendEmail("Tony Montana", employees, done);
      //done();
    });

    it('It should send an text', function(done){
      this.timeout(9000);
      TextModel.sendText("Tony Montana", employees, done);
      //done();
    });
  }
);
