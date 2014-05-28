/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="amd" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define([], function() {

  /**
   * This function is like `baseFor` except that it iterates over properties
   * in the opposite order.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  function baseForRight(object, callback, keysFunc) {
    var props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[length];
      if (callback(object[key], key, object) === false) {
        break;
      }
    }
    return object;
  }

  return baseForRight;
});
