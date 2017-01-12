// -----------------------------------------------
// Configuration file for gulp tasks
'use strict';

var gulp = require("gulp");
var template = require('gulp-template');
var debug = require('gulp-debug');

/**
 * configure for debug environment
 */
gulp.task("configure-debug", ["build-ts-debug"], function () {
    return configure(tasksConfig.environmentVars.debug);
});

/**
 * configure for debug environment
 */
gulp.task("configure-release", ["build-ts-release"], function () {
    return configure(tasksConfig.environmentVars.release);
});

function configure(obj)
{
    var files = [
        tasksConfig.outputAppFolder + "config.js",
        tasksConfig.outputAppFolder + "main.js"
        ]

    gulp.src(files)
		.pipe(template(obj))
		.pipe(gulp.dest(tasksConfig.outputAppFolder));

    files = [
        tasksConfig.outputTestsFolder + "test-main.js"
        ]

	gulp.src(files)
		.pipe(template(obj))
		.pipe(gulp.dest(tasksConfig.outputTestsFolder));
}



var tasksConfig = (function ()
{
    var _sourceFolder = "src/";
    var _sourceContentFolder = _sourceFolder + "content/";
    var _outputFolder = "wwwroot/";
    var _outputContentFolder = _outputFolder + "content/";

    return {

        // source resources
        sourceFolder: _sourceFolder,
        sourceContentFolder: _sourceContentFolder,

        sourceHtmlFiles: _sourceFolder + "**/*.html",
        sourceCssFiles: _sourceContentFolder + "css/**/*.css",
        sourceMocksFiles: _sourceContentFolder + "mocks/*.json",

        sourceScriptFiles: _sourceFolder + "app/**/*.ts",
        sourceTestsScriptFiles: _sourceFolder + "tests/**/*.ts",

        // output resources
        outputFolder: _outputFolder,
        outputContentFolder: _outputContentFolder,

        outputAppFolder: _outputFolder + "app/",
        outputLibFolder: _outputFolder + "lib/",
        outputCssFolder: _outputContentFolder + "css/",
        outputFontsFolder: _outputContentFolder + "fonts/",
        outputMocksFolder: _outputContentFolder + "mocks/",

        outputTestsFolder: _outputFolder + "tests/",

        // environments vars for use with gulp-template
        environmentVars: {

            debug: {
                APP_VERSION: "1.0",
	            BASE_URL: "/",
                API_BASE_URL: "/",
                APP_NAME: "angular.ts.sample",
                DEBUG_MODE: "true",
                MINIFIED_EXT: ".min"
            },
            release: {
                APP_VERSION: "1.0",
	            BASE_URL: "/",
                API_BASE_URL: "/",
                APP_NAME: "angular.ts.sample",
                DEBUG_MODE: "false",
                MINIFIED_EXT: ""
            }

        }

    };

})();

module.exports = tasksConfig;
