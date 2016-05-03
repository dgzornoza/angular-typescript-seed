// -----------------------------------------------
// Task for manage thirdparty dependencies.
'use strict';

var gulp = require("gulp");

var tasksConfig = require("./gulp-config");

/**
 * copy output third party libs (bower, node, etc.)
 */
gulp.task("publish-thirdparty", function () {
    return publish();
});


// thirdparty files
var thirdPartyLibs = [
    "bower_components/angular/angular.min.js",
    "bower_components/angular-animate/angular-animate.min.js",
    "bower_components/angular-cookies/angular-cookies.min.js",
    "bower_components/angular-resource/angular-resource.min.js",
    "bower_components/angular-route/angular-route.min.js",
    "bower_components/angular-sanitize/angular-sanitize.min.js",
    "bower_components/angular-translate/angular-translate.min.js",    
    "bower_components/bootstrap/dist/js/bootstrap.min.js",
    "bower_components/jquery/dist/jquery.min.js",
    "bower_components/modernizr/dist/modernizr.js",
    "bower_components/requirejs/require.js"
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

function publish()
{
    gulp.src(thirdPartyLibs).pipe(gulp.dest(tasksConfig.outputLibFolder));
    gulp.src(thirdPartyCss).pipe(gulp.dest(tasksConfig.outputCssFolder));
    gulp.src(thirdPartyFonts).pipe(gulp.dest(tasksConfig.outputFontsFolder));
}
