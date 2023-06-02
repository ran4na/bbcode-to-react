
export const NEWLINE_RE = /\r?\n/g;
export const LINE_BREAK = '<br />';

export const SPACE_RE = /^\s*$/;
export const TOKEN_RE = /(\[\/?.+?\])/;
export const START_NEWLINE_RE = /^\r?\n/;

export const ESCAPE_RE = /[&<>"]/g;
export const ESCAPE_DICT = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

export const URL_RE = /\b((?:([\w-]+):(\/{1,3})|www[.])(?:(?:(?:[^\s&()]|&amp;|&quot;)*(?:[^!"#$%&'()*+,.:;<=>?@\[\]^`{|}~\s]))|(?:\((?:[^\s&()]|&amp;|&quot;)*\)))+)/g;

export const COSMETIC_DICT = {
  '--': '&ndash;',
  '---': '&mdash;',
  '...': '&#8230;',
  '(c)': '&copy;',
  '(reg)': '&reg;',
  '(tm)': '&trade;',
};

export const COSMETIC_RE = /--|---|\.\.\.|\(c\)|\(reg\)|\(tm\)/;

export const DEFAULT_FONT_SIZES = {
  'small': '0.8em',
  'medium': '1.0em',
  'large': '1.2em',
}

export const DEFAULT_PROPS = {
  fontSizes: DEFAULT_FONT_SIZES,
  tags: {},//used for future tag specific settings
}