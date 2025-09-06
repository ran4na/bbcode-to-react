"use strict";

var _parser = _interopRequireDefault(require("./parser"));
var _tag = _interopRequireDefault(require("./tag"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// export default new Parser();

// export {
//   Parser,
//   Tag
// };

module.exports = new _parser["default"]();
module.exports.Parser = _parser["default"];
module.exports.Tag = _tag["default"];