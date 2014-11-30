
var cssHelpers = require('./css-helpers');

/**
 * number sign followed by an identifier
 * @type {RegExp}
 */
var rIdInSelector = new RegExp('#(' + cssHelpers.rIdentifier.source + ')', 'gm');

function addIdsFromSelectorToSet(selector, idSet) {
  var match, id;
  while (!!(match = rIdInSelector.exec(selector))) {
    id = cssHelpers.unescapeIdentifier(match[1]);
    idSet[id] = true;
  }
}

function addIdsFromSelectorsToSet(selectors, idSet) {
  var selector;
  var i = 0;
  while (!!(selector = selectors[i++])) {
    addIdsFromSelectorToSet(selector, idSet);
  }
}

/**
 * Extracts ids from CSS rules (as AST)
 * @param  {Object} rules
 * @return {Array.<string>} list of ids in those rules
 */
function extractIdsFromRules(rules) {
  var rule;
  var idSet = {};
  var i = 0;
  while (!!(rule = rules[i++])) {
    if (rule.type === 'rule') {
      addIdsFromSelectorsToSet(rule.selectors, idSet);
    } else if (rule.rules) {
      // Add nested rules to the list
      // Will be checked after the current ones
      rules.push.apply(rules, rule.rules);
    }
  }
  return Object.keys(idSet);
}

module.exports = extractIdsFromRules;