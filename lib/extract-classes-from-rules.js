
var cssHelpers = require('./css-helpers');

/**
 * dot followed by multiple ocurrences of:
 *   - alphabetical letter, underscore or dash, or
 *   - non-ascii character, or
 *   - escaped character
 * @type {RegExp}
 */
var rClassInSelector = new RegExp('\\.(' + cssHelpers.rIdentifier.source + ')', 'gm');

function addClassNamesFromSelectorToSet(selector, classSet) {
  var match, className;
  while (match = rClassInSelector.exec(selector)) {
    className = cssHelpers.unescapeIdentifier(match[1]);
    classSet[className] = true;
  }
}

function addClassNamesFromSelectorsToSet(selectors, classSet) {
  var selector;
  var i = 0;
  while (selector = selectors[i++]) {
    addClassNamesFromSelectorToSet(selector, classSet);
  }
}

function extractClassNamesFromRules(rules) {
  var rule;
  var classSet = {};
  var i = 0;
  while (rule = rules[i++]) {
    if (rule.type === 'rule') {
      addClassNamesFromSelectorsToSet(rule.selectors, classSet);
    } else if (rule.rules) {
      // Add nested rules to the list
      // Will be checked after the current ones
      rules.push.apply(rules, rule.rules);
    }
  }
  return Object.keys(classSet);
}

module.exports = extractClassNamesFromRules;