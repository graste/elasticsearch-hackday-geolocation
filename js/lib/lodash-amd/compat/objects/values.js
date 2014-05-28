/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="amd" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/baseValues', './keys'], function(baseValues, keys) {

  /**
   * Creates an array of the own enumerable property values of `object`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Shape(x, y) {
   *   this.x = x;
   *   this.y = y;
   * }
   *
   * Shape.prototype.z = 0;
   *
   * _.values(new Shape(2, 1));
   * // => [2, 1] (property order is not guaranteed across environments)
   */
  function values(object) {
    return baseValues(object, keys);
  }

  return values;
});
