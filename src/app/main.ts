import * as angular from "angular";

//import routesModule = require("routesModule");


export let initialize = function () {
    Main.instance.initialize();
}


class Main
{

    /** Variable con la unica instancia del framework */
    private static m_instance: Main = new Main();
    /** Variable indicando si el framework ya esta inicializado */
    private m_isInitialized: boolean = false;
    
    /** Objeto para la gestion de rutas en la aplicacion */
    //private m_routes: routesModule.Routes;

    constructor()
    {
        alert("constructor");    
    }
    
    public static get instance(): Main
    {
        return Main.m_instance;
    }
    
    

    public initialize(): void
    {
        alert("main-initialize");
        
        // SOLO se puede inicializar una vez
        if (this.m_isInitialized) return;


        // array de modulos por defecto a establecer en el modulo de angular
        var modules: string[] = ["ngSanitize", "ngAnimate", "ui.router", "ngCookies", "pascalprecht.translate"];
        // crear el modulo con la aplicacion principal basada en angular, incluir modulos por defecto y los modulos del tema
        let ngModule: ng.IModule  = angular.module(APP_NAME, modules).config(this._angularConfig).run(this._angularRun);

        // inicializar objetos para la gestion de idiomas y rutas
        //this.m_routes = new routesModule.Routes();

        // inicializar la funcion de configuracion de angular
        this._angularConfig();

        // inicializar la funcion de ejecucion de angular
        //this._angularRun();

        // invocar callback de inicializacion
        //_initialized();
        // Ahora que esta inicializada la clase de la aplicacion principal, se inicializa la aplicacion mediante angular
        angular.bootstrap(document, [APP_NAME]);

        // framework inicializado
        this.m_isInitialized = true;
                
    }
    
    /** Funcion para inicializar la funcion de configuracion del modulo principal de angular.
    * (Sera invocada por angular para configurar los diferentes proveedores de servicios)
    */
    private _angularConfig() : any[]
    {
        // crear el array con los proveedores que seran inyectados en la funcion de configuracion y crear la funcion de configuracion de angular
        // NOTA: la funcion debe contener los parametros a inyectar en el mismo orden
        var fn: any[] = [
            "$controllerProvider",
            "$compileProvider",
            "$filterProvider",
            "$provide",
            "$httpProvider",
            "$translateProvider",
            "translatePartialLoaderProvider",
            ($controllerProvider: ng.IControllerProvider,
            $compileProvider: ng.ICompileProvider,
            $filterProvider: ng.IFilterProvider,
            $provide: ng.auto.IProvideService,
            $httpProvider: ng.IHttpProvider,
            $translateProvider: ng.translate.ITranslateProvider,
            $translatePartialLoaderProvider: ng.translate.ITranslatePartialLoaderProvider) => {
                // configurar las rutas de la aplicacion (usar rutas con el tema actual)
                // this.m_routes.configure($stateProvider, $urlRouterProvider,
                //     BASE_URL + "app/views/" + themesModule.enumThemes[themesModule.Themes.Theme] + "/",
                //     BASE_URL + "app/viewmodels/" + themesModule.enumThemes[themesModule.Themes.Theme] + "/");

                // configurar sistema de gestion de idiomas
                $translateProvider.fallbackLanguage("en")
                .preferredLanguage("en")
                .useLoaderCache("$translationCache")
                .useLoader("$translatePartialLoader", {
                    urlTemplate: "app/{part}/lang/{lang}.json"
                })

            }];

        // inicializar la funcion de configuracion de angular
        return fn;
    }

    /** Funcion para inicializar la funcion de ejecucion del modulo principal de angular (funcion que sera invocada por angular al cargarse el ambito raiz)
     * @return array compuesto por la funcion de ejecucion que sera usada por angular, precedido por los parametros a injectar en la funcion, este array debera ser
     * establecido en la funcion 'run' de angular.
     */
    private _angularRun() : any[]
    {
        // crear el array con los parametros que seran inyectados en la funcion de ejecucion y crear la funcion de ejecucion de angular
        // NOTA: la funcion debe contener los parametros a inyectar en el mismo orden
        var fn: any[] =
            ["$rootScope", "$location", "$translate",
                ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, $translate: ng.translate.ITranslateService) =>
                {
                    $rootScope.$on("$translatePartialLoaderStructureChanged", () => {
                        $translate.refresh();
                    });

                }];

        return fn;
    }
}

