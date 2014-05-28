/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="amd" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../functions/createCallback'], function(createCallback) {

  /**
   * This method is like `_.findIndex` except that it iterates over elements
   * of a collection from right to left.
   *
   * If a property name is provided for `predicate` the created "_.pluck" style
   * callback returns the property value of the given element.
   *
   * If an object is provided for `predicate` the created "_.where" style callback
   * returns `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {Function|Object|string} [predicate=identity] The function called
   *  per iteration. If a property name or object is provided it is used to
   *  create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {number} Returns the index of the found element, else `-1`.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney',  'age': 36, 'blocked': true },
   *   { 'name': 'fred',    'age': 40 },
   *   { 'name': 'pebbles', 'age': 1,  'blocked': true }
   * ];
   *
   * _.findLastIndex(characters, function(chr) {
   *   return chr.age > 30;
   * });
   * // => 1
   *
   * // using "_.where" callback shorthand
   * _.findLastIndex(characters, { 'age': 36 });
   * // => 0
   *
   * // using "_.pluck" callback shorthand
   * _.findLastIndex(characters, 'blocked');
   * // => 2
   */
  function findLastIndex(array, predicate, thisArg) {
    var length = array ? array.length : 0;

    predicate = createCallback(predicate, thisArg, 3);
    while (length--) {
      if (predicate(array[length], length, array)) {
        return length;
      }
    }
    return -1;
  }

  return findLastIndex;
});
