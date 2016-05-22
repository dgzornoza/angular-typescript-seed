'use strict';
var gulp = require("gulp");
var debug = require("gulp-debug");
var del = require("del");

// Custom tasks modules
var tasksConfig = require("./tools/tasks/gulp-config");
require("./tools/tasks/gulp-thirdparty");
require("./tools/tasks/gulp-typescript");
require("./tools/tasks/gulp-html");
require("./tools/tasks/gulp-css");


/**
 * cleand output and build all project in output directory
 */
gulp.task("rebuild-debug", ["clean-output", "build-debug"]);

/**
 * Build all project in output directory
 */
gulp.task("build-debug", ["publish-thirdparty", "build-ts-debug", "build-html"]);

/**
 * watch source files
 */
gulp.task("watch-source", function() {
        gulp.watch([tasksConfig.sourceScriptFiles], ["build-ts-debug"]);
        gulp.watch([tasksConfig.sourceHtmlFiles], ["build-html"]);
        //gulp.watch([tasksConfig.sourceCssFiles], ["postcss"]);
});

/**
 * clean output files
 */
gulp.task("clean-output", function() {

    // delete output
    del.sync([
        tasksConfig.outputAppFolder,
        tasksConfig.outputLibFolder,
        tasksConfig.outputCssFolder,
        tasksConfig.outputFontsFolder,
        tasksConfig.outputFolder + "index.html"
        ]);
});
