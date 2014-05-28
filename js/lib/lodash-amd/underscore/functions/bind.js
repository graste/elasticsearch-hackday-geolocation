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
  var BIND_FLAG = 1,
      PARTIAL_FLAG = 16;

  /**
   * Creates a function that invokes `func` with the `this` binding of `thisArg`
   * and prepends any additional `bind` arguments to those provided to the bound
   * function.
   *
   * Note: Unlike native `Function#bind` this method does not set the `length`
   * property of bound functions.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to bind.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {...*} [args] The arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var func = function(greeting) {
   *   return greeting + ' ' + this.name;
   * };
   *
   * func = _.bind(func, { 'name': 'fred' }, 'hi');
   * func();
   * // => 'hi fred'
   */
  function bind(func, thisArg) {
    return arguments.length < 3
      ? createWrapper(func, BIND_FLAG, null, thisArg)
      : createWrapper(func, BIND_FLAG | PARTIAL_FLAG, null, thisArg, slice(arguments, 2));
  }

  return bind;
});
