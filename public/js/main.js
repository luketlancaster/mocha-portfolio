function hello() {
  return 'world';
}

function addStockToTable(stock) {
  var $row = $('<tr></tr>');

  $row.append('<td>' + stock.Name + '</td>');
  $row.append('<td>' + stock.Symbol + '</td>');
  $row.append('<td>' + stock.LastPrice + '</td>');

  $('tbody').append($row);

  return $row;
}

function getStock(symbol, cb) {
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol;
  $.get(url, function(res) {
    return cb(res);
  }, 'jsonp');
}
