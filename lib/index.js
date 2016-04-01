/* eslint vars-on-top:0, no-use-before-define:0 */

var stdev = require('compute-stdev');
var average = require('average');
var criticalValueTable = require('./criticalValueTable');

function test(originDataSet, originOptions) {
  if (typeof originDataSet === 'undefined') {
    throw new Error('dataSet MUST be passed');
  }
  if (originDataSet.filter(isValidData).length > 100) {
    throw new Error('dataSet.length MUST less than 100');
  }
  if (originDataSet.filter(isValidData).length <= 2) {
    throw new Error('dataSet.length MUST greater than 2');
  }
  // defaultOptions
  var options = {
    alpha: 0.05,
    recursion: true
  };
  // Merge options
  if (typeof originOptions !== 'undefined') {
    if (typeof originOptions.alpha !== 'undefined') {
      options.alpha = originOptions.alpha;
    }
    // TODO no recursion mode is not support yet
    // if (typeof options_.recursion !== 'undefined') {
    //   options.recursion = options_.recursion;
    // }
  }
  var criticalValue = criticalValueTable[options.alpha];
  if (typeof criticalValue === 'undefined') {
    throw new Error('alpha ' + options.alpha + ' is not support');
  }

  // Main algorithm
  var result = [];
  var done = false;
  var dataSet = originDataSet.slice();
  var currentRound = {};
  var i;
  var gResult;
  // If no outlier, done
  while (!done) {
    done = true;
    currentRound = {};
    currentRound.dataSet = dataSet.slice();
    currentRound.stdev = stdev(currentRound.dataSet.filter(isValidData));
    currentRound.average =
      Math.round(average(currentRound.dataSet.filter(isValidData)) * 100) / 100;
    currentRound.criticalValue = criticalValue[currentRound.dataSet.filter(isValidData).length];
    currentRound.gSet = [];
    // true if pass, false if unpass, undefined if no data
    currentRound.gPass = [];
    currentRound.outliers = [];
    currentRound.outlierIndexes = [];
    for (i = 0; i < currentRound.dataSet.length; i++) {
      if (typeof currentRound.dataSet[i] === 'undefined') {
        currentRound.gSet.push(undefined);
        currentRound.gPass.push(undefined);
        continue;
      }
      if (typeof currentRound.dataSet[i] !== 'number') {
        throw new Error('data MUST be number');
      }
      gResult = (currentRound.dataSet[i] - currentRound.average) / currentRound.stdev;
      currentRound.gSet.push(gResult);
      if (Math.abs(gResult) > currentRound.criticalValue) {
        done = false;
        currentRound.gPass.push(false);
        currentRound.outliers.push(currentRound.dataSet[i]);
        currentRound.outlierIndexes.push(i);
        dataSet[i] = undefined;
      } else {
        currentRound.gPass.push(true);
      }
    }
    result.push(currentRound);
  }
  return result;
}

function isValidData(data) {
  return (
    typeof data !== 'undefined' &&
    !isNaN(data) &&
    data !== null
  );
}

module.exports = {
  test: test,
  isValidData: isValidData
};
