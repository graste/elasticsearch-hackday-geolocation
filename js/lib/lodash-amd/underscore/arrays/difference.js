/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize underscore exports="amd" -o ./underscore/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/baseDifference', '../internals/baseFlatten', '../objects/isArguments', '../objects/isArray'], function(baseDifference, baseFlatten, isArguments, isArray) {

  /**
   * Creates an array excluding all values of the provided arrays using strict
   * equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to process.
   * @param {...Array} [values] The arrays of values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.difference([1, 2, 3], [5, 2, 10]);
   * // => [1, 3]
   */
  function difference() {
    var index = -1,
        length = arguments.length;

    while (++index < length) {
      var value = arguments[index];
      if (isArray(value) || isArguments(value)) {
        break;
      }
    }
    return baseDifference(arguments[index], baseFlatten(arguments, true, true, ++index));
  }

  return difference;
});
