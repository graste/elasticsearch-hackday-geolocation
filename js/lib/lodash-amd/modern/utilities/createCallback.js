/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="amd" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/baseCreateCallback', './matches', './property'], function(baseCreateCallback, matches, property) {

  /**
   * Creates a function bound to an optional `thisArg`. If `func` is a property
   * name the created callback returns the property value for a given element.
   * If `func` is an object the created callback returns `true` for elements
   * that contain the equivalent object properties, otherwise it returns `false`.
   *
   * @static
   * @memberOf _
   * @alias callback
   * @category Utilities
   * @param {*} [func=identity] The value to convert to a callback.
   * @param {*} [thisArg] The `this` binding of the created callback.
   * @param {number} [argCount] The number of arguments the callback accepts.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * // wrap to create custom callback shorthands
   * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
   *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
   *   return !match ? func(callback, thisArg) : function(object) {
   *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
   *   };
   * });
   *
   * _.filter(characters, 'age__gt38');
   * // => [{ 'name': 'fred', 'age': 40 }]
   */
  function createCallback(func, thisArg, argCount) {
    var type = typeof func,
        isFunc = type == 'function';

    if (isFunc && (typeof thisArg == 'undefined' || !('prototype' in func))) {
      return func;
    }
    if (isFunc || func == null) {
      return baseCreateCallback(func, thisArg, argCount);
    }
    // handle "_.pluck" and "_.where" style callback shorthands
    return type == 'object' ? matches(func) : property(func);
  }

  return createCallback;
});
