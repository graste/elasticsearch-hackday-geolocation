/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="amd" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../objects/isFunction', '../arrays/slice'], function(isFunction, slice) {

  /** Used as a safe reference for `undefined` in pre ES5 environments */
  var undefined;

  /** Used as the TypeError message for "Functions" methods */
  var funcErrorText = 'Expected a function';

  /**
   * Defers executing the `func` function until the current call stack has
   * cleared. Additional arguments are provided to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to defer.
   * @param {...*} [args] The arguments to invoke the function with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.defer(function(text) { console.log(text); }, 'deferred');
   * // logs 'deferred' after one or more milliseconds
   */
  function defer(func) {
    if (!isFunction(func)) {
      throw new TypeError(funcErrorText);
    }
    var args = slice(arguments, 1);
    return setTimeout(function() { func.apply(undefined, args); }, 1);
  }

  return defer;
});
