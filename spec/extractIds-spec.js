
var extractIds = require('..').extractIds;
var equalsIgnoreOrderMatcher = require('./helpers/equals-ignore-order-matcher');

describe('extractIds', function() {

  beforeAll(function() {
    jasmine.addMatchers(equalsIgnoreOrderMatcher);

    this.assertIds = function assertIds(code, checkIds) {
      var ids = extractIds(code);
      expect(ids).toEqualIgnoreOrder(checkIds);
    };
  });

  describe('extract ids from simple rules', function() {
    it('should extract an id with alphabetical letters', function() {
      this.assertIds('#id { prop: value; }', ['id']);
    });

    it('should extract several ids with alphabetical letters', function() {
      this.assertIds('#id1 { prop: value; } #id2 { prop: value; }', ['id1', 'id2']);
    });

    it('should not repeat ids', function() {
      this.assertIds('#id1 { prop: value; } #id1 { prop: value; }', ['id1']);
    });

    it('should extract ids with underscores', function() {
      this.assertIds('#id_value { prop: value; }', ['id_value']);
    });

    it('should extract ids with hyphens', function() {
      this.assertIds('#id-value { prop: value; }', ['id-value']);
    });
  });

  describe('extract complex ids', function() {
    it('should extract ids with single escaped characters', function() {
      this.assertIds('#hello-\\#-world { prop: value; }', ['hello-#-world']);
    });
    it('should extract ids with multiple escaped characters', function() {
      this.assertIds('#\\0000E9dition { prop: value; }', ['édition']);
    });
    it('should extract ids from multiple escaped characters with white space', function() {
      this.assertIds('#\\E9 dition { prop: value; }', ['édition']);
    });
    it('should extract ids with unicode characters', function() {
      this.assertIds('#list-★-item { prop: value; }', ['list-★-item']);
    });
  });

  describe('extract ids from complex selectors', function() {
    it('should extract ids at the beginning of a complex selector', function() {
      this.assertIds('#id * > tag ~ [attr~="test"] + .className:hover:after { prop: value; }', ['id']);
    });
    it('should extract ids at the middle of a complex selector', function() {
      this.assertIds('* > tag ~ [attr~="test"]#id + .className:hover:after { prop: value; }', ['id']);
    });
    it('should extract ids at the end of a complex selector', function() {
      this.assertIds('* > tag ~ [attr~="test"] + .className:hover:after#id { prop: value; }', ['id']);
    });
    it('should extract several ids in the same selector', function() {
      this.assertIds('#id-1#id { prop: value; }', ['id-1', 'id']);
    });
  });

});