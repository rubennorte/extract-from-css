
var css = require('css');

var processSelectors = require('../../lib/process-selectors');

function getRulesFromCode(code) {
  return css.parse(code).stylesheet.rules;
}

/**
 * Checks that the callback function for "processSelectors"
 * have been called with the specified arguments
 * @param  {string} code
 * @param  {string[][]} callArgs list of arguments for each call
 */
function assertProcessArguments(code, callArgs) {
  var processSelector = jasmine.createSpy('processSelector');
  var rules = getRulesFromCode(code);
  processSelectors(rules, processSelector);
  expect(processSelector.calls.allArgs()).toEqual(callArgs);
}

module.exports = assertProcessArguments;