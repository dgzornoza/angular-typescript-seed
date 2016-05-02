// -----------------------------------------------
// Task for manage thirdparty dependencies.
'use strict';

var gulp = require("gulp");
var del = require("del");

// output web libraries folder
var wwwlib = "wwwroot/lib/";
var wwwcss = "wwwroot/css/";
var wwwfonts = "wwwroot/fonts/";

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
        gulp.src(thirdPartyLibs).pipe(gulp.dest(wwwlib));
        gulp.src(thirdPartyCss).pipe(gulp.dest(wwwcss));
        gulp.src(thirdPartyFonts).pipe(gulp.dest(wwwfonts));
    }

    var _cleanOutput = function()
    {
        del.sync([wwwlib, wwwcss, wwwfonts]);
    };
    
    return { publish: _publish, cleanOutput: _cleanOutput };

})();


module.exports = thirdPartyTasks;