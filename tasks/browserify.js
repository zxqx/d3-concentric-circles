var path = require('path');

module.exports = function(grunt) {
  var releasePath    = grunt.config.get('releasePath');
  var jsOutput       = grunt.config.get('jsOutput');
  var jsVendorOutput = grunt.config.get('jsVendorOutput');

  var jsReleasePath       = path.join(releasePath, jsOutput);
  var jsVendorReleasePath = path.join(releasePath, jsVendorOutput);

  var pkg           = grunt.file.readJSON('package.json');
  var appEntryPoint = pkg.main;
  var vendorLibs    = Object.keys(pkg.dependencies);

  return {
    release: {
      src: appEntryPoint,
      dest: jsReleasePath,
      options: {
        browserifyOptions: { debug: true },
        external: vendorLibs
      }
    },
    releaseVendor: {
      src: [],
      dest: jsVendorReleasePath,
      options: {
        require: vendorLibs
      }
    }
  };
};
