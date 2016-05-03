/// <reference path="../../typings/browser.d.ts" />

// base url for website/virtual directory/platform
var BASE_URL = "/";
// Application name
var APP_NAME = "Angular.Typescript.Seed";


// requirejs configuration
require.config({
    baseUrl: "/",
    paths: {

        // Jquery
        "jquery": ["//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.3.min", "lib/jquery.min"],

        // Angular
        "angular": "lib/angular.min",
        "angular-cookie": "../Scripts/angular-cookies.min",
        "angular-animate": "../Scripts/angular-animate.min",
        "angular-sanitize": "../Scripts/angular-sanitize.min",
        "angular-translate": "../Scripts/angular-translate.min",

        // bootstrap
        "bootstrap": "../Scripts/bootstrap.min",

        // require
        "domReady": "../Scripts/domReady"
        
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        },
        "angular": {
            exports: "angular",
            deps: ["jquery", ]
        },
        "angular-ui-router": ["angular"],
        "angular-cookie": ["angular"],
        "angular-animate": ["angular"],
        "angular-sanitize": ["angular"],
        "angular-translate": ["angular"]

    }

});


// inicializar la aplicacion (sera invocada al cargarse el dom)
require(["../Scripts/domReady!", "appModule"],
    (app) =>
    {
        "use strict";
    }
);
