import angular = require("angular");
import routesModule = require("routesModule");
import localesModule = require("localesModule");


/** @Brief Implementacion de la clase principal de la aplicacion.
 * La arquitectura de la aplicacion tiene como base la libreria angular y require. Esta clase encapsula un modulo de angular y la infraestructura para registrar los diferentes componentes.
 * La libreria require es usada para permitir cargar los componentes de forma dinamica segun se vayan utilizando, evitando una carga inicial de todo el contenido de la aplicacion.
 */
class App
{

    /** Objeto para la gestion de rutas en la aplicacion */
    private m_routes: routesModule.Routes;
    /** Objeto para la gestion de idiomas en la aplicacion */
    private m_locales: localesModule.Locales;



    /** Constructor por defecto de la clase (Debera ser invocado despues de haberse inicializado el documento HTML)
     * @param _initialized Funcion que sera invocada cuando se haya inicializado la clase de la aplicacion principal
     */
    constructor(_initialized: () => void)
    {

        // array de modulos por defecto a establecer en el modulo de angular
        var modules: string[] = ["ngSanitize", "ngAnimate", "ui.router", "ngCookies", "pascalprecht.translate"];
        // crear el modulo con la aplicacion principal basada en angular, incluir modulos por defecto y los modulos del tema
        let ngModule: ng.IModule  = angular.module(APP_NAME, modules);

        // inicializar objetos para la gestion de idiomas y rutas
        this.m_routes = new routesModule.Routes();
        this.m_locales = new localesModule.Locales(ngModule);

        // inicializar la funcion de configuracion de angular
        this._angularConfig();

        // inicializar la funcion de ejecucion de angular
        //this._angularRun();

        // invocar callback de inicializacion
        _initialized();
    };


    /** Funcion para inicializar la funcion de configuracion del modulo principal de angular.
    * (Sera invocada por angular para configurar los diferentes proveedores de servicios)
    */
    private _angularConfig()
    {
        // crear el array con los proveedores que seran inyectados en la funcion de configuracion y crear la funcion de configuracion de angular
        // NOTA: la funcion debe contener los parametros a inyectar en el mismo orden
        var fn: any[] =
            ["$controllerProvider", "$compileProvider", "$filterProvider", "$provide", "$httpProvider", "$stateProvider", "$urlRouterProvider", "$translateProvider",
                ($controllerProvider: ng.IControllerProvider, $compileProvider: ng.ICompileProvider, $filterProvider: ng.IFilterProvider, $provide: ng.auto.IProvideService, $httpProvider: ng.IHttpProvider,
                    $stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $translateProvider: ng.translate.ITranslateProvider) =>
                {
                    // configurar las rutas de la aplicacion (usar rutas con el tema actual)
                    this.m_routes.configure($stateProvider, $urlRouterProvider,
                        BASE_URL + "app/views/" + themesModule.enumThemes[themesModule.Themes.Theme] + "/",
                        BASE_URL + "app/viewmodels/" + themesModule.enumThemes[themesModule.Themes.Theme] + "/");

                    // configurar sistema de gestion de idiomas
                    this.m_locales.configure($translateProvider);
                }];

        // inicializar la funcion de configuracion de angular
        this.m_module.config(fn);
    }

    /** Funcion para inicializar la funcion de ejecucion del modulo principal de angular (funcion que sera invocada por angular al cargarse el ambito raiz)
     * @return array compuesto por la funcion de ejecucion que sera usada por angular, precedido por los parametros a injectar en la funcion, este array debera ser
     * establecido en la funcion 'run' de angular.
     */
    private _angularRun()
    {
        // crear el array con los parametros que seran inyectados en la funcion de ejecucion y crear la funcion de ejecucion de angular
        // NOTA: la funcion debe contener los parametros a inyectar en el mismo orden
        var fn: any[] =
            ["$rootScope", "$location", "authService",
                ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, authService: any) =>
                {
                    // TODO: falta implementar
                    // añadir un evento de cambio de ruta
                    //$rootScope.$on("$routeChangeStart", function (event, next, current)
                    //{
                    //    if (next && next.$$route && next.$$route.secure)
                    //    {
                    //        if (!authService.user.isAuthenticated)
                    //        {
                    //            $rootScope.$evalAsync(function ()
                    //            {
                    //                authService.redirectToLogin();
                    //            });
                    //        }
                    //    }
                    //});

                }];

        this.m_module.run(fn);
    }
}

// crear la instancia de la aplicaicon principal a exportar
// HACK: para exportar la propia intancia en typescript 1.0, una forma es hacer un merge de la interface y la clase, de esta forma se puede exportar la instancia de la clase mediante la interface.
var App: App = new AppImpl(() =>
{
    // Ahora que esta inicializada la clase de la aplicacion principal, se inicializa la aplicacion mediante angular
    angular.bootstrap(document, [APP_NAME]);
});

export = App;
