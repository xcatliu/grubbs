var handleTable = require('./handleTable');
var stdev = require('compute-stdev');
var average = require('average');
var g = require('./g');

var form = document.getElementById('form');

form.addEventListener('submit', function (e) {
  var origin;
  var originStdev;
  var originAverage;
  var origin_;
  var excluded = [];
  var excludedIndexes = [];
  var i;
  var result;
  var currentG;
  var canBreak;
  e.preventDefault();
  origin = handleTable(document.getElementById('origin').value);
  if (origin.length === 0) return;
  origin_ = origin.filter(function (num) { return !isNaN(num); });
  while (true) {
    canBreak = true;
    originStdev = stdev(origin_);
    originAverage = Math.round(average(origin_) * 100) / 100;
    currentG = g[origin_.length];
    // console.log(origin_);
    console.log(originStdev);
    console.log(originAverage);
    for (i = 0; i < origin_.length; i++) {
      result = Math.abs((origin_[i] - originAverage) / originStdev);
      if (result > currentG) {
        canBreak = false;
        excluded.push(origin_[i]);
        origin_.splice(i, 1);
        i--;
      }
    }
    if (canBreak) break;
  }
  console.log(originAverage);
  console.log(excluded);
  document.getElementById('average').innerHTML = originAverage;
  document.getElementById('excluded').innerHTML = excluded.join(', ');

  excluded.forEach(function (item) {
    origin.forEach(function (originItem, index) {
      if (originItem === item) {
        excludedIndexes.push(index + 1);
      }
    });
  });
  console.log(excludedIndexes);
  document.getElementById('excludedIndexes').innerHTML = excludedIndexes.join(', ');

  // g = handleTable(document.getElementById('g').value);
  // if (g.length === 0) return;
  // if (g[0].length !== 2) return;
});
