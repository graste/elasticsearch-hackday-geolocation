define([
    "jquery",
    "jsb"
], function() {

    "use strict";

    var Main = function(dom_element, options) {
        if (!dom_element) {
            return;
        }

        if (window.console && console.log) {
            console.log("Core/Main behaviour applied.");
        }
    };

    return Main;

}, function (err) {
// err has err.requireType (timeout, nodefine, scripterror)
// and err.requireModules (an array of module Ids/paths)
});
