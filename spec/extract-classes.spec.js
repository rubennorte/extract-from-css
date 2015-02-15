
var extractClasses = require('..').extractClasses;
var equalsIgnoreOrderMatcher = require('./helpers/equals-ignore-order-matcher');

describe('extractClasses', function() {

  beforeAll(function() {
    jasmine.addMatchers(equalsIgnoreOrderMatcher);
  });

  describe('extract class names from simple rules', function() {
    it('should extract a class name with alphabetical letters', function() {
      var classes = extractClasses('.className { prop: value; }');
      expect(classes).toEqualIgnoreOrder(['className']);
    });

    it('should extract several class names with alphabetical letters', function() {
      var classes = extractClasses('.className1 { prop: value; } .className2 { prop: value; }');
      expect(classes).toEqualIgnoreOrder(['className1', 'className2']);
    });

    it('should not repeat class names', function() {
      var classes = extractClasses('.className1 { prop: value; } .className1 { prop: value; }');
      expect(classes).toEqualIgnoreOrder(['className1']);
    });

    it('should extract class names with underscores', function() {
      var classes = extractClasses('.class_name { prop: value; }');
      expect(classes).toEqualIgnoreOrder(['class_name']);
    });

    it('should extract class names with hyphens', function() {
      var classes = extractClasses('.class-name { prop: value; }');
      expect(classes).toEqualIgnoreOrder(['class-name']);
    });
  });

  describe('extract complex class names', function() {
    it('should extract class names with single escaped characters', function() {
      var classes = extractClasses('.hello-\\#-world { prop: value; }');
      expect(classes).toEqualIgnoreOrder(['hello-#-world']);
    });
    it('should extract class names with multiple escaped characters', function() {
      var classes = extractClasses('.\\0000E9dition { prop: value; }');
      expect(classes).toEqualIgnoreOrder(['édition']);
    });
    it('should extract class names from multiple escaped characters with white space', function() {
      var classes = extractClasses('.\\E9 dition { prop: value; }');
      expect(classes).toEqualIgnoreOrder(['édition']);
    });
    it('should extract class names with unicode characters', function() {
      var classes = extractClasses('.list-★-item { prop: value; }');
      expect(classes).toEqualIgnoreOrder(['list-★-item']);
    });
  });

  describe('extract class names from complex selectors', function() {
    it('should extract class names at the beginning of a complex selector', function() {
      var classes = extractClasses('.class-name * > tag ~ [attr~="test"] + #identifier:hover:after { prop: value; }');
      expect(classes).toEqualIgnoreOrder(['class-name']);
    });
    it('should extract class names at the middle of a complex selector', function() {
      var classes = extractClasses('* > tag ~ [attr~="test"].class-name + #identifier:hover:after { prop: value; }');
      expect(classes).toEqualIgnoreOrder(['class-name']);
    });
    it('should extract class names at the end of a complex selector', function() {
      var classes = extractClasses('* > tag ~ [attr~="test"] + #identifier:hover:after.class-name { prop: value; }');
      expect(classes).toEqualIgnoreOrder(['class-name']);
    });
    it('should extract several class names in the same selector', function() {
      var classes = extractClasses('.class-name-1.class-name { prop: value; }');
      expect(classes).toEqualIgnoreOrder(['class-name-1', 'class-name']);
    });
  });

});