define([
    "Main",
    "Logging",
    "lib/lodash-amd/modern/objects/merge"
], function(Main, Logging, _merge) {

    "use strict";

    var Widget = function() {
        this.prefix = "Widget";
        this.options = {
        };
    };

    //Widget.prototype = new Main();
    //Widget.prototype.constructor = Widget;

    /**
     * Initializes the widget instance. Sets $widget, the prefix used for
     * logging and merges the given options into the default ones. Use the
     * "prefix" option to set a name for your widget. In case the random suffix
     * on the prefix is not wanted the "randomize_prefix" option should be set
     * to false.
     *
     * @param dom_element DOM element that this widget applies to
     * @param options that should be merged over the default options
     * @param log_tracing_enabled enable trace logging of all widget functions
     */
    Widget.prototype.init = function(dom_element, options, log_tracing_enabled) {
        this.prefix = options.prefix || this.prefix;
        if (!options.randomize_prefix || options.randomize_prefix === true || options.prefix === "") {
            this.prefix += "#" + this.getRandomString();
        }
        delete(options.prefix);
        delete(options.randomize_prefix);

        Logging.applyLogging(this, this.prefix, log_tracing_enabled);

        this.$widget = $(dom_element);

        if (!this.$widget) {
            this.logError("Core/Widget behaviour not initialized as no valid DOM element was given.");
            return;
        }

        this.addOptions(options);
    };

    /**
     * @return string prefix used for logging etc. for this widget instance
     */
    Widget.prototype.getPrefix = function() {
        return this.prefix;
    };

    /**
     * @param str string to escape for usage in a regex
     *
     * @return string suitable for usage in a javascript regular expression
     */
    Widget.prototype.escapeRegExp = function(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };

    /**
     * @return string with 8 chars (lowercase chars and digits)
     */
    Widget.prototype.getRandomString = function() {
        return (Math.random().toString(36)+'00000000000000000').slice(2, 10);
    };

    /**
     * Merges all given options with the default options.
     */
    Widget.prototype.addOptions = function() {
        var args = Array.prototype.slice.call(arguments);
        for (var i=0;i < args.length;i++) {
            this.options = _merge(this.options, args[i]);
        }
    };

    return Widget;

}, function (error) {
    // error has err.requireType (timeout, nodefine, scripterror)
    // and error.requireModules (an array of module ids/paths)
});

