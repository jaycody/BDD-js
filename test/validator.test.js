var chai      = require('chai'),
    expect    = chai.expect,
    validator = require('../lib/validator');

describe ('A validator', function() {
  it('will return error.nonpositive if input is other than a positive number', function (){
    expect(validator(10)).to.be.deep.equal(['error.nonpositive']);
  });
});
