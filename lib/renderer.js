"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("./constants");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Renderer = exports["default"] = /*#__PURE__*/function () {
  function Renderer(options) {
    _classCallCheck(this, Renderer);
    this.options = _extends({
      linkify: false
    }, options);
    this.contexts = [];
  }
  return _createClass(Renderer, [{
    key: "context",
    value: function context(_context, func) {
      var newOptions = _extends({}, this.options, _context);
      this.contexts.push(this.options);
      this.options = newOptions;
      var v = func();
      this.options = this.contexts.pop();
      return v;
    }
  }, {
    key: "escape",
    value: function escape(value) {
      // Escapes a string so it is valid within XML or XHTML
      return value.replace(_constants.ESCAPE_RE, function (match) {
        return _constants.ESCAPE_DICT[match];
      });
    }
  }, {
    key: "linkify",
    value: function linkify(value) {
      return value.replace(_constants.URL_RE, function () {
        var url = arguments.length <= 1 ? undefined : arguments[1];
        var proto = arguments.length <= 2 ? undefined : arguments[2];
        if (proto && ['http', 'https'].indexOf(proto) === -1) {
          return url; // bad protocol, no linkify
        }
        var href = proto ? url : "http://".concat(url);
        return "<a href=\"".concat(href, "\" target=\"_blank\">").concat(url, "</a>");
      });
    }
  }, {
    key: "strip",
    value: function strip(text) {
      return text.replace(/^\s+|\s+$/g, '');
    }
  }, {
    key: "cosmeticReplace",
    value: function cosmeticReplace(value) {
      return value.replace(_constants.COSMETIC_RE, function () {
        var item = arguments.length <= 0 ? undefined : arguments[0];
        return _constants.COSMETIC_DICT[item] || item;
      });
    }
  }, {
    key: "htmlAttributes",
    value: function htmlAttributes(attributes) {
      if (!attributes) {
        return '';
      }
      return Object.keys(attributes).map(function (k) {
        return "".concat(k, "=\"").concat(attributes[k], "\"");
      }).join(' ');
    }
  }]);
}();