// -----------------------------------------------
// Task for manage thirdparty dependencies.
'use strict';

var gulp = require("gulp");
var del = require("del");

var tasksConfig = require("./gulp-config");

// thirdparty files
var thirdPartyLibs = [
    "bower_components/modernizr/dist/modernizr.js",
    "bower_components/jquery/dist/jquery.min.js",
    "bower_components/angular/angular.min.js",
    "bower_components/bootstrap/dist/js/bootstrap.min.js"
];
var thirdPartyCss = [
    "bower_components/bootstrap/dist/css/bootstrap.min.css",
    "bower_components/bootstrap/dist/css/bootstrap-theme.min.css"        
];
var thirdPartyFonts = [
    "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot",
    "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg",
    "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
    "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff",
    "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2"
];

var thirdPartyTasks = (function()
{
    var _publish = function()
    {
        gulp.src(thirdPartyLibs).pipe(gulp.dest(tasksConfig.outpuLibFolder));
        gulp.src(thirdPartyCss).pipe(gulp.dest(tasksConfig.outputCssFolder));
        gulp.src(thirdPartyFonts).pipe(gulp.dest(tasksConfig.outputFontsFolder));
    }

    var _cleanOutput = function()
    {
        del.sync([tasksConfig.outpuLibFolder, tasksConfig.outputCssFolder, tasksConfig.outputFontsFolder]);
    };
    
    return { publish: _publish, cleanOutput: _cleanOutput };

})();


module.exports = thirdPartyTasks;