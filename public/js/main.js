function hello() {
  return 'world';
}

function addStockToTable(stock) {
  var $row = $('<tr></tr>');

  $('tbody').append($row);
}

function getStock(symbol, cb) {
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol;
  $.get(url, function(res) {
    return cb(res);
  }, 'jsonp');
}
