"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _constants = require("./constants");
var _tags = _interopRequireDefault(require("./tags"));
var _tag = _interopRequireDefault(require("./tag"));
var _renderer = _interopRequireDefault(require("./renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/parser.coffee
var Parser = exports["default"] = /*#__PURE__*/function () {
  function Parser() {
    var _this = this;
    var allowedTags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, Parser);
    this.tags = {};
    this.props = _constants.DEFAULT_PROPS;
    if (!allowedTags) {
      this.tags = _tags["default"];
    } else {
      allowedTags.forEach(function (name) {
        if (_tags["default"][name]) {
          _this.tags[name] = _tags["default"][name];
        }
      });
    }
    this.renderer = new _renderer["default"]();
  }
  return _createClass(Parser, [{
    key: "setProps",
    value: function setProps(props) {
      this.props = _objectSpread(_objectSpread({}, this.props), props);
    }
  }, {
    key: "registerTag",
    value: function registerTag(name, tag) {
      this.tags[name] = tag;
    }
  }, {
    key: "parseParams",
    value: function parseParams(token) {
      var params = [];
      function addParam(name, value) {
        if (name) {
          var n = name.trim();
          // ignore on* events attribute
          if (n.length && n.toLowerCase().indexOf('on') !== 0) {
            params.push([n, value]);
          }
        }
      }
      if (token) {
        var key = [];
        var target = key;
        var value = [];
        var terminate = ' ';
        var skipNext = false;
        Array.from(token).forEach(function (c) {
          if (skipNext) {
            skipNext = false;
          } else if (target === key && c === '=') {
            target = value;
          } else if (target === key && c === ':') {
            target = value;
          } else if (!value.length && c === '"') {
            terminate = c;
          } else if (c !== terminate) {
            target.push(c);
          } else {
            addParam(key.join(''), value.join(''));
            if (!_constants.SPACE_RE.test(terminate)) {
              skipNext = true;
            }
            target = key = [];
            value = [];
            terminate = ' ';
          }
        });
        addParam(key.join(''), value.join(''));
      }
      return params;
    }
  }, {
    key: "createTextNode",
    value: function createTextNode(parent, text) {
      var ref = parent.children.slice(-1)[0];
      //console.log('ref', ref, text)
      if (ref != null && ref.STRIP_OUTER) {
        text = text.replace(_constants.START_NEWLINE_RE, '');
      }
      return new _tag["default"](this.renderer, {
        text: text,
        parent: parent
      });
    }
  }, {
    key: "parse",
    value: function parse(input) {
      var root = new _tag["default"](this.renderer);
      var tokens = input.split(_constants.TOKEN_RE);
      var current = root;
      var token = null;
      while (tokens.length) {
        token = tokens.shift();
        if (!token.length) {
          continue;
        }
        if (token.match(_constants.TOKEN_RE)) {
          var params = this.parseParams(token.slice(1, -1));
          var tagName = params[0][0].toLowerCase();
          if (current.CLOSED_BY.indexOf(tagName) > -1) {
            tokens.unshift(token);
            tagName = "/".concat(current.name);
            params = [];
          }
          if (tagName[0] === '/') {
            tagName = tagName.slice(1);
            if (!this.tags[tagName]) {
              this.createTextNode(current, token);
              continue;
            }
            if (current.name === tagName) {
              current = current.parent;
            }
          } else {
            var cls = this.tags[tagName];
            if (!cls) {
              this.createTextNode(current, token);
              continue;
            }
            var tag = new cls(this.renderer, {
              name: tagName,
              parent: current,
              params: params,
              props: this.props
            });
            if (!tag.SELF_CLOSE && (tag.CLOSED_BY.indexOf(tagName) < 0 || current.name !== tagName)) {
              current = tag;
            }
          }
        } else {
          this.createTextNode(current, token);
        }
      }
      return root;
    }
  }, {
    key: "toHTML",
    value: function toHTML(input) {
      return this.parse(input).toHTML();
    }
  }, {
    key: "toReact",
    value: function toReact(input) {
      return this.parse(input).toReact();
    }
  }]);
}();