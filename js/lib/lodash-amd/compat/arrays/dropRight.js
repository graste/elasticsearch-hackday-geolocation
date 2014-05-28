/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="amd" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['./initial'], function(initial) {

  /**
   * Creates a slice of `array` with `n` elements dropped from the end.
   *
   * @static
   * @memberOf _
   * @type Function
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {number} [n=1] The number of elements to drop.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.dropRight([1, 2, 3], 1);
   * // => [1, 2]
   *
   * _.dropRight([1, 2, 3], 2);
   * // => [1]
   *
   * _.dropRight([1, 2, 3], 5);
   * // => []
   *
   * _.dropRight([1, 2, 3], 0);
   * // => [1, 2, 3]
   */
  var dropRight = initial;

  return dropRight;
});
