
function inArray(array, el) {
  for (var i = array.length; i--;) {
    if (array[i] === el) {
      return true;
    }
  }
  return false;
}

function equalsIgnoreOrder(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (var i = arr1.length; i--;) {
    if (!inArray(arr2, arr1[i])) {
      return false;
    }
  }
  return true;
}

function compareIgnoreOrder(actual, expected) {
  var result = {};

  result.pass = equalsIgnoreOrder(actual, expected);

  if (!result.pass) {
    result.message = 'Expected ' + actual.toString() +
        ' to be equal (ignoring order) to ' + expected.toString();
  }

  return result;
}

var matcher = {
  toEqualIgnoreOrder: function() {
    return {
      compare: compareIgnoreOrder
    };
  }
};

module.exports = matcher;
