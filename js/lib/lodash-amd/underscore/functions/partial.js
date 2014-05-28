/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize underscore exports="amd" -o ./underscore/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/createWrapper', '../arrays/slice'], function(createWrapper, slice) {

  /** Used to compose bitmasks for wrapper metadata */
  var PARTIAL_FLAG = 16;

  /**
   * Creates a function that invokes `func` with any additional `partial` arguments
   * prepended to those provided to the new function. This method is similar to
   * `_.bind` except it does **not** alter the `this` binding.
   *
   * Note: This method does not set the `length` property of partially applied
   * functions.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to partially apply arguments to.
   * @param {...*} [args] The arguments to be partially applied.
   * @returns {Function} Returns the new partially applied function.
   * @example
   *
   * var greet = function(greeting, name) { return greeting + ' ' + name; };
   * var hi = _.partial(greet, 'hi');
   * hi('fred');
   * // => 'hi fred'
   */
  function partial(func) {
    return createWrapper(func, PARTIAL_FLAG, null, null, slice(arguments, 1));
  }

  return partial;
});
