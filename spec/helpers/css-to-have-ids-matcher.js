
var extractIds = require('../..').extractIds;
var equalsIgnoreOrderMatcher = require('./equals-ignore-order-matcher');

var compareEqualsIgnoreOrder = equalsIgnoreOrderMatcher.toEqualIgnoreOrder().compare;

function compareIds(code, checkIds) {
  var ids = extractIds(code);
  return compareEqualsIgnoreOrder(ids, checkIds);
}

var matcher = {
  cssToHaveIds: function() {
    return {
      compare: compareIds
    };
  }
};

module.exports = matcher;