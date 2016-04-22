#!/usr/bin/env node

var program = require('commander');
var moreorless = require('../index.js');
var sources;

program
  .option('-o, --output <file>', 'Specify output file')
  .option('-w, --watch', 'Watch files and build on changes')
  .arguments('<sourceDirectory>')
  .action(function(sourceDirectory) {
    sources = sourceDirectory;
  })
  .parse(process.argv);

if (program.watch) {
  moreorless.watch(sources, outfile, report);
} else {
  moreorless.compile(sources, program.output, report);
}

function report(err, elapsed) {
  if (err) console.error(err);
  else console.info('Built ' + outfile + ' in ' + elapsed + 'ms');  
}