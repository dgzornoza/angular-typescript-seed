var gulp = require("gulp");
var del = require("del"); // delete files/directories
var postcss = require("gulp-postcss"); // css processor

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
        "bower_components/bootstrap/dist/js/bootstrap-theme.min.css",
        "bower_components/bootstrap/dist/js/bootstrap.min.css"
];
var thirdPartyFonts = [
        "bower_components/bootstrap/dist/js/bootstrap.min.js",
];


/**
 * Task for generate output web libraries folder from third party (bower, node, etc.)
 * @remarks this task delete output web libraries folder before generate new libs
 */
gulp.task("generate-thirdparty", function () {

    deleteAndCopyOutput(thirdPartyLibs, wwwlib);
    deleteAndCopyOutput(thirdPartyCss, wwwcss);
    deleteAndCopyOutput(thirdPartyFonts, wwwfonts);
});


function deleteAndCopyOutput(_files, _outputFolder)
{
    del(_outputFolder).then(function () {

        console.log("Deleted folder:\n", _outputFolder);

        gulp.src(_files)
        .pipe(gulp.dest(_outputFolder));

        console.log("Generated folder:\n", _outputFolder);

    });
}

