
var cssParser = require('css');

var rClassNameInSelector = /\.((?:[\w-]|\\(?:[^A-Fa-f0-9]|[A-Fa-f0-9]{1,6} ?))+)/gm;
var rEscapedCharacter = /\\([^A-Fa-f0-9]|[A-Fa-f0-9]{1,6} ?)/g;
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

function extractClasses(code) {
  var ast = cssParser.parse(code);
  return extractClassesFromRules(ast.stylesheet.rules);
}

module.exports = {
  extractClasses: extractClasses
};