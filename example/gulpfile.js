var gulp = require('gulp');
require('..')(gulp);

// load tasks and submodule in package
gulp.loadTasks(process.cwd());

// load global tasks
gulp.loadTasks('gulp-global');

gulp.task('default', function() {
  // see task dependencies
  gulp.run('example-a');
});
