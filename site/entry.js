/* eslint vars-on-top:0, no-use-before-define:0, func-names:0 */
var grubbs = require('../lib/index');

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
