/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize underscore exports="amd" -o ./underscore/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/baseFlatten'], function(baseFlatten) {

  /**
   * Flattens a nested array (the nesting can be to any depth). If `isShallow`
   * is truthy, the array is only flattened a single level. If a callback is
   * provided each element of the array is passed through the callback before
   * flattening. The callback is bound to `thisArg` and invoked with three
   * arguments; (value, index, array).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback returns the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * returns `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to flatten.
   * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
   * @param {Function|Object|string} [callback] The function called per iteration.
   *  If a property name or object is provided it is used to create a "_.pluck"
   *  or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flatten([1, [2], [3, [[4]]]]);
   * // => [1, 2, 3, 4];
   *
   * // using `isShallow`
   * _.flatten([1, [2], [3, [[4]]]], true);
   * // => [1, 2, 3, [[4]]];
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
   *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.flatten(characters, 'pets');
   * // => ['hoppy', 'baby puss', 'dino']
   */
  function flatten(array, isShallow, guard) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    var type = typeof isShallow;
    if ((type == 'number' || type == 'string') && guard && guard[isShallow] === array) {
      isShallow = false;
    }
    return baseFlatten(array, isShallow);
  }

  return flatten;
});
