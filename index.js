var fs = require('fs');
var path = require('path');
var glob = require('glob');
var exists = fs.existsSync;
var stat = fs.lstatSync;
var join = path.join;
var resolve = path.resolve;
var isWindows = process.platform === 'win32';
var splitter = isWindows ? ';' : ':';

module.exports = function(gulp) {
  var tm = new TaskManager(gulp);

  function loadTasks(moduleName) {
    tm.load(moduleName);
  }

  gulp.loadTasks = loadTasks;
  return loadTasks;
};

function TaskManager(gulp) {
  // global path
  this.globalPath = process.env['NODE_PATH'] ?
    process.env['NODE_PATH'].split(splitter) : [];
  this.tasks = [];
  this.gulp = gulp;
}

TaskManager.prototype.load = function(moduleName) {
  var gulp = this.gulp;
  this.lookup(moduleName);
  this.tasks.forEach(function(task) {
    require(task)(gulp);
  });
  this.tasks = [];
};

TaskManager.prototype.lookup = function(moduleName) {
  // set current working directory if moduleName doesn't exist
  if (!moduleName) moduleName = process.cwd();

  if (exists(moduleName)) {
    var s = stat(moduleName);

    // .loadTasks('path/to/tasks/task.js')
    if (s.isFile()) {
      this.tasks.push(moduleName);
      return;
    }

    // .loadTasks('path/to/module')
    if (s.isDirectory()) {
      this.lookupTasks(resolve(moduleName));
      this.lookupDeps(resolve(moduleName));
    }
  }

  // .loadTasks('moduleName')
  // lookup path
  // 1. global path
  // 2. node_modules path
  var paths = this.globalPath.concat(resolve('node_modules'));
  paths.forEach(function(p) {
    p = join(p, moduleName);
    if (exists(p)) {
      this.lookupTasks(p);
      this.lookupDeps(p);
    }
  }.bind(this));
};

TaskManager.prototype.lookupTasks = function(modulePath) {
  var tasksPath = join(modulePath, 'tasks');
  var tasks = glob.sync(tasksPath + '/**/*.js');
  this.tasks = this.tasks.concat(tasks);
};

TaskManager.prototype.lookupDeps = function(modulePath) {
  if (!fs.existsSync(modulePath)) return;

  var pkg = require(join(modulePath, 'package.json'));
  if (pkg && pkg.dependencies) {
    Object.keys(pkg.dependencies).filter(function(f) {
      return /^gulp-/.test(f);
    }).forEach(function (deps) {
      var depsPath = join(modulePath, 'node_modules', deps);
      this.lookupTasks(depsPath);
      this.lookupDeps(depsPath);
    }.bind(this));
  }
};
