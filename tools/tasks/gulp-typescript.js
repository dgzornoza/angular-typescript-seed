// -----------------------------------------------
// Task for lint and compile typescript
'use strict';

var gulp = require("gulp");
var tsc = require("gulp-typescript");
var tslint = require("gulp-tslint");
var del = require("del");

var tasksConfig = require("./gulp-config");

var typescriptTasks = (function()
{
    // configure typescript for use tsconfig.json
    var _tsProject = tsc.createProject("tsconfig.json", { typescript: require("typescript") });

    var _compile = function()
    {
        // compile typescript
        var tsResult = _tsProject.src()
        .pipe(tsc(_tsProject));
        // send javascript to output folder
        return tsResult.js.pipe(gulp.dest(tasksConfig.outputFolder));
    };

    var _cleanOutput = function()
    {
        del.sync(function(_file)
        {
            console.log(_file);
            return "wwwroot/app";
        });
    };
    
    var _lint = function()
    {
        return gulp.src(tasksConfig.sourceScriptFiles)
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



