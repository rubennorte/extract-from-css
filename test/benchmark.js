
var fs = require('fs');
var path = require('path');

var Benchmark = require('benchmark');

var extractClasses = require('../').extractClasses;

var suite = new Benchmark.Suite();
var samplesDir = path.join(__dirname, 'samples');
var samples = fs.readdirSync(samplesDir).map(function(sampleFile) {
  return fs.readFileSync(path.join(samplesDir, sampleFile)).toString();
});

samples.forEach(function(sample, index) {
  suite.add('extractClasses from sample ' + index, function() {
    extractClasses(sample);
  });
});

suite.on('cycle', function(event) {
  console.log(String(event.target));
});

suite.run();