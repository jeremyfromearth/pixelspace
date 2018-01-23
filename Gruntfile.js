module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt)
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: false,
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-es2015-modules-amd']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'es6',
          src: ['*.js'],
          dest: './lib/es6',
          ext: '.js'
        }]
      }
    },
    watch: {
      babel: {
        files: 'es6/*.js',
        tasks: ['babel']
      }
    }
  });

  grunt.registerTask("default", [
    'babel',
  ]);
}
