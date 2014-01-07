var gulp = require('gulp');
var load = require('..')(gulp);
var should = require('should');

describe('gulp-load', function() {
  it('two api', function() {
    load.should.be.eql(gulp.loadTasks);
  });

  it('load single file', function() {
    load(__dirname + '/task.js');
    should.exist(gulp.tasks['a']);
  });

  it('load specified module', function() {
    load(__dirname + '/gulp-module');
    should.exist(gulp.tasks['b']);
    should.exist(gulp.tasks['c']);
  });

  it('load global module', function() {
    load('gulp-load-global');
    should.exist(gulp.tasks['d']);
  });

  it('ignore when not exist', function() {
    (function () {
      load(__dirname + '/noexist');
    }).should.not.throw();
  });
});
