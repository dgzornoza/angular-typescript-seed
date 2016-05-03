// -----------------------------------------------
// Task for manage css project files
'use strict';

var gulp = require("gulp");
var postcss = require("gulp-postcss");

var tasksConfig = require("./gulp-config");

/**
 * lint and build css files
 */
gulp.task("build-css", function () {
    return build();
});

/**
 * lint css source code
 */
gulp.task("lint-css", function () {
    return lint();
});

function build()
{
    // send css to output folder
    gulp.src(tasksConfig.sourceCssFiles)
    .pipe(gulp.dest(tasksConfig.outputFolder));
}

function lint()
{

};
