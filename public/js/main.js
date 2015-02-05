function hello() {
  return 'world';
}

function getStock(symbol, cb) {
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol;
  $.get(url, function(res) {
    return cb(res);
  }, 'jsonp');
}
