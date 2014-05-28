/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="amd" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../objects/isFunction'], function(isFunction) {

  /** Used as the TypeError message for "Functions" methods */
  var funcErrorText = 'Expected a function';

  /** Used for native method references */
  var objectProto = Object.prototype;

  /** Native method shortcuts */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the cache key. The `func` is
   * executed with the `this` binding of the memoized function. The result cache
   * is exposed as the `cache` property on the memoized function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoizing function.
   * @example
   *
   * var fibonacci = _.memoize(function(n) {
   *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
   * });
   *
   * fibonacci(9)
   * // => 34
   *
   * // modifying the result cache
   * var upperCase = _.memoize(function(string) {
   *   return string.toUpperCase();
   * });
   *
   * upperCase('fred');
   * // => 'FRED'
   *
   * upperCase.cache.fred = 'BARNEY'
   * upperCase('fred');
   * // => 'BARNEY'
   */
  function memoize(func, resolver) {
    if (!isFunction(func) || (resolver && !isFunction(resolver))) {
      throw new TypeError(funcErrorText);
    }
    var memoized = function() {
      var key = resolver ? resolver.apply(this, arguments) : arguments[0];
      if (key == '__proto__') {
        return func.apply(this, arguments);
      }
      var cache = memoized.cache;
      return hasOwnProperty.call(cache, key)
        ? cache[key]
        : (cache[key] = func.apply(this, arguments));
    }
    memoized.cache = {};
    return memoized;
  }

  return memoize;
});
