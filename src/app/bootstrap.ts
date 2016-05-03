
// base url for website/virtual directory/platform
var BASE_URL = "/";
// Application name
var APP_NAME = "Angular.Typescript.Seed";



// #region [Configuracion require]

// configuracion requirejs
require.config({
    baseUrl: "app",
    paths: {

        // Jquery
        "jquery": "../Scripts/jquery-2.1.4.min",
        "jquery.signalr": "../Scripts/jquery.signalR-2.2.0.min",

        // Angular
        "angular": "../Scripts/angular.min",
        "angular-ui-router": "../Scripts/angular-ui-router.min",
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
        "jquery.signalr": ["jquery"],
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

// #endregion [Configuracion require]


// #region [Iniializacion aplicacion]

// inicializar la aplicacion (sera invocada al cargarse el dom)
require(["../Scripts/domReady!", "appModule"],
    (app) =>
    {
        "use strict";
    }
);

// #endregion [Iniializacion aplicacion]
