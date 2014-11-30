
var extractClasses = require('..').extractClasses;
var equalsIgnoreOrderMatcher = require('./helpers/equals-ignore-order-matcher');

describe('extractClasses', function() {

  beforeAll(function() {
    jasmine.addMatchers(equalsIgnoreOrderMatcher);

    this.assertClasses = function assertClasses(code, checkIds) {
      var ids = extractClasses(code);
      expect(ids).toEqualIgnoreOrder(checkIds);
    };
  });

  describe('extract class names from simple rules', function() {
    it('should extract a class name with alphabetical letters', function() {
      this.assertClasses('.className { prop: value; }',
          ['className']);
    });

    it('should extract several class names with alphabetical letters', function() {
      this.assertClasses('.className1 { prop: value; } .className2 { prop: value; }',
          ['className1', 'className2']);
    });

    it('should not repeat class names', function() {
      this.assertClasses('.className1 { prop: value; } .className1 { prop: value; }',
          ['className1']);
    });

    it('should extract class names with underscores', function() {
      this.assertClasses('.class_name { prop: value; }',
          ['class_name']);
    });

    it('should extract class names with hyphens', function() {
      this.assertClasses('.class-name { prop: value; }',
          ['class-name']);
    });
  });

  describe('extract complex class names', function() {
    it('should extract class names with single escaped characters', function() {
      this.assertClasses('.hello-\\#-world { prop: value; }',
          ['hello-#-world']);
    });
    it('should extract class names with multiple escaped characters', function() {
      this.assertClasses('.\\0000E9dition { prop: value; }',
          ['édition']);
    });
    it('should extract class names from multiple escaped characters with white space', function() {
      this.assertClasses('.\\E9 dition { prop: value; }',
          ['édition']);
    });
    it('should extract class names with unicode characters', function() {
      this.assertClasses('.list-★-item { prop: value; }',
          ['list-★-item']);
    });
  });

  describe('extract class names from complex selectors', function() {
    it('should extract class names at the beginning of a complex selector', function() {
      this.assertClasses('.class-name * > tag ~ [attr~="test"] + #identifier:hover:after { prop: value; }',
          ['class-name']);
    });
    it('should extract class names at the middle of a complex selector', function() {
      this.assertClasses('* > tag ~ [attr~="test"].class-name + #identifier:hover:after { prop: value; }',
          ['class-name']);
    });
    it('should extract class names at the end of a complex selector', function() {
      this.assertClasses('* > tag ~ [attr~="test"] + #identifier:hover:after.class-name { prop: value; }',
          ['class-name']);
    });
    it('should extract several class names in the same selector', function() {
      this.assertClasses('.class-name-1.class-name { prop: value; }',
          ['class-name-1', 'class-name']);
    });
  });

});