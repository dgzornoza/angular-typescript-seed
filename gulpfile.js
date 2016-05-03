'use strict';
var gulp = require("gulp");
var debug = require("gulp-debug");
var del = require("del");

// Custom tasks modules
var tasksConfig = require("./tools/tasks/gulp-config");
var thirdpartyTasks = require("./tools/tasks/gulp-thirdparty");
var typescriptTasks = require("./tools/tasks/gulp-typescript");
var htmlTasks = require("./tools/tasks/gulp-html");
var cssTasks = require("./tools/tasks/gulp-css");


/**
 * cleand output and build all project in output directory
 */
gulp.task("rebuild", ["clean-output", "build"]);

/**
 * Build all project in output directory
 */
gulp.task("build", ["publish-thirdparty", "build-ts", "build-html"]);

/**
 * watch source files
 */
gulp.task("watch-source", function() {
        gulp.watch([tasksConfig.sourceScriptFiles], ["build-ts"]);
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
