
/**
 * number sign followed by multiple ocurrences of:
 *   - alphabetical letter, underscore or dash, or
 *   - non-ascii character, or
 *   - escaped character
 * @type {RegExp}
 */
var rIdInSelector = /#((?:[A-Za-z0-9_-]|[^\0-\237]|\\(?:[^A-Fa-f0-9]|[A-Fa-f0-9]{1,6} ?))+)/gm;

/**
 * backslash followed by a non-hexadecimal letter or
 * a 1 to 6 digit hexadecimal number followed by an optional white space
 * @type {RegExp}
 */
var rEscapedCharacter = /\\([^A-Fa-f0-9]|[A-Fa-f0-9]{1,6} ?)/g;

function unescapeSequence(escapeSequence) {
  var escaped = escapeSequence.substr(1);
  var numberValue = parseInt(escaped, 16);
  if (isNaN(numberValue)) {
    return escaped;
  }

  return String.fromCharCode(numberValue);
}

function unescapeId(id) {
  return id.replace(rEscapedCharacter, unescapeSequence);
}

function addIdsFromSelectorToSet(selector, idSet) {
  var match, id;
  while (match = rIdInSelector.exec(selector)) {
    id = unescapeId(match[1]);
    idSet[id] = true;
  }
}

function addIdsFromSelectorsToSet(selectors, idSet) {
  var selector;
  var i = 0;
  while (selector = selectors[i++]) {
    addIdsFromSelectorToSet(selector, idSet);
  }
}

function extractIdsFromRules(rules) {
  var rule;
  var idSet = {};
  var i = 0;
  while (rule = rules[i++]) {
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