var moreorless = require('../index');
var fs = require('fs');
var should = require('chai').should();

describe('moreorless', function() {
  describe('#compile', function() {
    before(function(done) {
      moreorless.compile('test/src', 'test/out.css', done);
    });

    after(function(done) {
      fs.unlink('test/out.css', done);
    });

    it('should compile css', function(done) {
      fs.readFile('test/out.css', 'utf-8', function(err, output) {
        fs.readFile('test/reference.css', 'utf-8', function(err, reference) {
          output.should.equal(reference);
          done();
        });
      });
    });
  });
});