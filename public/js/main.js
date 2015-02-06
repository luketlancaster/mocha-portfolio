/* jshint jquery: true */
/* globals async: false */

function hello() {
  return 'world';
}

function addStockToTable(stock) {
  var $row = $('<tr></tr>');
  if(stock.Message) {
    return;
  }
  $row.append('<td>' + stock.Name + '</td>');
  $row.append('<td>' + stock.Symbol + '</td>');
  $row.append('<td>' + stock.LastPrice + '</td>');
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

function getMultipleStocks(symbols, cb) {
  async.map(symbols,
    function(symbol, innercb) {
      getStock(symbol, function(stock) {
        innercb(null, stock);
      });
    },
    function(err, stocks) {
      cb(stocks);
  }
 );
}

function refreshStockPrices(stocks) {
  var $trs = $('tr');

  _.forEach(stocks, function (stock, i) {
    $($($trs[i]).find('td')[3]).text(stock.LastPrice);
  });
}

function totalStocks(stocks) {
  return _.reduce(stocks, function(prev, curr) {
    return prev + curr.LastPrice;
  }, 0);
  //My solution below. Works, but less elegant
  //var price = 0;
  //_.forEach(stocks, function (stock) {
    //price += stock.LastPrice;
  //});
  //return Math.round(price * 100) / 100;
};
