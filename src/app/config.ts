/* tslint:disable */


// base url for website/virtual directory/platform (Ended with'/')
const BASE_URL: string = "<%= BASE_URL %>";
// base url for webservice  (Ended with'/')
const API_BASE_URL: string = "<%= API_BASE_URL %>";
// application name
const APP_NAME: string = "<%= APP_NAME %>";
// flag for configure app for running tests execution
const IS_RUNNING_TESTS: boolean = false;


// requirejs configuration
requirejs.config({
    baseUrl: BASE_URL,
    urlArgs: "bust=" +  "<%= APP_VERSION %>",
    paths: {

        "angular": ["//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.11/angular.min", "lib/angular.min"],
        "angular-animate": ["//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.11/angular-animate.min", "lib/angular-animate.min"],
        "angular-cookies": ["//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.11/angular-cookies.min", "lib/angular-cookies.min"],
        "angular-local-storage": "lib/angular-local-storage.min",
        "angular-route": ["//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.11/angular-route.min", "lib/angular-route.min"],
        "angular-sanitize": ["//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.11/angular-sanitize.min", "lib/angular-sanitize.min"],
        "angular-translate": ["//cdnjs.cloudflare.com/ajax/libs/angular-translate/2.13.1/angular-translate.min", "lib/angular-translate.min"],

        "angular-ui-bootstrap": ["//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.2.0/ui-bootstrap-tpls.min", "lib/ui-bootstrap-tpls.min"],
        "modernizr": "lib/modernizr",
        "domReady": "lib/domReady"

    },
    shim: {

        "angular": {
            exports: "angular"
        },
        "angular-animate": ["angular"],
        "angular-cookies": ["angular"],
        "angular-local-storage": ["angular"],
        "angular-route": ["angular"],
        "angular-sanitize": ["angular"],
        "angular-translate": ["angular"],

        "angular-ui-bootstrap": {
            deps: ["angular"]
        }
    }

});


// start app when dom is loaded
requirejs(["lib/domReady!",
            "angular",
            "angular-animate",
            "angular-cookies",
            "angular-local-storage",
            "angular-route",
            "angular-sanitize",
            "angular-translate",
            "angular-ui-bootstrap"],
            (_document: Document) => {

	        // start app when dom is loaded
            requirejs(["app/main"], (_main: any) =>
                {

                });

            }
);
