/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="amd" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define([], function() {

  /* Native method shortcuts for methods with the same name as other `lodash` methods */
  var nativeMin = Math.min;

  /**
   * Checks if `string` starts with a given target string.
   *
   * @static
   * @memberOf _
   * @category Strings
   * @param {string} [string=''] The string to search.
   * @param {string} [target] The string to search for.
   * @param {number} [position=0] The position to search from.
   * @returns {boolean} Returns `true` if the given string starts with the
   *  target string, else `false`.
   * @example
   *
   * _.startsWith('abc', 'a');
   * // => true
   *
   * _.startsWith('abc', 'b');
   * // => false
   *
   * _.startsWith('abc', 'b', 1);
   * // => true
   */
  function startsWith(string, target, position) {
    string = string == null ? '' : String(string);
    position = typeof position == 'undefined' ? 0 : nativeMin(position < 0 ? 0 : (+position || 0), string.length);
    return string.lastIndexOf(target, position) == position;
  }

  return startsWith;
});
