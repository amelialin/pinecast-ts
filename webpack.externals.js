module.exports = [
  function(context, request, callback) {
    switch (request) {
      // For Node compatibility
      case 'fs':
      case 'net':
        return callback(null, 'null');
      case 'tty':
        return callback(null, '@pinecast/externals/node/tty');
      case 'module':
        return callback(null, '{builtinModules:[]}');

      case 'any-promise':
      case 'bluebird':
      case 'Promise':
        console.log(request);
        return callback(null, '@pinecast/externals/Promise');
      case 'function-bind':
        return callback(null, '@pinecast/externals/FunctionBind');
      case 'is-array':
      case 'isarray':
        return callback(null, '@pinecast/externals/IsArray');
      case 'is-function':
        return callback(null, '@pinecast/externals/IsFunction');
      case 'object.assign':
      case 'object-assign':
        return callback(null, '@pinecast/externals/ObjectAssign');
      case 'object-keys':
        return callback(null, '@pinecast/externals/ObjectKeys');
      default:
        return callback();
    }
  },
];
