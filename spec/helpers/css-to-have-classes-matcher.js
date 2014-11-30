
var extractClasses = require('../..').extractClasses;
var equalsIgnoreOrderMatcher = require('./equals-ignore-order-matcher');

var compareEqualsIgnoreOrder = equalsIgnoreOrderMatcher.toEqualIgnoreOrder().compare;

function compareIds(code, checkIds) {
  var ids = extractClasses(code);
  return compareEqualsIgnoreOrder(ids, checkIds);
}

var matcher = {
  cssToHaveClasses: function() {
    return {
      compare: compareIds
    };
  }
};

module.exports = matcher;