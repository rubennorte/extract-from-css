
var selectorUniqueMatches = require('../../lib/selector-unique-matches');
var equalsIgnoreOrderMatcher = require('../helpers/equals-ignore-order-matcher');
var getRulesFromCode = require('../helpers/get-rules-from-code');

describe('selectorUniqueMatches', function() {

  var regexp;

  beforeAll(function() {
    jasmine.addMatchers(equalsIgnoreOrderMatcher);
  });

  beforeEach(function() {
    regexp = /\[(\w+)\]/gmi;
  });

  it('should be a function', function() {
    expect(selectorUniqueMatches).toEqual(jasmine.any(Function));
  });

  it('should return all matches of the given regular expression in the rules', function() {
    var code = '#element[src] { position: absolute; } ' +
      '.element[src] { background: red; } ' +
      'img[usemap] { display: none; } ' +
      '.link[href]::before { content: "Some content"; }';
    var rules = getRulesFromCode(code);
    var matches = selectorUniqueMatches(rules, regexp);
    expect(matches).toEqualIgnoreOrder(['src', 'href', 'usemap']);
  });

  it('should return an empty array if no matches are found', function() {
    var rules = getRulesFromCode('.class #id { display: none } .other { background: red; }');
    var matches = selectorUniqueMatches(rules, regexp);
    expect(matches).toEqual([]);
  });

});
