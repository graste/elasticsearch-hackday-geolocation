/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize underscore exports="amd" -o ./underscore/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['./baseCreateWrapper', '../objects/isFunction'], function(baseCreateWrapper, isFunction) {

  /** Used to compose bitmasks for wrapper metadata */
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      PARTIAL_FLAG = 16,
      PARTIAL_RIGHT_FLAG = 32;

  /** Used as the TypeError message for "Functions" methods */
  var funcErrorText = 'Expected a function';

  /* Native method shortcuts for methods with the same name as other `lodash` methods */
  var nativeMax = Math.max;

  /**
   * Creates a function that either curries or invokes `func` with an optional
   * `this` binding and partially applied arguments.
   *
   * @private
   * @param {Function|string} func The function or method name to reference.
   * @param {number} bitmask The bitmask of flags to compose.
   *  The bitmask may be composed of the following flags:
   *  1  - `_.bind`
   *  2  - `_.bindKey`
   *  4  - `_.curry`
   *  8  - `_.curry` (bound)
   *  16 - `_.partial`
   *  32 - `_.partialRight`
   * @param {number} [arity] The arity of `func`.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partialArgs] An array of arguments to prepend to those
   *  provided to the new function.
   * @param {Array} [partialRightArgs] An array of arguments to append to those
   *  provided to the new function.
   * @returns {Function} Returns the new function.
   */
  function createWrapper(func, bitmask, arity, thisArg, partialArgs, partialRightArgs) {
    var isBind = bitmask & BIND_FLAG,
        isBindKey = bitmask & BIND_KEY_FLAG,
        isPartial = bitmask & PARTIAL_FLAG,
        isPartialRight = bitmask & PARTIAL_RIGHT_FLAG;

    if (!isFunction(func)) {
      throw new TypeError(funcErrorText);
    }
    if (isPartial && !partialArgs.length) {
      bitmask &= ~PARTIAL_FLAG;
      isPartial = partialArgs = false;
    }
    if (isPartial) {
      var partialHolders = [];
    }
    if (arity == null) {
      arity = isBindKey ? 0 : func.length;
    }
    arity = nativeMax(arity, 0);

    // fast path for `_.bind`
    var data = [func, bitmask, arity, thisArg, partialArgs, partialRightArgs, partialHolders];
    return baseCreateWrapper(data);
  }

  return createWrapper;
});
