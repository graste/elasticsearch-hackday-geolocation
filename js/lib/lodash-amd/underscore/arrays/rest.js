/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize underscore exports="amd" -o ./underscore/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['./slice'], function(slice) {

  /**
   * Gets all but the first element of `array`.
   *
   * Note: The `n` and `predicate` arguments are deprecated; replace with
   * `_.drop` and `_.dropWhile` respectively.
   *
   * @static
   * @memberOf _
   * @alias tail
   * @category Arrays
   * @param {Array} array The array to query.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.rest([1, 2, 3]);
   * // => [2, 3]
   */
  function rest(array, n, guard) {
    if (n == null || guard) {
      n = 1;
    } else {
      n = n < 0 ? 0 : n;
    }
    return slice(array, n);
  }

  return rest;
});
