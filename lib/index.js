
var cssParser = require('css');

/**
 * dot followed by multiple ocurrences of:
 *   - alphabetical letter, underscore or dash, or
 *   - non-ascii character, or
 *   - escaped character
 * @type {RegExp}
 */
var rClassNameInSelector = /\.((?:[A-Za-z0-9_-]|[^\0-\237]|\\(?:[^A-Fa-f0-9]|[A-Fa-f0-9]{1,6} ?))+)/gm;

/**
 * backslash followed by a non-hexadecimal letter or
 * a 1 to 6 digit hexadecimal number followed by an optional white space
 * @type {RegExp}
 */
var rEscapedCharacter = /\\([^A-Fa-f0-9]|[A-Fa-f0-9]{1,6} ?)/g;

/**
 * backslash followed by a hexadecimal number
 * @type {RegExp}
 */
var rEscapedHex = /\\([A-Fa-f0-9]+)/;

function unescapeClassName(className) {
  return className.replace(rEscapedCharacter, function(escaped) {
    var match;
    if (match = rEscapedHex.exec(escaped)) {
      return String.fromCharCode(parseInt(match[1], 16));
    }
    return escaped.substr(1);
  });
}

function addClassesFromSelectorToSet(selector, classNames) {
  var match, className;
  while (match = rClassNameInSelector.exec(selector)) {
    className = unescapeClassName(match[1]);
    classNames[className] = true;
  }
}

function addClassesFromSelectorsToSet(selectors, classNames) {
  var selector;
  var i = 0;
  while (selector = selectors[i++]) {
    addClassesFromSelectorToSet(selector, classNames);
  }
}

function extractClassesFromRules(rules) {
  var rule;
  var classNames = {};
  var i = 0;
  while (rule = rules[i++]) {
    if (rule.type === 'rule') {
      addClassesFromSelectorsToSet(rule.selectors, classNames);
    } else if (rule.rules) {
      // Add nested rules to the list
      // Will be checked after the current ones
      rules.push.apply(rules, rule.rules);
    }
  }
  return Object.keys(classNames);
}

/**
 * Extract the class names from the selectors found
 * in the specified code. Class order is not guaranteed.
 * @param  {string} code the CSS code to parse
 * @return {Array.<string>} the list of class names
 */
function extractClasses(code) {
  var ast = cssParser.parse(code);
  return extractClassesFromRules(ast.stylesheet.rules);
}

module.exports = {
  extractClasses: extractClasses
};