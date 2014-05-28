/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="amd" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/createCompounder'], function(createCompounder) {

  /**
   * Converts `string` to kebab case (a.k.a. spinal case).
   * See [Wikipedia](http://en.wikipedia.org/wiki/Letter_case#Computers) for
   * more details.
   *
   * @static
   * @memberOf _
   * @category Strings
   * @param {string} [string=''] The string to kebab case.
   * @returns {string} Returns the kebab cased string.
   * @example
   *
   * _.kebabCase('Hello world');
   * // => 'hello-world'
   *
   * _.kebabCase('helloWorld');
   * // => 'hello-world'
   *
   * _.kebabCase('__hello_world__');
   * // => 'hello-world'
   */
  var kebabCase = createCompounder(function(result, word, index) {
    return result + (index ? '-' : '') + word.toLowerCase();
  });

  return kebabCase;
});
