/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="amd" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../objects/isFunction'], function(isFunction) {

  /** Used as the TypeError message for "Functions" methods */
  var funcErrorText = 'Expected a function';

  /**
   * Creates a function that negates the result of the predicate `func`. The
   * `func` function is executed with the `this` binding and arguments of the
   * created function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} predicate The predicate to negate.
   * @returns {Function} Returns the new function.
   * @example
   *
   * function isEven(num) {
   *   return num % 2 == 0;
   * }
   *
   * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
   * // => [1, 3, 5]
   */
  function negate(predicate) {
    if (!isFunction(predicate)) {
      throw new TypeError(funcErrorText);
    }
    return function() {
      return !predicate.apply(this, arguments);
    };
  }

  return negate;
});
