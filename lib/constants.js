"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URL_RE = exports.TOKEN_RE = exports.START_NEWLINE_RE = exports.SPACE_RE = exports.NEWLINE_RE = exports.LINE_BREAK = exports.ESCAPE_RE = exports.ESCAPE_DICT = exports.DEFAULT_PROPS = exports.DEFAULT_FONT_SIZES = exports.COSMETIC_RE = exports.COSMETIC_DICT = void 0;
var NEWLINE_RE = exports.NEWLINE_RE = /\r?\n/g;
var LINE_BREAK = exports.LINE_BREAK = '<br />';
var SPACE_RE = exports.SPACE_RE = /^\s*$/;
var TOKEN_RE = exports.TOKEN_RE = /(\[\/?.+?\])/;
var START_NEWLINE_RE = exports.START_NEWLINE_RE = /^\r?\n/;
var ESCAPE_RE = exports.ESCAPE_RE = /[&<>"]/g;
var ESCAPE_DICT = exports.ESCAPE_DICT = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};
var URL_RE = exports.URL_RE = /\b((?:([\w-]+):(\/{1,3})|www[.])(?:(?:(?:[^\s&()]|&amp;|&quot;)*(?:[^!"#$%&'()*+,.:;<=>?@\[\]^`{|}~\s]))|(?:\((?:[^\s&()]|&amp;|&quot;)*\)))+)/g;
var COSMETIC_DICT = exports.COSMETIC_DICT = {
  '--': '&ndash;',
  '---': '&mdash;',
  '...': '&#8230;',
  '(c)': '&copy;',
  '(reg)': '&reg;',
  '(tm)': '&trade;'
};
var COSMETIC_RE = exports.COSMETIC_RE = /--|---|\.\.\.|\(c\)|\(reg\)|\(tm\)/;
var DEFAULT_FONT_SIZES = exports.DEFAULT_FONT_SIZES = {
  'small': '0.8em',
  'medium': '1.0em',
  'large': '1.2em'
};
var DEFAULT_PROPS = exports.DEFAULT_PROPS = {
  fontSizes: DEFAULT_FONT_SIZES,
  tags: {} //used for future tag specific settings
};