
var cssHelpers = require('./css-helpers');
var processSelectors = require('./process-selectors');

/**
 * dot followed by an identifier
 * @type {RegExp}
 */
var rClassInSelector = new RegExp('\\.(' + cssHelpers.rIdentifier.source + ')',
  'gm');

/**
 * Extracts class names from CSS rules (as AST)
 * @param  {Object} rules
 * @return {string[]} list of class names in those rules
 */
function extractIdsFromRules(rules) {
  var idSet = {};
  processSelectors(rules, function(selector) {
    var match, id;
    while (!!(match = rClassInSelector.exec(selector))) {
      id = cssHelpers.unescapeIdentifier(match[1]);
      idSet[id] = true;
    }
  });
  return Object.keys(idSet);
}

module.exports = extractIdsFromRules;
