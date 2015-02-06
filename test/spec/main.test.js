/* jshint mocha: true, expr: true, strict: false */

describe('test suite', function () {
  it('should assert true', function () {
    true.should.be.true;
    false.should.be.false;
  });
});

describe('hello', function() {
  it('should return world', function() {
    hello().should.equal('world');
  });
});

describe('total stocks', function() {
  it('should return a sum of the LastPrices', function() {
    var stocks1 = [
                   { Symbol: 'AAPL', LastPrice: 12.33 },
                   { Symbol: 'AMZN', LastPrice: 22.35 }
                 ],
        stocks2 = [
                   { Symbol: 'MSFT', LastPrice: 0.10 },
                   { Symbol: 'SBUX', LastPrice: 0.20 }
                 ];
    totalStocks(stocks1).should.be.closeTo(34.68, 0.01);
    totalStocks(stocks2).should.be.closeTo(0.30, 0.01);
  });
});

describe('DOM', function () {
  describe('table', function () {
    beforeEach(function() {
      $('tbody').empty();
    });

    describe('addStockToTable', function () {
      it('should add a row to the table', function () {
        var stock = { Name: 'SuperCorp', Symbol: 'SPCP', LastPrice: 2.33};
        $('tr').length.should.equal(0);
        addStockToTable(stock);
        $('tr').length.should.equal(1);
      });
      it('should ignore invalid stock tickers', function() {
        var stock = { Message: 'No symbol matches found for XXXX.' };
        $('tr').length.should.equal(0);
        addStockToTable(stock);
        $('tr').length.should.equal(0);
      });
      it('should use stock data in the appended row', function () {
        var stock = { Name: 'SuperCorp', Symbol: 'SPCP', LastPrice: 2.33},
            $row  = addStockToTable(stock),
            $tds  = $row.find('td');

        $tds.length.should.equal(4);
        $($tds[0]).text().should.equal('SuperCorp');
        $($tds[1]).text().should.equal('SPCP');
        $($tds[2]).text().should.equal('2.33');
        $($tds[3]).text().should.equal('2.33');
      });
    });

    describe('refreshStockPrices', function () {
      it('should edit each stock in the table with the new price', function() {
        var stocks = [
                       { Symbol: 'AAPL', LastPrice: 12.33 },
                       { Symbol: 'AMZN', LastPrice: 22.35 }
                     ],
           $tbody  = $('tbody'),
           $trs;

        $('tbody').append('<tr><td></td>Apple Inc<td>AAPL</td><td>2.33</td><td>2.33</td></tr>');
        $('tbody').append('<tr><td>Amazon.com Inc</td>AMZN<td></td><td>3.45</td><td>2.33</td></tr>');
        $trs = $('tr');

        refreshStockPrices(stocks);

        $($($('tr')[0]).find('td')[3]).text().should.equal('12.33');
        $($($('tr')[1]).find('td')[3]).text().should.equal('22.35');
      });
    });
  });
});

describe('ASYNC', function () {
  describe('getMultipleStocks', function() {
    it('should return mulitple stock objects', function (done) {
      getMultipleStocks(['AAPL', 'AMZN'], function (stocks) {
        stocks.length.should.equal(2);
        stocks[0].Name.should.equal('Apple Inc');
        stocks[1].Name.should.equal('Amazon.com Inc');
        done();
      });
    });
  });

  describe('getStock', function() {
    it('should return a stock object', function(done) {
      getStock('AAPL', function(stock) {
        stock.Name.should.equal('Apple Inc');
        done();
      });
    });
    it('should return another stock object', function(done) {
      getStock('AMZN', function(stock) {
        stock.Name.should.equal('Amazon.com Inc');
        done();
      });
    });
    it('should return a message if no stock is found', function(done) {
    getStock('XXXX', function (stock) {
      stock.Message.should.exist();
      done();
      });
    });
  });
});

