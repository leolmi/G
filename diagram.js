(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    factory();
  }
})(this, function() {
  "use strict";

  const _global = function () {
    // some use content security policy to disable eval
    try {
      return Function('return this')() || (42, eval)('this');
    } catch (e) {
      // every global should have circular reference
      // used for checking if someone writes var window = {}; var self = {}
      return typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof global === 'object' && global.global === global ? global : this;
    }
  }();

  const Diagram = {


  };

  _global.Diagram = Diagram;
  if (typeof module !== 'undefined') {
    module.exports = Diagram;
  }
});