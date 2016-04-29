// -----------------------------------------------
// Task for publish thirdparty dependencies.
// This task delete output folder and publish third party files.

var gulp = require("gulp");
var del = require("del"); // delete files/directories

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

/**
 * Task for generate output web libraries folder from third party (bower, node, etc.)
 * @remarks this task delete output web libraries folder before generate new libs
 */
gulp.task("publish-thirdparty", function () {
  
    deleteAndPublish(thirdPartyLibs, wwwlib);
    deleteAndPublish(thirdPartyCss, wwwcss);
    deleteAndPublish(thirdPartyFonts, wwwfonts);
});


function deleteAndPublish(_files, _outputFolder)
{
    del(_outputFolder).then(function () {

        console.log("Deleted folder:\n", _outputFolder);
        
        gulp.src(_files)
        .pipe(gulp.dest(_outputFolder));

        console.log("Generated folder:\n", _outputFolder);

    });
}
