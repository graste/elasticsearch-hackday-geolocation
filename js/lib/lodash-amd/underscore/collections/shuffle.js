/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize underscore exports="amd" -o ./underscore/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/baseEach', '../internals/baseRandom'], function(baseEach, baseRandom) {

  /**
   * Creates an array of shuffled values, using a version of the Fisher-Yates
   * shuffle. See [Wikipedia](http://en.wikipedia.org/wiki/Fisher-Yates_shuffle)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to shuffle.
   * @returns {Array} Returns the new shuffled array.
   * @example
   *
   * _.shuffle([1, 2, 3, 4]);
   * // => [4, 1, 3, 2]
   */
  function shuffle(collection) {
    var index = -1,
        length = collection && collection.length,
        result = Array(length < 0 ? 0 : length >>> 0);

    baseEach(collection, function(value) {
      var rand = baseRandom(0, ++index);
      result[index] = result[rand];
      result[rand] = value;
    });
    return result;
  }

  return shuffle;
});
