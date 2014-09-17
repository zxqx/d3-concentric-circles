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
      expand: true,
      cwd: './style',
      src: '**',
      dest: './dist/'
    }
  };
};
