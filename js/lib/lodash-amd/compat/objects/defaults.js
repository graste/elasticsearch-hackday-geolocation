/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="amd" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['./assign', '../arrays/slice'], function(assign, slice) {

  /**
   * Used by `_.defaults` to customize its `_.assign` use.
   *
   * @private
   * @param {*} objectValue The destination object property value.
   * @param {*} sourceValue The source object property value.
   * @returns {*} Returns the value to assign to the destination object.
   */
  function assignDefaults(objectValue, sourceValue) {
    return typeof objectValue == 'undefined' ? sourceValue : objectValue;
  }

  /**
   * Assigns own enumerable properties of source object(s) to the destination
   * object for all destination properties that resolve to `undefined`. Once a
   * property is set, additional defaults of the same property are ignored.
   *
   * Note: See the [documentation example of `_.partialRight`](http://lodash.com/docs#partialRight)
   * for a deep version of this method.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * _.defaults({ 'name': 'barney' }, { 'name': 'fred', 'employer': 'slate' });
   * // => { 'name': 'barney', 'employer': 'slate' }
   */
  function defaults(object) {
    if (!object) {
      return object;
    }
    var args = slice(arguments);
    args.push(assignDefaults);
    return assign.apply(null, args);
  }

  return defaults;
});
