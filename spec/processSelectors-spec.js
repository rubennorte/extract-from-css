
var processSelectors = require('../lib/process-selectors');
var getRulesFromCode = require('./helpers/get-rules-from-code');

describe('processSelectors', function() {

  it('should process a single selector', function() {
    var processSelector = jasmine.createSpy('processSelector');
    var rules = getRulesFromCode('.className {}');
    processSelectors(rules, processSelector);
    expect(processSelector).toHaveBeenCalledWith('.className');
  });

  it('should process multiple selectors', function() {
    var processSelector = jasmine.createSpy('processSelector');
    var rules = getRulesFromCode('.className {} .className2 {}');
    processSelectors(rules, processSelector);
    expect(processSelector).toHaveBeenCalledWith('.className');
    expect(processSelector).toHaveBeenCalledWith('.className2');
    expect(processSelector.calls.count()).toEqual(2);
  });

  it('should ignore selectors inside comments', function() {
    var processSelector = jasmine.createSpy('processSelector');
    var rules = getRulesFromCode('.className {} /* .className2 {} */');
    processSelectors(rules, processSelector);
    expect(processSelector).toHaveBeenCalledWith('.className');
  });

  it('should ignore string contents', function() {
    var processSelector = jasmine.createSpy('processSelector');
    var rules = getRulesFromCode('.className { background-image: url(".className2 { prop: value; }"); }');
    processSelectors(rules, processSelector);
    expect(processSelector).toHaveBeenCalledWith('.className');
  });

  it('should process nested selectors', function() {
    var processSelector = jasmine.createSpy('processSelector');
    var rules = getRulesFromCode('@media (max-width: 500px) { @media screen { .className { prop: value; } } }');
    processSelectors(rules, processSelector);
    expect(processSelector).toHaveBeenCalledWith('.className');
  });

});