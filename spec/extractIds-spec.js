
var cssToHaveIdsMatcher = require('./helpers/css-to-have-ids-matcher');

describe('extractIds', function() {

  beforeAll(function() {
    jasmine.addMatchers(cssToHaveIdsMatcher);
  });

  describe('extract ids from simple rules', function() {
    it('should extract an id with alphabetical letters', function() {
      expect('#id { prop: value; }').cssToHaveIds(['id']);
    });

    it('should extract several ids with alphabetical letters', function() {
      expect('#id1 { prop: value; } #id2 { prop: value; }').cssToHaveIds(['id1', 'id2']);
    });

    it('should not repeat ids', function() {
      expect('#id1 { prop: value; } #id1 { prop: value; }').cssToHaveIds(['id1']);
    });

    it('should extract ids with underscores', function() {
      expect('#id_value { prop: value; }').cssToHaveIds(['id_value']);
    });

    it('should extract ids with hyphens', function() {
      expect('#id-value { prop: value; }').cssToHaveIds(['id-value']);
    });
  });

  describe('extract complex ids', function() {
    it('should extract ids with single escaped characters', function() {
      expect('#hello-\\#-world { prop: value; }').cssToHaveIds(['hello-#-world']);
    });
    it('should extract ids with multiple escaped characters', function() {
      expect('#\\0000E9dition { prop: value; }').cssToHaveIds(['édition']);
    });
    it('should extract ids from multiple escaped characters with white space', function() {
      expect('#\\E9 dition { prop: value; }').cssToHaveIds(['édition']);
    });
    it('should extract ids with unicode characters', function() {
      expect('#list-★-item { prop: value; }').cssToHaveIds(['list-★-item']);
    });
  });

  describe('extract ids from complex selectors', function() {
    it('should extract ids at the beginning of a complex selector', function() {
      expect('#id * > tag ~ [attr~="test"] + .className:hover:after { prop: value; }').cssToHaveIds(['id']);
    });
    it('should extract ids at the middle of a complex selector', function() {
      expect('* > tag ~ [attr~="test"]#id + .className:hover:after { prop: value; }').cssToHaveIds(['id']);
    });
    it('should extract ids at the end of a complex selector', function() {
      expect('* > tag ~ [attr~="test"] + .className:hover:after#id { prop: value; }').cssToHaveIds(['id']);
    });
    it('should extract several ids in the same selector', function() {
      expect('#id-1#id { prop: value; }').cssToHaveIds(['id-1', 'id']);
    });
  });

});