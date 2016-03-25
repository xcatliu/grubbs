var handleTable = require('./handleTable');
var stdev = require('compute-stdev');
var average = require('average');

var form = document.getElementById('form');

var g = {
  50: 2.96,
  49: 2.952,
  48: 2.944,
  47: 2.936,
  46: 2.928,
  45: 2.92,
  44: 2.91,
  43: 2.9
};

form.addEventListener('submit', function (e) {
  var origin;
  var originStdev;
  var originAverage;
  var origin_;
  var exclude = [];
  var i;
  var result;
  var currentG;
  var canBreak;
  e.preventDefault();
  origin = handleTable(document.getElementById('origin').value);
  if (origin.length === 0) return;
  origin_ = origin.slice();
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
        exclude.push(origin_[i]);
        origin_.splice(i, 1);
        i--;
      }
    }
    if (canBreak) break;
  }
  console.log(originAverage);
  console.log(exclude);
  document.getElementById('average').innerHTML = originAverage;
  document.getElementById('excluded').innerHTML = exclude.join(', ');

  // g = handleTable(document.getElementById('g').value);
  // if (g.length === 0) return;
  // if (g[0].length !== 2) return;
});
