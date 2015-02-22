
var fs = require('fs');
var path = require('path');

var Benchmark = require('benchmark');

var extract = require('../');
var extractClasses = extract.extractClasses;
var extractIds = extract.extractIds;

var suite = new Benchmark.Suite();
var samplesDir = path.join(__dirname, 'samples');
var samples = fs.readdirSync(samplesDir).map(function(sampleFile) {
  return fs.readFileSync(path.join(samplesDir, sampleFile)).toString();
});

samples.forEach(function(sample, index) {
  suite.add('extract ids and classes from sample #' + index, function() {
    extract(['ids', 'classes'], sample);
  });
  suite.add('extractClasses from sample #' + index, function() {
    extractClasses(sample);
  });
  suite.add('extractIds from sample #' + index, function() {
    extractIds(sample);
  });
});

suite.on('cycle', function(event) {
  var stats = event.target.stats;
  var showStats = ['mean', 'deviation'];
  var statsSummary = showStats.map(function(statName) {
    return statName + '=' + stats[statName].toFixed(4);
  });
  console.log(event.target.name + ' (' + statsSummary.join(', ') + ')');
});

suite.run();
