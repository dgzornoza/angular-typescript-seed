import "angular";
import "angular-animate";
import "angular-cookies";
import "angular-route";
import "angular-sanitize";
import "angular-translate";

import { RouteResolverProvider, ResolveModel } from "app/services/routeResolver.provider";
import "app/services/routeResolver.provider";

import "app/helpers";

interface AngularRegister {

    /** function definition for register controller in angular. ::ng.IControllerProvider.register()
    * @see http://docs.angularjs.org/api/ng.$controller
    * @see http://docs.angularjs.org/api/ng.$controllerProvider
    * @param _name Controller name
    * @param _controller Controller class
    */
    controller: (_name: string, _controller: Function) => void;
    
    /** function definition for register directive in angular. ::ng.ICompileProvider.directive()
    * @see http://docs.angularjs.org/api/ng.$compile
    * @see http://docs.angularjs.org/api/ng.$compileProvider
    * @param _name Directive name
    * @param _directive Directive class
    * @return Compiler provider itself used for register directive
    */
    directive: (_name: string, _directive: Function) => ng.ICompileProvider;
    
    /** function definition for register filter in angular. ::ng.IFilterProvider.register()
    * @see http://docs.angularjs.org/api/ng.$filter
    * @see http://docs.angularjs.org/api/ng.$filterProvider
    * @param _name Filter name
    * @param _filter Filter class
    * @return Instance of registered filter or instances map of registered filters (if filters map has been provided)
    */
    filter: (_name: string, _filter: Function) => ng.IServiceProvider;
    
    /** function definition for register a service factory in angular. ::ng.IProvideService.factory()
    * @see http://docs.angularjs.org/api/AUTO.$provide
    * @param _name Service factory name
    * @param _serviceFactory Service factory (Internally this is an abbreviation for $provide.provider(name, {$get: $getFn}).
    * @return Registered service factory instance 
    */
    factory: (_name: string, _serviceFactory: Function) => ng.IServiceProvider;
    
    /** function definition for register a service constructor in angular, which will be invoked with new to create the service instance. ::ng.IProvideService.service()
    * @see http://docs.angularjs.org/api/AUTO.$provide
    * @param _name Service constructor name
    * @param _service Service class.
    * @return Registered service constructor instance 
    */
    service: (_name: string, _service: Function) => ng.IServiceProvider;
}

class AngularApp
{
    /** Main angular module */
    private m_module: ng.IModule;
    /** Object for angular register components */
    private m_angularRegister: AngularRegister;
    
        
    /** Default constructor */
    constructor()
    {
        alert("constructor");                
        
        // create angular main module
        var modules: string[] = ["ngSanitize", "ngAnimate", "ngRoute", "ngCookies", "pascalprecht.translate", `${APP_NAME}.routeResolverService`];
        this.m_module = angular.module(APP_NAME, modules);      
        
        this._angularConfig();
        this._angularRun();
        
        // start angular app
        angular.bootstrap(document, [APP_NAME]);
    }
    
    /** Property for angular get main module */
    public get module(): ng.IModule {
        return this.m_module;
    }        
    
    /** function definition for register controller in angular. ::ng.IControllerProvider.register()
    * @see http://docs.angularjs.org/api/ng.$controller
    * @see http://docs.angularjs.org/api/ng.$controllerProvider
    * @param _name Controller name
    * @param _controller Controller class
    */
    registerController(_name: string, _viewModel: Function): void
    {
        this.m_angularRegister.controller(_name, _viewModel);
    }

    /** function definition for register directive in angular. ::ng.ICompileProvider.directive()
    * @see http://docs.angularjs.org/api/ng.$compile
    * @see http://docs.angularjs.org/api/ng.$compileProvider
    * @param _name Directive name
    * @param _directive Directive class
    * @return Compiler provider itself used for register directive
    */
    registerDirective(_name: string, _directive: Function): ng.ICompileProvider
    {
        return this.m_angularRegister.directive(_name, _directive);
    }

    /** function definition for register filter in angular. ::ng.IFilterProvider.register()
    * @see http://docs.angularjs.org/api/ng.$filter
    * @see http://docs.angularjs.org/api/ng.$filterProvider
    * @param _name Filter name
    * @param _filter Filter class
    * @return Instance of registered filter or instances map of registered filters (if filters map has been provided)
    */
    registerFilter(_name: string, _filter: Function): ng.IServiceProvider
    {
        return this.m_angularRegister.filter(_name, _filter);
    }

    /** function definition for register a service factory in angular. ::ng.IProvideService.factory()
    * @see http://docs.angularjs.org/api/AUTO.$provide
    * @param _name Service factory name
    * @param _serviceFactory Service factory (Internally this is an abbreviation for $provide.provider(name, {$get: $getFn}).
    * @return Registered service factory instance 
    */
    registerFactory(_name: string, _serviceFactory: Function): ng.IServiceProvider
    {
        return this.m_angularRegister.factory(_name, _serviceFactory);
    }

    /** function definition for register a service constructor in angular, which will be invoked with new to create the service instance. ::ng.IProvideService.service()
    * @see http://docs.angularjs.org/api/AUTO.$provide
    * @param _name Service constructor name
    * @param _service Service class.
    * @return Registered service constructor instance 
    */
    registerService(_name: string, _service: Function): ng.IServiceProvider
    {
        return this.m_angularRegister.service(_name, _service);
    }
        
    /** Initialize angular 'config' function */
    private _angularConfig() : void
    {
        // angular config function
        var fn: any[] = [
            "$controllerProvider",
            "$compileProvider",
            "$filterProvider",
            "$provide",
            "$httpProvider",
            //"$translateProvider",
            //"translatePartialLoaderProvider",
            "$routeProvider",            
            "RouteResolverProvider",
            ($controllerProvider: ng.IControllerProvider,
            $compileProvider: ng.ICompileProvider,
            $filterProvider: ng.IFilterProvider,
            $provide: ng.auto.IProvideService,
            $httpProvider: ng.IHttpProvider,
            //$translateProvider: ng.translate.ITranslateProvider,
            //$translatePartialLoaderProvider: ng.translate.ITranslatePartialLoaderProvider,
            $routeProvider: ng.route.IRouteProvider,
            $RouteResolverProvider: RouteResolverProvider
            ) => {
                
                // asign angular register functions
                this.m_angularRegister = 
                {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    factory: $provide.factory,
                    filter: $filterProvider.register,
                    service: $provide.service
                }
                    
                // configurar las rutas de la aplicacion (usar rutas con el tema actual)
                $RouteResolverProvider.basePath = "app/pages/";
                
                // configurar sistema de gestion de idiomas
                // $translateProvider.fallbackLanguage("en")
                // .preferredLanguage("en")
                // .useLoaderCache("$translationCache")
                // .useLoader("$translatePartialLoader", {
                //     urlTemplate: "app/{part}/lang/{lang}.json"
                // })

            $routeProvider
                .when('/home', $RouteResolverProvider.resolve({ path: "home/home", controllerAs: 'Home' }))
                .otherwise({ redirectTo: '/home' });
                
                
            }];

        // initialize angular config function
        this.m_module.config(fn);
    }

    /** Initialize angular 'run' function */
    private _angularRun() : void
    {
        // crear el array con los parametros que seran inyectados en la funcion de ejecucion y crear la funcion de ejecucion de angular
        // NOTA: la funcion debe contener los parametros a inyectar en el mismo orden
        var fn: any[] =
            ["$rootScope", "$location", "$translate",
                ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, $translate: ng.translate.ITranslateService) =>
                {
                    // TODO: translate partial
                    // $rootScope.$on("$translatePartialLoaderStructureChanged", () => {
                    //     $translate.refresh();
                    // });

                }];

        this.m_module.run(fn);
    }
}


// create main app instance for export
export let App: AngularApp = new AngularApp();