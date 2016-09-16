var assert = require('assert');

function validator() {
  return ['error.nonpositive'];
}

describe ('A validator', function() {
  it('will return error.nonpositive for not strictly positive numbers', function (){
    assert.deepEqual(validator(0), ['error.nonpositive']);
  });
});
