/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize underscore exports="amd" -o ./underscore/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../objects/keys'], function(keys) {

  /** Used for native method references */
  var objectProto = Object.prototype;

  /** Native method shortcuts */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Creates a "_.where" style predicate function which performs a deep comparison
   * between a given object and the `source` object, returning `true` if the given
   * object has equivalent property values, else `false`.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var characters = [
   *   { 'name': 'fred',   'age': 40 },
   *   { 'name': 'barney', 'age': 36 }
   * ];
   *
   * var matchesAge = _.matches({ 'age': 36 });
   *
   * _.filter(characters, matchesAge);
   * // => [{ 'name': 'barney', 'age': 36 }]
   *
   * _.find(characters, matchesAge);
   * // => { 'name': 'barney', 'age': 36 }
   */
  function matches(source) {
    var props = keys(source),
        propsLength = props.length;

    return function(object) {
      var length = propsLength;
      if (length && !object) {
        return false;
      }
      while (length--) {
        var key = props[length];
        if (!(hasOwnProperty.call(object, key) && object[key] === source[key])) {
          return false
        }
      }
      return true;
    };
  }

  return matches;
});
