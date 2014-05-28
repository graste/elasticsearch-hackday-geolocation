/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="amd" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['./baseBind', './baseCreateWrapper', '../objects/isFunction', '../arrays/slice'], function(baseBind, baseCreateWrapper, isFunction, slice) {

  /** Used to compose bitmasks for wrapper metadata */
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      CURRY_BOUND_FLAG = 8,
      PARTIAL_FLAG = 16,
      PARTIAL_RIGHT_FLAG = 32;

  /** Used as the semantic version number */
  var version = '2.4.1';

  /** Used as the property name for wrapper metadata */
  var expando = '__lodash@' + version + '__';

  /** Used as the TypeError message for "Functions" methods */
  var funcErrorText = 'Expected a function';

  /** Used for native method references */
  var arrayProto = Array.prototype;

  /** Native method shortcuts */
  var push = arrayProto.push,
      unshift = arrayProto.unshift;

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

    if (!isBindKey && !isFunction(func)) {
      throw new TypeError(funcErrorText);
    }
    if (isPartial && !partialArgs.length) {
      bitmask &= ~PARTIAL_FLAG;
      isPartial = partialArgs = false;
    }
    if (isPartialRight && !partialRightArgs.length) {
      bitmask &= ~PARTIAL_RIGHT_FLAG;
      isPartialRight = partialRightArgs = false;
    }
    var data = !isBindKey && func[expando];
    if (data && data !== true) {
      // shallow clone `data`
      data = slice(data);

      // clone partial left arguments
      if (data[4]) {
        data[4] = slice(data[4]);
      }
      // clone partial right arguments
      if (data[5]) {
        data[5] = slice(data[5]);
      }
      // set arity if provided
      if (typeof arity == 'number') {
        data[2] = arity;
      }
      // set `thisArg` if not previously bound
      var bound = data[1] & BIND_FLAG;
      if (isBind && !bound) {
        data[3] = thisArg;
      }
      // set if currying a bound function
      if (!isBind && bound) {
        bitmask |= CURRY_BOUND_FLAG;
      }
      // append partial left arguments
      if (isPartial) {
        if (data[4]) {
          push.apply(data[4], partialArgs);
        } else {
          data[4] = partialArgs;
        }
      }
      // prepend partial right arguments
      if (isPartialRight) {
        if (data[5]) {
          unshift.apply(data[5], partialRightArgs);
        } else {
          data[5] = partialRightArgs;
        }
      }
      // merge flags
      data[1] |= bitmask;
      return createWrapper.apply(null, data);
    }
    if (isPartial) {
      var partialHolders = [];
    }
    if (isPartialRight) {
      var partialRightHolders = [];
    }
    if (arity == null) {
      arity = isBindKey ? 0 : func.length;
    }
    arity = nativeMax(arity, 0);

    // fast path for `_.bind`
    data = [func, bitmask, arity, thisArg, partialArgs, partialRightArgs, partialHolders, partialRightHolders];
    return (bitmask == BIND_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG))
      ? baseBind(data)
      : baseCreateWrapper(data);
  }

  return createWrapper;
});
