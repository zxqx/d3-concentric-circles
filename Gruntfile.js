module.exports = function(grunt) {

  // Load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Configs
  grunt.config('releasePath'    , './dist/');
  grunt.config('jsOutput'       , 'd3-concentric-circles.js');
  grunt.config('jsVendorOutput' , 'vendor.js');

  // Load task configs
  grunt.initConfig({
    clean      : require('./tasks/clean.js')(grunt),
    browserify : require('./tasks/browserify.js')(grunt),
    copy       : require('./tasks/copy.js')(grunt),
    jshint     : require('./tasks/jshint.js')(grunt),
    watch      : require('./tasks/watch.js')(grunt)
  });

  // Release
  grunt.registerTask('build:standalone', [
    'browserify:release',
    'jshint'
  ]);

  grunt.registerTask('build:example', [
    'clean',
    'browserify:release',
    'browserify:releaseVendor',
    'copy',
    'jshint'
  ]);

  grunt.registerTask('default', 'build');
};
