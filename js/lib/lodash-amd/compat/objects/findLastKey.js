/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="amd" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/baseFind', '../internals/baseForOwnRight', '../functions/createCallback'], function(baseFind, baseForOwnRight, createCallback) {

  /**
   * This method is like `_.findKey` except that it iterates over elements of
   * a collection in the opposite order.
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
   * @category Objects
   * @param {Object} object The object to search.
   * @param {Function|Object|string} [predicate=identity] The function called
   *  per iteration. If a property name or object is provided it is used to
   *  create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
   * @example
   *
   * var characters = {
   *   'barney': { 'age': 36, 'blocked': true },
   *   'fred': { 'age': 40 },
   *   'pebbles': { 'age': 1, 'blocked': true }
   * };
   *
   * _.findLastKey(characters, function(chr) {
   *   return chr.age < 40;
   * });
   * // => returns `pebbles`, assuming `_.findKey` returns `barney`
   *
   * // using "_.where" callback shorthand
   * _.findLastKey(characters, { 'age': 40 });
   * // => 'fred'
   *
   * // using "_.pluck" callback shorthand
   * _.findLastKey(characters, 'blocked');
   * // => 'pebbles'
   */
  function findLastKey(object, predicate, thisArg) {
    predicate = createCallback(predicate, thisArg, 3);
    return baseFind(object, predicate, baseForOwnRight, true);
  }

  return findLastKey;
});
