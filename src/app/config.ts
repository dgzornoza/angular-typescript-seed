/* tslint:disable no-reference */
/// <reference path="../../typings/browser.d.ts" />


// base url for website/virtual directory/platform
const BASE_URL: string = "/";
// application name
const APP_NAME: string = "Angular.Typescript.Seed";

/// <reference path="../../typings/browser.d.ts" />
// requirejs configuration
requirejs.config({
    baseUrl: BASE_URL,
    paths: {

        "angular": "lib/angular.min",
        "angular-animate": "lib/angular-animate.min",
        "angular-cookies": "lib/angular-cookies.min",
        "angular-route": "lib/angular-route.min",
        "angular-sanitize": "lib/angular-sanitize.min",
        "angular-translate": "lib/angular-translate.min",

        "bootstrap": ["//ajax.aspnetcdn.com/ajax/bootstrap/3.3.6/bootstrap.min.js", "lib/bootstrap.min"],
        "jquery": ["//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.3.min", "lib/jquery.min"],
        "modernizr": "lib/modernizr",
        "domReady": "lib/domReady"

    },
    shim: {

        "angular": {
            deps: ["jquery"],
            exports: "angular"
        },
        "angular-animate": ["angular"],
        "angular-cookies": ["angular"],
        "angular-route": ["angular"],
        "angular-sanitize": ["angular"],
        "angular-translate": ["angular"],

        "bootstrap": {
            deps: ["jquery"]
        }
    }

});


// start app when dom is loaded
requirejs(["lib/domReady!", "app/main"], (_document: Document, _main: any) => 
    {
        
        alert("start require");
    }
);
