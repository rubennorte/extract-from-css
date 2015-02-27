
var css = require('css');

function getRulesFromCode(code) {
  return css.parse(code).stylesheet.rules;
}

module.exports = getRulesFromCode;
