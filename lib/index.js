
var cssParser = require('css');
var extractClassesFromRules = require('./extract-classes-from-rules');
var extractIdsFromRules = require('./extract-ids-from-rules');

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

/**
 * Extract the ids from the selectors found
 * in the specified code. Id order is not guaranteed.
 * @param  {string} code the CSS code to parse
 * @return {Array.<string>} the list of ids
 */
function extractIds(code) {
  var ast = cssParser.parse(code);
  return extractIdsFromRules(ast.stylesheet.rules);
}

module.exports = {
  extractClasses: extractClasses,
  extractIds: extractIds
};