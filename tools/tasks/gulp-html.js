// -----------------------------------------------
// Task for manage html project files
'use strict';

var gulp = require("gulp");
var html5Lint = require("gulp-html5-lint");

var tasksConfig = require("./gulp-config");

/**
 * lint and build html files
 */
gulp.task("build-html", ["lint-html5"], function () {
    return build();
});

/**
 * lint html5 source code
 */
gulp.task("lint-html5", function () {
    return lint();
});

function build()
{
    // send html to output folder
    gulp.src(tasksConfig.sourceHtmlFiles)
    .pipe(gulp.dest(tasksConfig.outputFolder));
}

function lint()
{
    return gulp.src(tasksConfig.sourceHtmlFiles)
    .pipe(html5Lint());
};
