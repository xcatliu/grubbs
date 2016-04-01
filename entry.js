/* eslint vars-on-top:0, no-use-before-define:0, func-names:0 */
var Handlebars = require('handlebars/dist/handlebars');
var grubbs = require('../lib/index');
var realWorldTestCases = require('../test/fixtures/realWorldTestCases');

var form = document.getElementById('form');
var resultTable = document.getElementById('resultTable');
var grubbsExampleButton = document.getElementById('grubbsExampleButton');
var dataSetTextarea = document.getElementById('dataSet');

var resultTableTemplate =
  Handlebars.compile(document.getElementById('resultTableTemplate').innerHTML);

Handlebars.registerHelper('inc', function(value, options) {
  return parseInt(value, 10) + 1;
});

grubbsExampleButton.addEventListener('click', function (e) {
  e.preventDefault();
  dataSetTextarea.value = realWorldTestCases[0].input.join('\n');
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var dataSet = handleInput(dataSetTextarea.value);
  var result = grubbs.test(dataSet);
  var resultTableData = {
    emptyTdList: [],
    tableData: [],
    averageList: [],
    stdevList: [],
    criticalValueList: []
  };
  result.forEach(function (currentRound) {
    currentRound.dataSet.forEach(function (data, dataIndex) {
      if (typeof resultTableData.tableData[dataIndex] === 'undefined') {
        resultTableData.tableData[dataIndex] = { tds: [] };
      }
      if (currentRound.gPass[dataIndex] === false) {
        resultTableData.tableData[dataIndex].className = 'bg-danger';
      }
      resultTableData.tableData[dataIndex].tds.push({
        innerHTML: data,
        title: currentRound.gSet[dataIndex]
      });
    });
    resultTableData.emptyTdList.push('');
    resultTableData.averageList.push(currentRound.average);
    resultTableData.stdevList.push({
      innerHTML: round(currentRound.stdev),
      title: currentRound.stdev
    });
    resultTableData.criticalValueList.push(currentRound.criticalValue);
  });
  resultTable.innerHTML = resultTableTemplate(resultTableData);
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

function round(num) {
  if (typeof num === 'undefined') return '';
  if (num === null) return '';
  if (isNaN(num)) return '';
  return Math.round(num * 10000) / 10000;
}
