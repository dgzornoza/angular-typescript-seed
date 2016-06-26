// -----------------------------------------------
// Task for manage html project files
'use strict';

var gulp = require("gulp");

var tasksConfig = require("./gulp-config");

/**
 * build html files
 */
gulp.task("build-html", function () {
    return build();
});


function build()
{
    // send html to output folder
    gulp.src(tasksConfig.sourceHtmlFiles)
    .pipe(gulp.dest(tasksConfig.outputFolder));

}
