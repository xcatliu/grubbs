/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var handleTable = __webpack_require__(4);
	var stdev = __webpack_require__(7);
	var average = __webpack_require__(6);
	var g = __webpack_require__(8);

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


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	module.exports = function (input) {
	  var input_;
	  var result = [];
	  if (typeof input !== 'string') return result;
	  input_ = input.trim();
	  if (input_.length === 0) return result;
	  result = input_.split('\n');
	  result = result.map(function (row) {
	    var row_ = row.trim().split('\t').map(function (item) {
	      var item_ = item.trim();
	      if (item_.length === 0) return NaN;
	      return Number(item_);
	    });
	    if (row_.length === 1) {
	      return row_[0];
	    }
	    return row_;
	  });
	  return result;
	};


/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	module.exports = function average(values) {
	    'use strict';
	    
	    return values.reduce(sum, 0) / values.length;
	};

	function sum(a, b) {
	    return a + b;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	*
	*	COMPUTE: stdev
	*
	*
	*	DESCRIPTION:
	*		- Computes the sample standard deviation over an array of values.
	*
	*
	*	NOTES:
	*		[1] 
	*
	*
	*	TODO:
	*		[1] 
	*
	*
	*	LICENSE:
	*		MIT
	*
	*	Copyright (c) 2014. Athan Reines.
	*
	*
	*	AUTHOR:
	*		Athan Reines. kgryte@gmail.com. 2014.
	*
	*/

	(function() {
		'use strict';

		/**
		* FUNCTION: stdev( arr )
		*	Computes the sample standard deviation over an array of values.
		*
		* @param {Array} arr - array of values
		* @returns {Number} sample standard deviation
		*/
		function stdev( arr ) {
			if ( !Array.isArray( arr ) ) {
				throw new TypeError( 'stdev()::invalid input argument. Must provide an array.' );
			}
			var len = arr.length,
				N = 0,
				mean = 0,
				M2 = 0,
				delta = 0;

			if ( len < 2 ) {
				return 0;
			}
			for ( var i = 0; i < len; i++ ) {
				N += 1;
				delta = arr[ i ] - mean;
				mean += delta / N;
				M2 += delta * ( arr[i] - mean );
			}
			return Math.sqrt( M2 / ( N-1 ) );
		} // end FUNCTION stdev()


		// EXPORTS //

		module.exports = stdev;

	})();

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = {
	  3: 1.15,
	  4: 1.46,
	  5: 1.67,
	  6: 1.82,
	  7: 1.94,
	  8: 2.03,
	  9: 2.11,
	  10: 2.18,
	  11: 2.23,
	  12: 2.29,
	  13: 2.33,
	  14: 2.37,
	  15: 2.41,
	  16: 2.44,
	  17: 2.47,
	  18: 2.5,
	  19: 2.53,
	  20: 2.56,
	  21: 2.58,
	  22: 2.6,
	  23: 2.62,
	  24: 2.64,
	  25: 2.66,
	  26: 2.68,
	  27: 2.7,
	  28: 2.72,
	  29: 2.73,
	  30: 2.75,
	  31: 2.76,
	  32: 2.78,
	  33: 2.79,
	  34: 2.81,
	  35: 2.82,
	  36: 2.83,
	  37: 2.84,
	  38: 2.85,
	  39: 2.86,
	  40: 2.87,
	  41: 2.88,
	  42: 2.89,
	  43: 2.9,
	  44: 2.91,
	  45: 2.92,
	  46: 2.928,
	  47: 2.936,
	  48: 2.944,
	  49: 2.952,
	  50: 2.96,
	  51: 2.967,
	  52: 2.974,
	  53: 2.981,
	  54: 2.988,
	  55: 2.995,
	  56: 3.002,
	  57: 3.009,
	  58: 3.016,
	  59: 3.023,
	  60: 3.03,
	  61: 3.036,
	  62: 3.042,
	  63: 3.048,
	  64: 3.054,
	  65: 3.06,
	  66: 3.066,
	  67: 3.072,
	  68: 3.078,
	  69: 3.084,
	  70: 3.09,
	  71: 3.095,
	  72: 3.1,
	  73: 3.105,
	  74: 3.11,
	  75: 3.115,
	  76: 3.12,
	  77: 3.125,
	  78: 3.13,
	  79: 3.135,
	  80: 3.14,
	  81: 3.144,
	  82: 3.148,
	  83: 3.152,
	  84: 3.156,
	  85: 3.16,
	  86: 3.164,
	  87: 3.168,
	  88: 3.172,
	  89: 3.176,
	  90: 3.18,
	  91: 3.183,
	  92: 3.186,
	  93: 3.189,
	  94: 3.192,
	  95: 3.195,
	  96: 3.198,
	  97: 3.201,
	  98: 3.204,
	  99: 3.207,
	  100: 3.21
	};


/***/ }
/******/ ]);