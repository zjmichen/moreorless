var shell = require('shelljs');
var less = require('less');
var fs = require('fs');
var watch = require('watch');

function watch(sources, outfile, onCompile) {
  console.info('Watching ' + sources);
  watch.watchTree(sources, function() {
    compile(sources, outfile, onCompile);
  });
}

function compile(sources, outfile, next) {
  var begin = new Date().getTime();
  var allStyles = shell.cat(sources + '/*.less');
  less.render(allStyles, function(err, output) {
    if (err && next) next(err);
    else {
      fs.writeFile(outfile, output.css, function(err) {
        if (err && next) next(err);
        else {
          var elapsed = new Date().getTime() - begin;
          if (next) next(null, elapsed);
        }
      });
    }
  });
}

module.exports = {
  compile: compile,
  watch: watch
};