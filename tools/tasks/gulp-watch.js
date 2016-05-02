// -----------------------------------------------
// Task for watch project files

var gulp = require("gulp");

// source typescript files
var sourceTsFiles = "src/**/*.ts";
var sourceHtmlFiles = "src/**/*.html";
var sourceHtmlFiles = "src/**/*.css";

/**
 * watch for typescript files
 */
gulp.task("watch-ts", function() {
    gulp.watch([sourceTsFiles], ["build-ts"]);
    gulp.watch([sourceHtmlFiles], ["build-html"]);
});

gulp.task("build-html", function (a) {

    console.log("html file" + a);

});
