/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="amd" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['./baseCreate', './composeArgs', './composeArgsRight', '../objects/isObject', './setData'], function(baseCreate, composeArgs, composeArgsRight, isObject, setData) {

  /** Used to compose bitmasks for wrapper metadata */
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      CURRY_FLAG = 4,
      CURRY_BOUND_FLAG = 8,
      PARTIAL_FLAG = 16,
      PARTIAL_RIGHT_FLAG = 32;

  /* Native method shortcuts for methods with the same name as other `lodash` methods */
  var nativeMax = Math.max;

  /**
   * The base implementation of `createWrapper` that creates the wrapper and
   * sets its metadata.
   *
   * @private
   * @param {Array} data The metadata array.
   * @returns {Function} Returns the new function.
   */
  function baseCreateWrapper(data) {
    var func = data[0],
        bitmask = data[1],
        arity = data[2],
        thisArg = data[3],
        partialArgs = data[4],
        partialRightArgs = data[5],
        partialHolders = data[6],
        partialRightHolders = data[7];

    var isBind = bitmask & BIND_FLAG,
        isBindKey = bitmask & BIND_KEY_FLAG,
        isCurry = bitmask & CURRY_FLAG,
        isCurryBound = bitmask & CURRY_BOUND_FLAG,
        key = func;

    function bound() {
      var length = arguments.length,
          index = length,
          args = Array(length);

      while (index--) {
        args[index] = arguments[index];
      }
      if (partialArgs) {
        args = composeArgs(partialArgs, partialHolders, args);
      }
      if (partialRightArgs) {
        args = composeArgsRight(partialRightArgs, partialRightHolders, args);
      }
      if (isCurry) {
        var newPartialHolders = [];
        length -= newPartialHolders.length;

        if (length < arity) {
          bitmask |= PARTIAL_FLAG;
          bitmask &= ~PARTIAL_RIGHT_FLAG
          if (!isCurryBound) {
            bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
          }
          var newArity = nativeMax(arity - length, 0);
          return baseCreateWrapper([func, bitmask, newArity, thisArg, args, null, newPartialHolders]);
        }
      }
      var thisBinding = isBind ? thisArg : this;
      if (isBindKey) {
        func = thisBinding[key];
      }
      if (this instanceof bound) {
        thisBinding = baseCreate(func.prototype);
        var result = func.apply(thisBinding, args);
        return isObject(result) ? result : thisBinding;
      }
      return func.apply(thisBinding, args);
    }
    setData(bound, data);
    return bound;
  }

  return baseCreateWrapper;
});
