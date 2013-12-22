# Gulp-load

[![Build Status](https://travis-ci.org/popomore/gulp-load.png?branch=master)](https://travis-ci.org/popomore/gulp-load)
[![Coverage Status](https://coveralls.io/repos/popomore/gulp-load/badge.png)](https://coveralls.io/r/popomore/gulp-load)

Load gulp task just like grunt.loadTasks.

If you want to load plugins automatically, [gulp-load-tasks](https://github.com/jackfranklin/gulp-load-tasks) will be a good choice.

---

## Install

Install gulp-load

```
$ npm install --save gulp-load
```

## Usage

Require gulp-load in your gulpfile

```
var gulp = require('gulp');
require('gulp-load')(gulp);

// load tasks from tasks directory and
// dependencies of start with `gulp-` in package.json
gulp.loadTasks(__dirname);

// run tasks which you loaded
gulp.tasks('default', function() {
  gulp.run('your_task');
})
```

## API

Gulp-load will return a function that is same as `gulp.loadTasks`.

```
var loadTasks = require('gulp-load')(gulp);
loadTasks === gulp.loadTasks // return true
```

LoadTasks can load single file.

```
gulp.loadTasks('path/to/task.js');
```

LoadTasks can load specified module.

```
gulp.loadTasks('path/to/module');
```

LoadTasks can load by module's name. It will lookup from `NODE_PATH` and node_modules of current module.

```
gulp.loadTasks('gulp-concat');
```

**If load a module, it will load task from tasks directory of current module, and if gulp plugins (start with gulp-) exists in dependencies of package.json, then it will load each plugin as a module.**

## License

MIT
