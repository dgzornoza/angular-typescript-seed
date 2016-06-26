// -----------------------------------------------
// Task for lint and compile typescript
'use strict';

var gulp = require("gulp");
var tsc = require("gulp-typescript");
var tslint = require("gulp-tslint");

var tasksConfig = require("./gulp-config");

/**
 * lint and build TypeScript in debug mode
 */
gulp.task("build-ts-debug", ["lint-ts"], function () {
    return build(tsProject);
});

/**
 * lint and build TypeScript for tests
 */
gulp.task("build-ts-tests", ["lint-ts-tests"], function () {
    return buildTest(tsTestProject);
});

/**
 * lint typescript source code
 */
gulp.task("lint-ts", function () {
    return lint(tasksConfig.sourceScriptFiles);
});

/**
 * lint typescript source code
 */
gulp.task("lint-ts-tests", function () {
    return lint(tasksConfig.sourceTestsScriptFiles);
});


// configure typescript for use tsconfig.json
var tsProject = tsc.createProject("src/app/tsconfig.json", { typescript: require("typescript") });
var tsTestProject = tsc.createProject("src/tests/tsconfig.json", { typescript: require("typescript") });


function build(tsBuildProject)
{
    // compile typescript
    var tsResult = tsBuildProject.src()
    .pipe(tsc(tsBuildProject));
    // send javascript to output folder
    return tsResult.js.pipe(gulp.dest(tasksConfig.outputFolder));
};
function buildTest()
{
    // compile typescript
    var tsResult = tsTestProject.src()
    .pipe(tsc(tsTestProject));
    // send javascript to output folder
    return tsResult.js.pipe(gulp.dest(tasksConfig.outputFolder));
};

function lint(source)
{
    return gulp.src(source)
    .pipe(tslint())
    .pipe(tslint.report("prose",
    {
        emitError: false,
        summarizeFailureOutput: true
    }));
};





