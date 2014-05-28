/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="amd" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define([], function() {

  /**
   * A specialized version of `_.map` for arrays without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, callback) {
    var index = -1,
        length = array ? array.length >>> 0 : 0,
        result = Array(length);

    while (++index < length) {
      result[index] = callback(array[index], index, array);
    }
    return result;
  }

  return arrayMap;
});
