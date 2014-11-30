
var cssToHaveClassesMatcher = require('./helpers/css-to-have-classes-matcher');

describe('extractClasses', function() {

  beforeAll(function() {
    jasmine.addMatchers(cssToHaveClassesMatcher);
  });

  describe('extract class names from simple rules', function() {
    it('should extract a class name with alphabetical letters', function() {
      expect('.className { prop: value; }').cssToHaveClasses(['className']);
    });

    it('should extract several class names with alphabetical letters', function() {
      expect('.className1 { prop: value; } .className2 { prop: value; }').cssToHaveClasses(['className1', 'className2']);
    });

    it('should not repeat class names', function() {
      expect('.className1 { prop: value; } .className1 { prop: value; }').cssToHaveClasses(['className1']);
    });

    it('should extract class names with underscores', function() {
      expect('.class_name { prop: value; }').cssToHaveClasses(['class_name']);
    });

    it('should extract class names with hyphens', function() {
      expect('.class-name { prop: value; }').cssToHaveClasses(['class-name']);
    });
  });

  describe('extract complex class names', function() {
    it('should extract class names with single escaped characters', function() {
      expect('.hello-\\#-world { prop: value; }').cssToHaveClasses(['hello-#-world']);
    });
    it('should extract class names with multiple escaped characters', function() {
      expect('.\\0000E9dition { prop: value; }').cssToHaveClasses(['édition']);
    });
    it('should extract class names from multiple escaped characters with white space', function() {
      expect('.\\E9 dition { prop: value; }').cssToHaveClasses(['édition']);
    });
    it('should extract class names with unicode characters', function() {
      expect('.list-★-item { prop: value; }').cssToHaveClasses(['list-★-item']);
    });
  });

  describe('extract class names from complex selectors', function() {
    it('should extract class names at the beginning of a complex selector', function() {
      expect('.class-name * > tag ~ [attr~="test"] + #identifier:hover:after { prop: value; }').cssToHaveClasses(['class-name']);
    });
    it('should extract class names at the middle of a complex selector', function() {
      expect('* > tag ~ [attr~="test"].class-name + #identifier:hover:after { prop: value; }').cssToHaveClasses(['class-name']);
    });
    it('should extract class names at the end of a complex selector', function() {
      expect('* > tag ~ [attr~="test"] + #identifier:hover:after.class-name { prop: value; }').cssToHaveClasses(['class-name']);
    });
    it('should extract several class names in the same selector', function() {
      expect('.class-name-1.class-name { prop: value; }').cssToHaveClasses(['class-name-1', 'class-name']);
    });
  });

});