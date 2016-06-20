var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
// Object.keys(window.__karma__.files).forEach(function(file) {  
//   if (TEST_REGEXP.test(file)) {
//     // Normalize paths to RequireJS module names.
//     // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
//     // then do not normalize the paths    
//     var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
//     allTestFiles.push(normalizedTestModule);
//   }
// });

var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (TEST_REGEXP.test(file)) {
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
      "angular-route": "wwwroot/lib/angular-route.min",
      "angular-sanitize": "wwwroot/lib/angular-sanitize.min",
      "angular-translate": "wwwroot/lib/angular-translate.min",

      "bootstrap": ["//ajax.aspnetcdn.com/ajax/bootstrap/3.3.6/bootstrap.min", "wwwroot/lib/bootstrap.min"],
      "jquery": ["//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.3.min", "wwwroot/lib/jquery.min"],
      "modernizr": "wwwroot/lib/modernizr",
      "domReady": "wwwroot/lib/domReady"

  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});

// start app when dom is loaded
requirejs([ "angular",
            "angular-animate",
            "angular-cookies",
            "angular-route",
            "angular-sanitize",
            "angular-translate",
            "bootstrap"], function() {

            }
);
