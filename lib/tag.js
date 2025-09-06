"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
var Tag = exports["default"] = /*#__PURE__*/function () {
  function Tag(renderer) {
    var _this = this;
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Tag);
    this.renderer = renderer;
    this.CLOSED_BY = [];
    this.SELF_CLOSE = false;
    this.STRIP_INNER = false;
    this.STRIP_OUTER = false;
    this.DISCARD_TEXT = false;
    this.name = settings.name || null;
    this.parent = settings.parent || null;
    this.text = settings.text || '';
    this.params = {};
    this.children = [];
    this.props = settings.props || {};
    if (this.parent) {
      this.parent.children.push(this);
    }
    settings.params = settings.params || [];
    settings.params.forEach(function (item) {
      if (item.length > 1 && item[1]) {
        _this.params[item[0]] = item[1];
      }
    });
  }
  return _createClass(Tag, [{
    key: "getComponents",
    value: function getComponents() {
      var _this2 = this;
      var components = [];
      if (this.text && this.text.length) {
        // todo linkify and emotion
        components.push(this.text);
      }
      this.children.forEach(function (child) {
        if (!(_this2.DISCARD_TEXT && child.name === null)) {
          var childComponents = child.toReact();
          components.push(childComponents);
        }
      });
      return _react["default"].Children.toArray(components);
    }
  }, {
    key: "getContent",
    value: function getContent() {
      var _this3 = this;
      var raw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var pieces = [];
      var text;
      var content;
      if (this.text && this.text.length) {
        text = this.renderer.escape(this.text);
        if (!raw) {
          if (this.renderer.options.linkify) {
            text = this.renderer.linkify(text);
          }
          text = this.renderer.cosmeticReplace(text.replace(_constants.NEWLINE_RE, _constants.LINE_BREAK));
        }
        pieces.push(text);
      }
      this.children.forEach(function (child) {
        if (raw) {
          pieces.push(child.toText());
        } else {
          if (!(_this3.DISCARD_TEXT && child.name === null)) {
            var childPieces = child.toHTML();
            if (typeof childPieces === 'string') {
              pieces.push(childPieces);
            } else {
              pieces.push.apply(pieces, _toConsumableArray(childPieces));
            }
          }
        }
      });
      content = pieces.join('');
      if (!raw && this.STRIP_INNER) {
        content = this.renderer.strip(content);
        while (content.slice(0, _constants.LINE_BREAK.length) === _constants.LINE_BREAK) {
          content = content.slice(_constants.LINE_BREAK.length);
        }
        while (content.slice(-_constants.LINE_BREAK.length) === _constants.LINE_BREAK) {
          content = content.slice(0, -_constants.LINE_BREAK.length);
        }
        content = this.renderer.strip(content);
      }
      return content;
    }
  }, {
    key: "toText",
    value: function toText() {
      var _this4 = this;
      var contentAsHTML = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var pieces = [];
      if (this.name !== null) {
        if (this.params.length) {
          var params = Object.keys(this.params).map(function (k) {
            return "".concat(k, "=").concat(_this4.params[k]);
          }).join(' ');
          if (this.params[this.name]) {
            pieces.push("[".concat(params, "]"));
          } else {
            pieces.push("[".concat(this.name, " ").concat(params, "]"));
          }
        } else {
          pieces.push("[".concat(this.name, "]"));
        }
      }
      pieces.push(this.getContent(!contentAsHTML));
      if (this.name !== null && this.CLOSED_BY.indexOf(this.name) === -1) {
        pieces.push("[/".concat(this.name, "]"));
      }
      return pieces.join('');
    }
  }, {
    key: "toHTML",
    value: function toHTML() {
      var pieces = this.toText(true);
      return typeof pieces === 'string' ? pieces : pieces.join('');
    }
  }, {
    key: "toReact",
    value: function toReact() {
      return _react["default"].Children.toArray(this.getComponents());
    }
  }, {
    key: "tagSettings",
    value: function tagSettings() {
      return this.props && this.props.tags && this.props.tags[this.name] || {};
    }
  }]);
}();