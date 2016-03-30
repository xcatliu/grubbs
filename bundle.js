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

	/* eslint vars-on-top:0, no-use-before-define:0, func-names:0 */
	var grubbs = __webpack_require__(1);

	var form = document.getElementById('form');
	var resultTable = document.getElementById('resultTable');

	form.addEventListener('submit', function (e) {
	  e.preventDefault();
	  var dataSet = handleInput(document.getElementById('dataSet').value);
	  var result = grubbs.test(dataSet);
	  var tableData = [];
	  result.forEach(function (round) {
	    round.dataSet.forEach(function (data, dataIndex) {
	      if (typeof tableData[dataIndex] === 'undefined') {
	        tableData[dataIndex] = { children: [], th: dataIndex + 1 };
	      }
	      if (!round.gPass[dataIndex]) {
	        tableData[dataIndex].className = 'bg-danger';
	      }
	      tableData[dataIndex].children.push(
	        { text: data },
	        { text: round.gSet[dataIndex] }
	      );
	    });
	    if (typeof tableData[round.dataSet.length] === 'undefined') {
	      tableData[round.dataSet.length] = { children: [], th: '-' };
	      tableData[round.dataSet.length + 1] = { children: [], th: 'Average' };
	      tableData[round.dataSet.length + 2] = { children: [], th: 'Stdev' };
	      tableData[round.dataSet.length + 3] = { children: [], th: 'CriticalValue' };
	    }
	    tableData[round.dataSet.length].children.push({ text: '' }, { text: '' });
	    tableData[round.dataSet.length + 1].children.push({ text: round.average, colspan: 2 });
	    tableData[round.dataSet.length + 2].children.push({ text: round.stdev, colspan: 2 });
	    tableData[round.dataSet.length + 3].children.push({ text: round.criticalValue, colspan: 2 });
	  });
	  var tableHTML =
	    '<table class="table table-striped table-bordered table-hover table-condensed"><tbody>' +
	    tableData.map(function (row) {
	      return '<tr class=' + row.className + '><th>' + row.th + '</th>' +
	        row.children.map(function (item) {
	          return (
	            '<td' +
	            (typeof item.colspan === 'undefined' ? '' : ' colspan="' + item.colspan + '"') + '>' +
	            (typeof item.text === 'undefined' ? '' : item.text) +
	            '</td>');
	        }).join('') +
	      '</tr>';
	    }).join('') +
	    '</tbody></table>';
	  resultTable.innerHTML = tableHTML;
	});

	function handleInput(originInput) {
	  var input;
	  if (typeof originInput !== 'string') throw new Error('input MUST be a string');
	  input = originInput.trim();
	  if (input.length === 0) throw new Error('input MUST NOT empty');
	  return input.split('\n').map(function (originRow) {
	    var row = originRow.trim();
	    if (row === '') return undefined;
	    return Number(row);
	  });
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint vars-on-top:0, no-use-before-define:0 */

	var stdev = __webpack_require__(2);
	var average = __webpack_require__(3);
	var criticalValueTable = __webpack_require__(4);

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
	      gResult = Math.abs(currentRound.dataSet[i] - currentRound.average) / currentRound.stdev;
	      currentRound.gSet.push(gResult);
	      if (gResult > currentRound.criticalValue) {
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


/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports) {

	module.exports = function average(values) {
	    'use strict';
	    
	    return values.reduce(sum, 0) / values.length;
	};

	function sum(a, b) {
	    return a + b;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
	  0.05: {
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
	  }
	};


/***/ }
/******/ ]);