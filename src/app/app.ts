import "angular";
import "angular-animate";
import "angular-cookies";
import "angular-route";
import "angular-sanitize";
import "angular-translate";

import { IRouteResolverProvider } from "app/services/routeResolver.provider";
import "app/services/routeResolver.provider";

import "app/helpers";

/** Interface for declare angular register methods */
interface IAngularRegister {

    /** function definition for register controller in angular. ::ng.IControllerProvider.register()
     * @see http://docs.angularjs.org/api/ng.$controller
     * @see http://docs.angularjs.org/api/ng.$controllerProvider
     * @param name Controller name
     * @param controller Controller class
     */
    controller: (name: string, controller: Function) => void;

    /** function definition for register directive in angular. ::ng.ICompileProvider.directive()
     * @see http://docs.angularjs.org/api/ng.$compile
     * @see http://docs.angularjs.org/api/ng.$compileProvider
     * @param name Directive name
     * @param directive Directive class
     * @return Compiler provider itself used for register directive
     */
    directive: (name: string, directive: Function) => ng.ICompileProvider;

    /** function definition for register filter in angular. ::ng.IFilterProvider.register()
     * @see http://docs.angularjs.org/api/ng.$filter
     * @see http://docs.angularjs.org/api/ng.$filterProvider
     * @param name Filter name
     * @param filter Filter class
     * @return Instance of registered filter or instances map of registered filters (if filters map has been provided)
     */
    filter: (name: string, filter: Function) => ng.IServiceProvider;

    /** function definition for register a service factory in angular. ::ng.IProvideService.factory()
     * @see http://docs.angularjs.org/api/AUTO.$provide
     * @param name Service factory name
     * @param serviceFactory Service factory (Internally this is an abbreviation for $provide.provider(name, {$get: $getFn}).
     * @return Registered service factory instance 
     */
    factory: (name: string, serviceFactory: Function) => ng.IServiceProvider;

    /** function definition for register a service constructor in angular, which will be invoked with new to create the service instance. 
     * ::ng.IProvideService.service()
     * @see http://docs.angularjs.org/api/AUTO.$provide
     * @param name Service constructor name
     * @param service Service class.
     * @return Registered service constructor instance 
     */
    service: (name: string, service: Function) => ng.IServiceProvider;
}

class AngularApp {

    /** Main angular module */
    private _module: ng.IModule;
    /** Object for angular register components */
    private _angularRegister: IAngularRegister;


    /** Default constructor */
    constructor() {

        // create angular main module
        let modules: string[] = ["ngSanitize", "ngAnimate", "ngRoute", "ngCookies", "pascalprecht.translate",
            `${APP_NAME}.routeResolverService`];
        this._module = angular.module(APP_NAME, modules);

        this._angularConfig();
        this._angularRun();

        // start angular app
        angular.bootstrap(document, [APP_NAME]);
    }

    /** Property for angular get main module */
    public get module(): ng.IModule {
        return this._module;
    }

    /** function definition for register controller in angular. ::ng.IControllerProvider.register()
     * @see http://docs.angularjs.org/api/ng.$controller
     * @see http://docs.angularjs.org/api/ng.$controllerProvider
     * @param name Controller name
     * @param controller Controller class
     */
    public registerController(name: string, viewModel: Function): void {
        this._angularRegister.controller(name, viewModel);
    }

    /** function definition for register directive in angular. ::ng.ICompileProvider.directive()
     * @see http://docs.angularjs.org/api/ng.$compile
     * @see http://docs.angularjs.org/api/ng.$compileProvider
     * @param name Directive name
     * @param directive Directive class
     * @return Compiler provider itself used for register directive
     */
    public registerDirective(name: string, directive: Function): ng.ICompileProvider {
        return this._angularRegister.directive(name, directive);
    }

    /** function definition for register filter in angular. ::ng.IFilterProvider.register()
     * @see http://docs.angularjs.org/api/ng.$filter
     * @see http://docs.angularjs.org/api/ng.$filterProvider
     * @param name Filter name
     * @param filter Filter class
     * @return Instance of registered filter or instances map of registered filters (if filters map has been provided)
     */
    public registerFilter(name: string, filter: Function): ng.IServiceProvider {
        return this._angularRegister.filter(name, filter);
    }

    /** function definition for register a service factory in angular. ::ng.IProvideService.factory()
     * @see http://docs.angularjs.org/api/AUTO.$provide
     * @param name Service factory name
     * @param serviceFactory Service factory (Internally this is an abbreviation for $provide.provider(name, {$get: $getFn}).
     * @return Registered service factory instance 
     */
    public registerFactory(name: string, serviceFactory: Function): ng.IServiceProvider {
        return this._angularRegister.factory(name, serviceFactory);
    }

    /** function definition for register a service constructor in angular, which will be invoked with new to create the service instance.
     * ::ng.IProvideService.service()
     * @see http://docs.angularjs.org/api/AUTO.$provide
     * @param name Service constructor name
     * @param service Service class.
     * @return Registered service constructor instance 
     */
    public registerService(name: string, service: Function): ng.IServiceProvider {
        return this._angularRegister.service(name, service);
    }

    /** Initialize angular 'config' function */
    private _angularConfig(): void {

        // angular config function
        let fn: any[] = [
            "$controllerProvider",
            "$compileProvider",
            "$filterProvider",
            "$provide",
            "$httpProvider",
            // "$translateProvider",
            // "translatePartialLoaderProvider",
            "$routeProvider",
            "RouteResolverProvider",
            ($controllerProvider: ng.IControllerProvider,
            $compileProvider: ng.ICompileProvider,
            $filterProvider: ng.IFilterProvider,
            $provide: ng.auto.IProvideService,
            $httpProvider: ng.IHttpProvider,
            // $translateProvider: ng.translate.ITranslateProvider,
            // $translatePartialLoaderProvider: ng.translate.ITranslatePartialLoaderProvider,
            $routeProvider: ng.route.IRouteProvider,
            $RouteResolverProvider: IRouteResolverProvider
            ) => {

                // asign angular register functions
                this._angularRegister = {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    factory: $provide.factory,
                    filter: $filterProvider.register,
                    service: $provide.service
                };

                // configurar las rutas de la aplicacion (usar rutas con el tema actual)
                $RouteResolverProvider.controllersBasePath = "app/parts/";
                $RouteResolverProvider.viewsBasePath = "app/parts/";

                // configurar sistema de gestion de idiomas
                // $translateProvider.fallbackLanguage("en")
                // .preferredLanguage("en")
                // .useLoaderCache("$translationCache")
                // .useLoader("$translatePartialLoader", {
                //     urlTemplate: "app/{part}/lang/{lang}.json"
                // })

                $routeProvider
                    .when("/home", $RouteResolverProvider.resolve({ controllerAs: "Home", path: "home/home" }))
                    .otherwise({ redirectTo: "/home" });


            }];

        // initialize angular config function
        this._module.config(fn);
    }

    /** Initialize angular 'run' function */
    private _angularRun(): void {

        // crear el array con los parametros que seran inyectados en la funcion de ejecucion y crear la funcion de ejecucion de angular
        // NOTA: la funcion debe contener los parametros a inyectar en el mismo orden
        let fn: any[] =
            ["$rootScope", "$location", "$translate",
                ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, $translate: ng.translate.ITranslateService) => {
                    // TODO: translate partial
                    // $rootScope.$on("$translatePartialLoaderStructureChanged", () => {
                    //     $translate.refresh();
                    // });

                }];

        this._module.run(fn);
    }
}


// create main app instance for export
export let app: AngularApp = new AngularApp();
