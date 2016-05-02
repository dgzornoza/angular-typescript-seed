// -----------------------------------------------
// Task for lint and compile typescript
'use strict';

var gulp = require("gulp");
var tsc = require("gulp-typescript");
var tslint = require("gulp-tslint");
var del = require("del");

// source typescript files
var sourceFiles = "src/app/**/*.ts";
// output web app javascript files and folder
var outputFiles = "wwwroot/app/**/*.js";
var outputFolder = "wwwroot/app/";

var typescriptTasks = (function()
{
    // configure typescript for use tsconfig.json
    var _tsProject = tsc.createProject("tsconfig.json", { typescript: require("typescript") });

    var _compile = function()
    {
        // compile typescript
        var tsResult = _tsProject.src()
        .pipe(tsc(_tsProject));
        // send javascript to outpu folder
        return tsResult.js.pipe(gulp.dest(outputFolder));
    };

    var _cleanOutput = function()
    {
        del.sync(outputFiles);
    };
    
    var _lint = function()
    {
        return gulp.src(sourceFiles)
        .pipe(tslint())
        .pipe(tslint.report("prose",
        {
            emitError: false,
            summarizeFailureOutput: true
        }));
    };
   
   return { compile: _compile, cleanOutput: _cleanOutput, lint: _lint };
})();

module.exports = typescriptTasks;



