/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="amd" -o ./modern/`
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
   * Executes the `func` function after `wait` milliseconds. Additional arguments
   * are provided to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to delay.
   * @param {number} wait The number of milliseconds to delay execution.
   * @param {...*} [args] The arguments to invoke the function with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.delay(function(text) { console.log(text); }, 1000, 'later');
   * // => logs 'later' after one second
   */
  function delay(func, wait) {
    if (!isFunction(func)) {
      throw new TypeError(funcErrorText);
    }
    var args = slice(arguments, 2);
    return setTimeout(function() { func.apply(undefined, args); }, wait);
  }

  return delay;
});
