// -----------------------------------------------
// Task for manage mocks files
'use strict';

var gulp = require("gulp");

var tasksConfig = require("./gulp-config");

/**
 * build mocks files
 */
gulp.task("build-mocks", function () {
    return build();
});


function build()
{
    // send html to output folder
    gulp.src(tasksConfig.sourceMocksFiles)
    .pipe(gulp.dest(tasksConfig.outputMocksFolder));
}
