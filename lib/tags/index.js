"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _tag = _interopRequireDefault(require("../tag"));
var _code = _interopRequireDefault(require("./code"));
var _image = _interopRequireDefault(require("./image"));
var _hr = _interopRequireDefault(require("./hr"));
var _size = _interopRequireDefault(require("./size"));
var _center = _interopRequireDefault(require("./center"));
var _right = _interopRequireDefault(require("./right"));
var _color = _interopRequireDefault(require("./color"));
var _list = _interopRequireDefault(require("./list"));
var _item = _interopRequireDefault(require("./item"));
var _quote = _interopRequireDefault(require("./quote"));
var _link = _interopRequireDefault(require("./link"));
var _simple = _interopRequireDefault(require("./simple"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = {
  b: (0, _simple["default"])('strong'),
  i: (0, _simple["default"])('em'),
  u: (0, _simple["default"])('u'),
  s: (0, _simple["default"])('strike'),
  h1: (0, _simple["default"])('h1', {
    STRIP_OUTER: true
  }),
  h2: (0, _simple["default"])('h2', {
    STRIP_OUTER: true
  }),
  h3: (0, _simple["default"])('h3', {
    STRIP_OUTER: true
  }),
  h4: (0, _simple["default"])('h4', {
    STRIP_OUTER: true
  }),
  h5: (0, _simple["default"])('h5', {
    STRIP_OUTER: true
  }),
  h6: (0, _simple["default"])('h6', {
    STRIP_OUTER: true
  }),
  pre: (0, _simple["default"])('pre'),
  table: (0, _simple["default"])('table', {
    DISCARD_TEXT: true
  }),
  thead: (0, _simple["default"])('thead', {
    DISCARD_TEXT: true
  }),
  tbody: (0, _simple["default"])('tbody', {
    DISCARD_TEXT: true
  }),
  tr: (0, _simple["default"])('tr', {
    DISCARD_TEXT: true
  }),
  th: (0, _simple["default"])('th'),
  td: (0, _simple["default"])('td'),
  code: _code["default"],
  img: _image["default"],
  hr: _hr["default"],
  size: _size["default"],
  center: _center["default"],
  right: _right["default"],
  color: _color["default"],
  list: _list["default"],
  '*': _item["default"],
  quote: _quote["default"],
  url: _link["default"],
  link: _link["default"],
  email: _link["default"]
};