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
});
