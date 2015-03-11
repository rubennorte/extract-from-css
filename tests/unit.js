
var path = require('path');

var SpecReporter = require('jasmine-spec-reporter');
var Jasmine = require('jasmine');

var jasmine = new Jasmine();
jasmine.loadConfigFile(path.join(__dirname, 'jasmine.json'));
jasmine.addReporter(new SpecReporter({displayStacktrace: true}));
jasmine.execute();
