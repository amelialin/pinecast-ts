module.exports = [
  function(context, request, callback) {
    switch (request) {
      // For Node compatibility
      case 'fs':
      case 'net':
        return callback(null, 'null');
      case 'tty':
        return callback(null, '{isatty:function() {}}');

      case 'bluebird':
      case 'any-promise':
        return callback(null, 'Promise');
      case 'function-bind':
        return callback(null, 'Function.prototype.bind');
      case 'is-array':
      case 'isarray':
        return callback(null, 'Array.isArray');
      case 'is-function':
        return callback(null, 'function(x) {return typeof x === "function";}');
      case 'object.assign':
      case 'object-assign':
        return callback(null, 'Object.assign');
      case 'object-keys':
        return callback(
          null,
          '(function() {var x = Object.keys.bind(Object); x.shim = x; return x;}())',
        );
      default:
        return callback();
    }
  },
];
