module.exports = function(x,y) {
  //check for missing arguments
  /*
  if ((y === undefined) || (x === undefined)) {
      return 'error.tooFewParameters';
      }
  */

  if (x === undefined) {
      return 'error.noParametersGiven';
      }

  if (y === undefined) {
    return 'error.tooFewParameters';
      }

  var adderArg = [x, y];

  if (adderArg.length < 2) {
    console.log('yep, adderArg.length = ' + adderArg.length);
    console.log('yep, adderArg.length is less than 2');
    return 'error.tooFewParameters';
  }

  for (var i = 0; i < adderArg.length; i ++){

    if (typeof(adderArg[i]) == 'string') {
      adderArg[i] = parseInt(adderArg[i], 10);
      if (isNaN(adderArg[i])){
        return 'error.NaN';
      }
    }
  }
  return adderArg[0] + adderArg[1];
};
