
var extract = require('../..');

describe('extract', function() {

  var selector = '#id, .class {}';

  it('should extract class names', function() {
    var result = extract(['classes'], selector);
    expect(result).toEqual({classes: ['class']});
  });

  it('should extract ids', function() {
    var result = extract(['ids'], selector);
    expect(result).toEqual({ids: ['id']});
  });

  it('should extract multiple features', function() {
    var result = extract(['ids', 'classes'], selector);
    expect(result).toEqual({ids: ['id'], classes: ['class']});
  });

  it('should throw an error when extracting unknown features', function() {
    expect(function() {
      extract(['ids', 'potatoes'], selector);
    }).toThrow();
  });

  it('should return an empty object when extracting no features', function() {
    var result = extract([], selector);
    expect(result).toEqual({});
  });

});
