const base122 = require('./vendor/base122');

exports.encode = function encode(data) {
  return base122.encode(data);
};
exports.decode = function decode(encoded) {
  return base122.decode(encoded);
};
