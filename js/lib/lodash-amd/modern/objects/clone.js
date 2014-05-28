/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="amd" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/baseClone', '../internals/baseCreateCallback'], function(baseClone, baseCreateCallback) {

  /**
   * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
   * otherwise they are assigned by reference. If a callback is provided it is
   * executed to produce the cloned values. If the callback returns `undefined`
   * cloning is handled by the method instead. The callback is bound to `thisArg`
   * and invoked with two argument; (value, index|key).
   *
   * Note: This method is loosely based on the structured clone algorithm. Functions
   * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
   * objects created by constructors other than `Object` are cloned to plain `Object` objects.
   * See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to clone.
   * @param {boolean} [isDeep=false] Specify a deep clone.
   * @param {Function} [callback] The function to customize cloning values.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the cloned value.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * var shallow = _.clone(characters);
   * shallow[0] === characters[0];
   * // => true
   *
   * var deep = _.clone(characters, true);
   * deep[0] === characters[0];
   * // => false
   *
   * _.mixin({
   *   'clone': _.partialRight(_.clone, function(value) {
   *     return _.isElement(value) ? value.cloneNode(false) : undefined;
   *   })
   * });
   *
   * var clone = _.clone(document.body);
   * clone.childNodes.length;
   * // => 0
   */
  function clone(value, isDeep, callback, thisArg) {
    var type = typeof isDeep;

    // juggle arguments
    if (type != 'boolean' && isDeep != null) {
      thisArg = callback;
      callback = isDeep;
      isDeep = false;

      // enables use as a callback for functions like `_.map`
      if ((type == 'number' || type == 'string') && thisArg && thisArg[callback] === value) {
        callback = null;
      }
    }
    callback = typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1);
    return baseClone(value, isDeep, callback);
  }

  return clone;
});
