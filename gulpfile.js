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
require("./tools/tasks/gulp-mocks");



/**
 * cleand output and build all project in output directory
 */
gulp.task("rebuild-debug", ["clean-output", "build-debug"]);

/**
 * Build all project in output directory
 */
gulp.task("build-debug", ["publish-thirdparty", "build-ts-debug", "build-html", "build-mocks"]);

/**
 * Build all test project
 */
gulp.task("build-tests", ["build-ts-tests"]);


/**
 * watch source files
 */
gulp.task("watch-source", function() {
        gulp.watch([tasksConfig.sourceScriptFiles], ["build-ts-debug"]);
        gulp.watch([tasksConfig.sourceHtmlFiles], ["build-html"]);
        //gulp.watch([tasksConfig.sourceCssFiles], ["postcss"]);
        gulp.watch([tasksConfig.sourceTestsScriptFiles], ["build-ts-tests"]);
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
        tasksConfig.outputTestsFolder,
        tasksConfig.outputFolder + "index.html"
        ]);
});
