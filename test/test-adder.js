var chai   = require('chai'),
    expect = chai.expect,
    adder  = require('../lib/adder.js');


describe('The adder function', function() {
  it('will return the combined value from valid integer inputs', function(){
    expect(adder(10,5)).to.be.a('number');
    expect(adder(10,5)).to.be.equal(15);
    expect(adder(10,5)).to.be.deep.equal(15);
    expect(adder(10,5)).to.not.be.deep.equal(1500);
    expect(adder(1000,500)).to.be.deep.equal(1500);
  });

  it('will return error.NaN for noninteger inputs', function(){
    expect(adder('jason', 5)).to.be.deep.equal('error.NaN');
  });

  it('will return the combined values from integers expressed as strings', function(){
    expect(adder('10', '20')).to.be.equal(30);
    expect(adder('10', 20)).to.be.equal(30);
    expect(adder('10', 20)).to.be.deep.equal(30);
    expect(adder('ten', 20)).to.be.not.deep.equal(30);
    expect(adder('ten', '20')).to.be.not.deep.equal(30);
    expect(adder('ten', '20')).to.be.deep.equal('error.NaN');
  });

  it('will return error.tooFewParameters if the function passes 1 or fewer parameters',
  function(){
    expect(adder(10)).to.be.equal('error.tooFewParameters');
    expect(adder()).to.not.be.equal('error.tooFewParameters');
  });

  it('will return error.noParametersGiven if the function passes no parameters',
  function(){
    expect(adder(10)).to.not.be.equal('error.noParametersGiven');
    expect(adder()).to.be.equal('error.noParametersGiven');
  });
});
