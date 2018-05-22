module.exports = [
  function(context, request, callback) {
    switch (request) {
      // For Node compatibility
      case 'fs':
      case 'net':
        return callback(null, 'null');
      case 'tty':
        return callback(null, '{isatty(){return false}}');
      case 'module':
        return callback(null, '{builtinModules:[]}');

      case 'any-promise':
      case 'bluebird':
      case 'Promise':
        console.log(request);
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
        return callback(null, 'Object.keys');
      default:
        return callback();
    }
  },
];
