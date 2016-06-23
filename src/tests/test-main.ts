/* tslint:disable no-reference */
/// <reference path="../../typings/browser.d.ts" />


var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

interface Window
{
    __karma__: any;
}


// Get a list of all the test files to include
var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (TEST_REGEXP.test(file)) {
    //   Normalize paths to RequireJS module names.
    //   If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    //   then do not normalize the paths
      // var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
      allTestFiles.push(file);
    }
  }
}

// base url for website/virtual directory/platform (Ended with'/')
const BASE_URL: string = "/";
// application name
const APP_NAME: string = "angular.ts.sample";

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/wwwroot',

  paths: {
        "angular": "lib/angular",
        "angular-animate": "lib/angular-animate.min",
        "angular-cookies": "lib/angular-cookies.min",
        "angular-mocks": "../bower_components/angular-mocks/angular-mocks",
        "angular-route": "lib/angular-route.min",
        "angular-sanitize": "lib/angular-sanitize.min",
        "angular-translate": "lib/angular-translate.min",

        "bootstrap": "lib/bootstrap.min",
        "jquery": "lib/jquery.min",
        "modernizr": "lib/modernizr"
    },
    shim: {

        "angular": {
            deps: ["jquery"],
            exports: "angular"
        },
        "angular-animate": ["angular"],
        "angular-cookies": ["angular"],
        "angular-mocks": ["angular"],
        "angular-route": ["angular"],
        "angular-sanitize": ["angular"],
        "angular-translate": ["angular"],

        "bootstrap": {
            deps: ["jquery"]
        }
    },

    // we have to kickoff jasmine, as it is asynchronous
    callback: lazyStart
});


function lazyStart() {

    requirejs(["angular",
            "angular-animate",
            "angular-cookies",
            "angular-mocks",
            "angular-route",
            "angular-sanitize",
            "angular-translate",
            "bootstrap"], function() {

            // start app and init karma tests
                requirejs(["app/main"].concat(allTestFiles), function(a,b) {
	                window.__karma__.start();
                });
            });
}
