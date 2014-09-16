module.exports = function(grunt) {
  return {
    js: {
      files: ['index.js'],
      tasks: ['jshint', 'browserify:release']
    },
    static: {
      files: ['public/**/*'],
      tasks: ['copy']
    },
    options: {
      livereload: 35729
    }
  };
};
