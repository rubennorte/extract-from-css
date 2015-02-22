
/**
 * Calls processFn for each selector found
 * at the given rules
 * @param  {Object[]} rules
 * @param  {Function} processFn
 */
function processSelectors(rules, processFn) {
  var rule, selector, selectors, selectorIndex;
  var ruleIndex = 0;

  while (!!(rule = rules[ruleIndex++])) {
    if (rule.type === 'rule') {
      selectors = rule.selectors;
      selectorIndex = 0;
      while (!!(selector = selectors[selectorIndex++])) {
        processFn(selector);
      }
    } else if (rule.rules) {
      // Add nested rules to the list
      // Will be checked after the current ones
      rules.push.apply(rules, rule.rules);
    }
  }
}

module.exports = processSelectors;
