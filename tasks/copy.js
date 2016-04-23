module.exports = function(grunt) {
  return {
    public: {
      src: './example/index.html',
      dest: './example/dist/index.html'
    },
    style: {
      src: './lib/d3-concentric-circles.css',
      dest: './example/dist/d3-concentric-circles.css'
    }
  };
};
