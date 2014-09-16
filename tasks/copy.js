module.exports = function(grunt) {
  var releasePath = grunt.config.get('releasePath');

  var webRootSourcePath = './public';

  return {
    release: {
      expand: true,
      cwd: webRootSourcePath,
      src: '**',
      dest: releasePath
    }
  };
};
