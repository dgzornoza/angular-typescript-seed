// -----------------------------------------------
// Task for lint and compile typescript
'use strict';

var gulp = require("gulp");
var tsc = require("gulp-typescript");
var tslint = require("gulp-tslint");

var tasksConfig = require("./gulp-config");

/**
 * lint and build TypeScript
 */
gulp.task("build-ts", ["lint-ts"], function () {
    return build();
});

/**
 * lint typescript source code
 */
gulp.task("lint-ts", function () {
    return lint();
});


// configure typescript for use tsconfig.json
var tsProject = tsc.createProject("tsconfig.json", { typescript: require("typescript") });

function build()
{
    // compile typescript
    var tsResult = tsProject.src()
    .pipe(tsc(tsProject));
    // send javascript to output folder
    return tsResult.js.pipe(gulp.dest(tasksConfig.outputFolder));
};

function lint()
{
    return gulp.src(tasksConfig.sourceScriptFiles)
    .pipe(tslint())
    .pipe(tslint.report("prose",
    {
        emitError: false,
        summarizeFailureOutput: true
    }));
};





