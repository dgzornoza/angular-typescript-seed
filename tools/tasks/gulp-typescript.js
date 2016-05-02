// -----------------------------------------------
// Task for compile typescript

var gulp = require("gulp");
var tsc = require("gulp-typescript");
var tslint = require("gulp-tslint");
var del = require("del");
var debug = require("gulp-debug");

// source typescript files
var sourceFiles = "src/app/**/*.ts";

// output web app javascript files and folder
var outputFiles = "wwwroot/app/**/*.js";
var outputFolder = "wwwroot/app/";

// configure typescript for use tsconfig.json
var tsProject = tsc.createProject("tsconfig.json", { typescript: require("typescript") });

/**
 * Compile TypeScript task using tsconfig.json
 */
gulp.task("build-ts", ["lint-ts"], function () {

    return _compileTypescript();

    // minificar (NOTA: Comentar si no se quiere minificar)
    //.pipe(uglify_module())

});

/**
 * Clean javascript output and compile typescript task using tsconfig.json
 */
gulp.task("rebuild-ts", ["lint-ts"], function () {

    return _cleanOutput()
    .pipe(_compileTypescript());

    // minificar (NOTA: Comentar si no se quiere minificar)
    //.pipe(uglify_module())

});

/**
 * lint typescript source code
 */
gulp.task("lint-ts", function () {

    return gulp.src(sourceFiles)
    .pipe(tslint())
    .pipe(tslint.report("prose",
    {
        emitError: false,
        summarizeFailureOutput: true
    } ));
});

/**
 * watch for typescript files
 */
gulp.task("watch-ts", function() {
    gulp.watch([sourceFiles], ["build-ts"]);
});


function _compileTypescript()
{
    // compile typescript
    var tsResult = tsProject.src()
    .pipe(tsc(tsProject));
    // send javascript to outpu folder
    return tsResult.js.pipe(debug()).pipe(gulp.dest(outputFolder));
}

function _cleanOutput()
{
    return del.sync(outputFiles);
}





