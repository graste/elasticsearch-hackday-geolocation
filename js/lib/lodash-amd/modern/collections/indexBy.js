/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="amd" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/createAggregator'], function(createAggregator) {

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of the collection through the given callback. The corresponding
   * value of each key is the last element responsible for generating the key.
   * The callback is bound to `thisArg` and invoked with three arguments;
   * (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback returns the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * returns `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it is used to
   *  create a "_.pluck" or "_.where" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * var keyData = [
   *   { 'dir': 'left', 'code': 97 },
   *   { 'dir': 'right', 'code': 100 }
   * ];
   *
   * _.indexBy(keyData, 'dir');
   * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
   *
   * _.indexBy(keyData, function(object) { return String.fromCharCode(object.code); });
   * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
   *
   * _.indexBy(keyData, function(object) { return this.fromCharCode(object.code); }, String);
   * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
   */
  var indexBy = createAggregator(function(result, value, key) {
    result[key] = value;
  });

  return indexBy;
});
