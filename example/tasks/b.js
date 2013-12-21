module.exports = function(gulp) {
  gulp.task('example-b', ['son', 'global'], function() {
    console.log('example-b');
  });
};
