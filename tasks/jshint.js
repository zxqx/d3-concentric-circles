module.exports = function(grunt) {
  return {
    grunt: ['Gruntfile.js'],
    app: ['index.js'],

    options: { jshintrc: '.jshintrc' }
  };
};
