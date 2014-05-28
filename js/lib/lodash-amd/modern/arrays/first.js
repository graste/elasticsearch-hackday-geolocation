/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="amd" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../functions/createCallback', './slice'], function(createCallback, slice) {

  /** Used as a safe reference for `undefined` in pre ES5 environments */
  var undefined;

  /**
   * Gets the first element of `array`.
   *
   * Note: The `n` and `predicate` arguments are deprecated; replace with
   * `_.take` and `_.takeWhile` respectively.
   *
   * @static
   * @memberOf _
   * @alias head
   * @category Arrays
   * @param {Array} array The array to query.
   * @returns {*} Returns the first element of `array`.
   * @example
   *
   * _.first([1, 2, 3]);
   * // => 1
   *
   * _.first([]);
   * // => undefined
   */
  function first(array, predicate, thisArg) {
    if (typeof predicate != 'number' && predicate != null) {
      var index = -1,
          length = array ? array.length : 0,
          n = 0;

      predicate = createCallback(predicate, thisArg, 3);
      while (++index < length && predicate(array[index], index, array)) {
        n++;
      }
    } else {
      n = predicate;
      if (n == null || thisArg) {
        return array ? array[0] : undefined;
      }
    }
    return slice(array, 0, n < 0 ? 0 : n);
  }

  return first;
});
