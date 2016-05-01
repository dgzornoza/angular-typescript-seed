var gulp = require("gulp");
var debug = require("gulp-debug");
var postcss = require("gulp-postcss");

// publish third-party task
var publishThirdparty = require("./tools/tasks/gulp-publish-thirdparty");

// compile typescript task
var compileTypescript = require("./tools/tasks/gulp-typescript");




//gulp.task('default', ['ts-lint', 'compile-ts']);
