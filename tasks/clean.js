module.exports = function(grunt) {
  var releasePath = grunt.config.get('releasePath');

  return {
    release: releasePath
  };
};
