
var cssHelpers = require('./css-helpers');
var processSelectors = require('./process-selectors');

/**
 * number sign followed by an identifier
 * @type {RegExp}
 */
var rIdInSelector = new RegExp('#(' + cssHelpers.rIdentifier.source + ')', 'gm');

/**
 * Extracts ids from CSS rules (as AST)
 * @param  {Object} rules
 * @return {string[]} list of ids in those rules
 */
function extractIdsFromRules(rules) {
  var idSet = {};
  processSelectors(rules, function(selector) {
    var match, id;
    while (!!(match = rIdInSelector.exec(selector))) {
      id = cssHelpers.unescapeIdentifier(match[1]);
      idSet[id] = true;
    }
  });
  return Object.keys(idSet);
}

module.exports = extractIdsFromRules;