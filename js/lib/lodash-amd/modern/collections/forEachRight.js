/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="amd" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/baseCreateCallback', '../internals/baseEachRight'], function(baseCreateCallback, baseEachRight) {

  /**
   * Used as the maximum length of an array-like object.
   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
   * for more details.
   */
  var maxSafeInteger = Math.pow(2, 53) - 1;

  /**
   * A specialized version of `_.forEachRight` for arrays without support for
   * callback shorthands or `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEachRight(array, callback) {
    var length = array ? array.length : 0;
    while (length--) {
      if (callback(array[length], length, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * This method is like `_.forEach` except that it iterates over elements of
   * a collection from right to left.
   *
   * @static
   * @memberOf _
   * @alias eachRight
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array|Object|string} Returns `collection`.
   * @example
   *
   * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
   * // => logs each number from right to left and returns '3,2,1'
   */
  function forEachRight(collection, callback, thisArg) {
    var length = collection ? collection.length : 0;

    if (typeof callback != 'function' || typeof thisArg != 'undefined') {
      callback = baseCreateCallback(callback, thisArg, 3);
    }
    return (typeof length == 'number' && length > -1 && length <= maxSafeInteger)
      ? arrayEachRight(collection, callback)
      : baseEachRight(collection, callback);
  }

  return forEachRight;
});
