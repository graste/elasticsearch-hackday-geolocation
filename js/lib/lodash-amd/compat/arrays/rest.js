/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="amd" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../functions/createCallback', './slice'], function(createCallback, slice) {

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
  function rest(array, predicate, thisArg) {
    if (typeof predicate != 'number' && predicate != null) {
      var index = -1,
          length = array ? array.length : 0,
          n = 0;

      predicate = createCallback(predicate, thisArg, 3);
      while (++index < length && predicate(array[index], index, array)) {
        n++;
      }
    } else if (predicate == null || thisArg) {
      n = 1;
    } else {
      n = predicate < 0 ? 0 : predicate;
    }
    return slice(array, n);
  }

  return rest;
});
