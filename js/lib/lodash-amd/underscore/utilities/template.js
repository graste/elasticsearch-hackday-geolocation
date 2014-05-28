/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize underscore exports="amd" -o ./underscore/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../objects/defaults', './escape', './templateSettings'], function(defaults, escape, templateSettings) {

  /** Used as a safe reference for `undefined` in pre ES5 environments */
  var undefined;

  /** Used to ensure capturing order of template delimiters */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Used to escape characters for inclusion in compiled string literals */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /**
   * Used by `_.template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Compiles a function from `source` using the `varNames` and `varValues`
   * pairs to import free variables into the compiled function. If `sourceURL`
   * is provided it is used as the sourceURL for the compiled function.
   *
   * @private
   * @param {string} source The source to compile.
   * @param {Array} varNames An array of free variable names.
   * @param {Array} varValues An array of free variable values.
   * @param {string} [sourceURL=''] The sourceURL of the source.
   * @returns {Function} Returns the compiled function.
   */
  function compileFunction(source, varNames, varValues, sourceURL) {
    sourceURL = sourceURL ? ('\n/*\n//# sourceURL=' + sourceURL + '\n*/') : '';
    try {
      // provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates
      var result = Function(varNames, 'return ' + source + sourceURL).apply(undefined, varValues);
      result.source = source;
    } catch(e) {
      e.source = source;
      throw e;
    }
    return result;
  }

  /**
   * Creates a compiled template function that can interpolate data properties
   * in "interpolate" delimiters, HTML-escaped interpolated data properties in
   * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. If
   * a data object is provided the interpolated template string is returned.
   * Data properties may be accessed as free variables in the template. If a
   * settings object is provided it overrides `_.templateSettings` for the
   * template.
   *
   * Note: In the development build, `_.template` utilizes sourceURLs for easier debugging.
   * See the [HTML5 Rocks article on sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
   * for more details.
   *
   * For more information on precompiling templates see
   * [Lo-Dash's custom builds documentation](http://lodash.com/custom-builds).
   *
   * For more information on Chrome extension sandboxes see
   * [Chrome's extensions documentation](http://developer.chrome.com/stable/extensions/sandboxingEval.html).
   *
   * @static
   * @memberOf _
   * @category Strings
   * @param {string} [string=''] The template string.
   * @param {Object} [data] The data object used to populate the template string.
   * @param {Object} [options] The options object.
   * @param {RegExp} [options.escape] The HTML "escape" delimiter.
   * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
   * @param {Object} [options.imports] An object to import into the template as free variables.
   * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
   * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
   * @param {string} [options.variable] The data object variable name.
   * @returns {Function|string} Returns the interpolated string if a data object
   *  is provided, else the compiled template function.
   * @example
   *
   * // using the "interpolate" delimiter to create a compiled template
   * var compiled = _.template('hello <%= name %>');
   * compiled({ 'name': 'fred' });
   * // => 'hello fred'
   *
   * // using the HTML "escape" delimiter to escape data property values
   * _.template('<b><%- value %></b>', { 'value': '<script>' });
   * // => '<b>&lt;script&gt;</b>'
   *
   * // using the "evaluate" delimiter to execute JavaScript and generate HTML
   * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
   * _.template(list, { 'people': ['fred', 'barney'] });
   * // => '<li>fred</li><li>barney</li>'
   *
   * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
   * _.template('hello ${ name }', { 'name': 'pebbles' });
   * // => 'hello pebbles'
   *
   * // using the internal `print` function in "evaluate" delimiters
   * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
   * // => 'hello barney!'
   *
   * // using a custom template delimiters
   * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
   * _.template('hello {{ name }}!', { 'name': 'mustache' });
   * // => 'hello mustache!'
   *
   * // using the `imports` option to import jQuery
   * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
   * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
   * // => '<li>fred</li><li>barney</li>'
   *
   * // using the `sourceURL` option to specify a custom sourceURL for the template
   * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
   * compiled(data);
   * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
   *
   * // using the `variable` option to ensure a with-statement isn't used in the compiled template
   * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
   * compiled.source;
   * // => function(data) {
   *   var __t, __p = '', __e = _.escape;
   *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
   *   return __p;
   * }
   *
   * // using the `source` property to inline compiled templates for meaningful
   * // line numbers in error messages and a stack trace
   * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
   *   var JST = {\
   *     "main": ' + _.template(mainText).source + '\
   *   };\
   * ');
   */
  function template(string, data, options) {
    var _ = templateSettings.imports._,
        settings = _.templateSettings || templateSettings;

    string = String(string == null ? '' : string);
    options = defaults({}, options, settings);

    var index = 0,
        source = "__p += '",
        variable = options.variable;

    var reDelimiters = RegExp(
      (options.escape || reNoMatch).source + '|' +
      (options.interpolate || reNoMatch).source + '|' +
      (options.evaluate || reNoMatch).source + '|$'
    , 'g');

    string.replace(reDelimiters, function(match, escapeValue, interpolateValue, evaluateValue, offset) {
      source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
      if (escapeValue) {
        source += "' +\n_.escape(" + escapeValue + ") +\n'";
      }
      if (evaluateValue) {
        source += "';\n" + evaluateValue + ";\n__p += '";
      }
      if (interpolateValue) {
        source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
      }
      index = offset + match.length;
      return match;
    });

    source += "';\n";
    if (!variable) {
      source = 'with (obj || {}) {\n' + source + '\n}\n';
    }
    source = 'function(' + (variable || 'obj') + ') {\n' +
      "var __t, __p = '', __j = Array.prototype.join;\n" +
      "function print() { __p += __j.call(arguments, '') }\n" +
      source +
      'return __p\n}';

    var result = compileFunction(source, ['_'], [_]);
    return data ? result(data) : result;
  }

  return template;
});
