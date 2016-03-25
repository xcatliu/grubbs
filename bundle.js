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

/***/ }
/******/ ]);