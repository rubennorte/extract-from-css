
var extractIds = require('..').extractIds;
var equalsIgnoreOrderMatcher = require('./helpers/equals-ignore-order-matcher');

describe('extractIds', function() {

  beforeAll(function() {
    jasmine.addMatchers(equalsIgnoreOrderMatcher);
  });

  describe('extract ids from simple rules', function() {
    it('should extract an id with alphabetical letters', function() {
      var ids = extractIds('#id { prop: value; }');
      expect(ids).toEqualIgnoreOrder(['id']);
    });

    it('should extract several ids with alphabetical letters', function() {
      var ids = extractIds('#id1 { prop: value; } #id2 { prop: value; }');
      expect(ids).toEqualIgnoreOrder(['id1', 'id2']);
    });

    it('should not repeat ids', function() {
      var ids = extractIds('#id1 { prop: value; } #id1 { prop: value; }');
      expect(ids).toEqualIgnoreOrder(['id1']);
    });

    it('should extract ids with underscores', function() {
      var ids = extractIds('#id_value { prop: value; }');
      expect(ids).toEqualIgnoreOrder(['id_value']);
    });

    it('should extract ids with hyphens', function() {
      var ids = extractIds('#id-value { prop: value; }');
      expect(ids).toEqualIgnoreOrder(['id-value']);
    });
  });

  describe('extract complex ids', function() {
    it('should extract ids with single escaped characters', function() {
      var ids = extractIds('#hello-\\#-world { prop: value; }');
      expect(ids).toEqualIgnoreOrder(['hello-#-world']);
    });
    it('should extract ids with multiple escaped characters', function() {
      var ids = extractIds('#\\0000E9dition { prop: value; }');
      expect(ids).toEqualIgnoreOrder(['édition']);
    });
    it('should extract ids from multiple escaped characters with white space', function() {
      var ids = extractIds('#\\E9 dition { prop: value; }');
      expect(ids).toEqualIgnoreOrder(['édition']);
    });
    it('should extract ids with unicode characters', function() {
      var ids = extractIds('#list-★-item { prop: value; }');
      expect(ids).toEqualIgnoreOrder(['list-★-item']);
    });
  });

  describe('extract ids from complex selectors', function() {
    it('should extract ids at the beginning of a complex selector', function() {
      var ids = extractIds('#id * > tag ~ [attr~="test"] + .className:hover:after { prop: value; }');
      expect(ids).toEqualIgnoreOrder(['id']);
    });
    it('should extract ids at the middle of a complex selector', function() {
      var ids = extractIds('* > tag ~ [attr~="test"]#id + .className:hover:after { prop: value; }');
      expect(ids).toEqualIgnoreOrder(['id']);
    });
    it('should extract ids at the end of a complex selector', function() {
      var ids = extractIds('* > tag ~ [attr~="test"] + .className:hover:after#id { prop: value; }');
      expect(ids).toEqualIgnoreOrder(['id']);
    });
    it('should extract several ids in the same selector', function() {
      var ids = extractIds('#id-1#id { prop: value; }');
      expect(ids).toEqualIgnoreOrder(['id-1', 'id']);
    });
  });

});