/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="amd" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../objects/keys'], function(keys) {

  /**
   * The base implementation of `_.assign` without support for argument juggling,
   * multiple sources, and `this` binding.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {Function} [callback] The function to customize assigning values.
   * @returns {Object} Returns the destination object.
   */
  function baseAssign(object, source, callback) {
    if (!object) {
      return object;
    }
    var index = -1,
        props = keys(source),
        length = props.length;

    while (++index < length) {
      var key = props[index];
      object[key] = callback ? callback(object[key], source[key], key, object, source) : source[key];
    }
    return object;
  }

  return baseAssign;
});
