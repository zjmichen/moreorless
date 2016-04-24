var moreorless = require('../index');
var fs = require('fs');
var exec = require('child_process').exec;
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

  describe('CLI', function() {
    before(function(done) {
      exec('node bin/moreorless.js test/src -o test/out.css', done);
    });

    after(function(done) {
      fs.unlink('test/out.css', done);
    });

    it('should compile from the command line', function(done) {
      fs.readFile('test/out.css', 'utf-8', function(err, output) {
        fs.readFile('test/reference.css', 'utf-8', function(err, reference) {
          output.should.equal(reference);
          done();
        });
      });
    });
  });
});