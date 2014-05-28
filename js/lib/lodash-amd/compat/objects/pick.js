/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="amd" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/baseFlatten', '../internals/basePick', '../functions/createCallback', './isObject'], function(baseFlatten, basePick, createCallback, isObject) {

  /**
   * Creates a shallow clone of `object` composed of the specified properties.
   * Property names may be specified as individual arguments or as arrays of
   * property names. If a predicate is provided it is executed for each property
   * of `object` picking the properties the predicate returns truthy for. The
   * predicate is bound to `thisArg` and invoked with three arguments;
   * (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The source object.
   * @param {Function|...(string|string[])} [predicate] The function called per
   *  iteration or property names to pick, specified as individual property
   *  names or arrays of property names.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Object} Returns the new object.
   * @example
   *
   * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
   * // => { 'name': 'fred' }
   *
   * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
   *   return key.charAt(0) != '_';
   * });
   * // => { 'name': 'fred' }
   */
  function pick(object, predicate, thisArg) {
    if (!isObject(object)) {
      return {};
    }
    return basePick(object, typeof predicate == 'function'
      ? createCallback(predicate, thisArg, 3)
      : baseFlatten(arguments, true, false, 1));
  }

  return pick;
});
