
var css = require('css');
var processSelectors = require('../../lib/process-selectors');

function getRulesFromCode(code) {
  return css.parse(code).stylesheet.rules;
}

describe('processSelectors', function() {

  var processSelector;

  beforeEach(function() {
    processSelector = jasmine.createSpy('processSelector');
  });

  it('should process a single selector', function() {
    var cssCode = '.className {}';
    var rules = getRulesFromCode(cssCode);
    processSelectors(rules, processSelector);
    expect(processSelector.calls.allArgs()).toEqual([['.className']]);
  });

  it('should process multiple selectors', function() {
    var cssCode = '.className {} .className2 {}';
    var rules = getRulesFromCode(cssCode);
    processSelectors(rules, processSelector);
    expect(processSelector.calls.allArgs()).toEqual([['.className'], ['.className2']]);
  });

  it('should ignore selectors inside comments', function() {
    var cssCode = '.className {} /* .className2 {} */';
    var rules = getRulesFromCode(cssCode);
    processSelectors(rules, processSelector);
    expect(processSelector.calls.allArgs()).toEqual([['.className']]);
  });

  it('should ignore string contents', function() {
    var cssCode = '.className { background-image: url(".className2 { prop: value; }"); }';
    var rules = getRulesFromCode(cssCode);
    processSelectors(rules, processSelector);
    expect(processSelector.calls.allArgs()).toEqual([['.className']]);
  });

  it('should process nested selectors', function() {
    var cssCode = '@media (max-width: 500px) { @media screen { .className { prop: value; } } }';
    var rules = getRulesFromCode(cssCode);
    processSelectors(rules, processSelector);
    expect(processSelector.calls.allArgs()).toEqual([['.className']]);
  });

});
