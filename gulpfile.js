'use strict';
var gulp = require("gulp");
var debug = require("gulp-debug");
var postcss = require("gulp-postcss");


var thirdpartyTasks = require("./tools/tasks/gulp-thirdparty");
var typescriptTasks = require("./tools/tasks/gulp-typescript");
var htmlTasks = require("./tools/tasks/gulp-html");
var cssTasks = require("./tools/tasks/gulp-css");



//gulp.task('default', ['ts-lint', 'compile-ts']);


/* ------------------------------------------------------------------------------------------------
thirdparty tasks
*/

/**
 * clean and copy output third party libs (bower, node, etc.)
 */
gulp.task("publish-thirdparty", ["clean-thirdparty"], function () {  
    return thirdpartyTasks.publish();
});

/**
 * clean third party libs output dir
 */
gulp.task("clean-thirdparty", function () {  
    return thirdpartyTasks.cleanOutput();
});

/* ------------------------------------------------------------------------------------------------
Typescript tasks
*/

/**
 * lint and Compile TypeScript
 */
gulp.task("build-ts", ["lint-ts"], function () {
    return typescriptTasks.compile();
});

/**
 * Clean typescript output, lint and compile typescript
 */
gulp.task("rebuild-ts", ["clean-ts", "lint-ts"], function () {
    return typescriptTasks.compile();
});

/**
 * clean typescript oputput
 */
gulp.task("clean-ts", function () {
    return typescriptTasks.cleanOutput();
});

/**
 * lint typescript source code
 */
gulp.task("lint-ts", function () {
    return typescriptTasks.lint();
});

/* ------------------------------------------------------------------------------------------------
html tasks
*/

/* ------------------------------------------------------------------------------------------------
css tasks
*/

/* ------------------------------------------------------------------------------------------------
watch tasks
*/

/**
 * watch soucrce files
 */
gulp.task("watch-source", function() {
        gulp.watch([tasksConfig.sourceScriptFiles], ["build-ts"]);
        gulp.watch([tasksConfig.sourceHtmlFiles], ["publish-html"]);
        //gulp.watch([tasksConfig.sourceCssFiles], ["postcss"]);
});