module.exports = function(gulp) {
  gulp.task('example-a', ['example-b'], function() {
    console.log('example-a');
  });
};
