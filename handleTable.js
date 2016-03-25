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
