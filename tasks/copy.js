module.exports = function(grunt) {
  var webRootSourcePath = './public';

  return {
    public: {
      expand: true,
      cwd: webRootSourcePath,
      src: '**',
      dest: './example/'
    },
    style: {
      src: './lib/d3-concentric-circles.css',
      dest: './dist/'
    }
  };
};
