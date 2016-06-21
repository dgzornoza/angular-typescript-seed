var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;


// Get a list of all the test files to include
var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (TEST_REGEXP.test(file)) {
      // Normalize paths to RequireJS module names.
      // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
      // then do not normalize the paths
      var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
      allTestFiles.push(normalizedTestModule);
    }
  }
}


require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  paths: {
        "angular": "wwwroot/lib/angular.min",
        "angular-animate": "wwwroot/lib/angular-animate.min",
        "angular-cookies": "wwwroot/lib/angular-cookies.min",
        "angular-mocks": "bower_components/angular-mocks/angular-mocks",
        "angular-route": "wwwroot/lib/angular-route.min",
        "angular-sanitize": "wwwroot/lib/angular-sanitize.min",
        "angular-translate": "wwwroot/lib/angular-translate.min",

        "bootstrap": "wwwroot/lib/bootstrap.min",
        "jquery": "wwwroot/lib/jquery.min",
        "modernizr": "wwwroot/lib/modernizr"
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

    // dynamically load all test files
    //deps: allTestFiles,

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

                requirejs(allTestFiles, function() {
                    window.__karma__.start();
                })

            });
}

// // load angular dependencies
// requirejs([ "angular",
//             "angular-animate",
//             "angular-cookies",
//             "angular-mocks",
//             "angular-route",
//             "angular-sanitize",
//             "angular-translate",
//             "bootstrap"], function() {

//             }
// );
