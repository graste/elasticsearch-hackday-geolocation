/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="amd" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['./rest'], function(rest) {

  /**
   * Creates a slice of `array` excluding elements dropped from the beginning.
   * Elements are dropped until the predicate returns falsey. The predicate is
   * bound to `thisArg` and invoked with three arguments; (value, index, array).
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
   * @type Function
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Function|Object|string} [predicate=identity] The function called
   *  per element.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.dropWhile([1, 2, 3], function(num) {
   *   return num < 3;
   * });
   * // => [3]
   *
   * var characters = [
   *   { 'name': 'barney',  'employer': 'slate', 'blocked': true },
   *   { 'name': 'fred',    'employer': 'slate' },
   *   { 'name': 'pebbles', 'employer': 'na',    'blocked': true }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.pluck(_.dropWhile(characters, 'blocked'), 'name');
   * // => ['fred', 'pebbles']
   *
   * // using "_.where" callback shorthand
   * _.pluck(_.dropWhile(characters, { 'employer': 'slate' }), 'name');
   * // => ['pebbles']
   */
  var dropWhile = rest;

  return dropWhile;
});
