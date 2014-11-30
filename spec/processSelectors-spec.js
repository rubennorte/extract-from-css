
var assertProcessArguments = require('./helpers/assert-process-arguments');

describe('processSelectors', function() {

  it('should process a single selector', function() {
    assertProcessArguments('.className {}',
        [['.className']]);
  });

  it('should process multiple selectors', function() {
    assertProcessArguments('.className {} .className2 {}',
        [['.className'], ['.className2']]);
  });

  it('should ignore selectors inside comments', function() {
    assertProcessArguments('.className {} /* .className2 {} */',
        [['.className']]);
  });

  it('should ignore string contents', function() {
    assertProcessArguments('.className { background-image: url(".className2 { prop: value; }"); }',
        [['.className']]);
  });

  it('should process nested selectors', function() {
    assertProcessArguments('@media (max-width: 500px) { @media screen { .className { prop: value; } } }',
        [['.className']]);
  });

});