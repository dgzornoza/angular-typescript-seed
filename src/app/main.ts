import * as angular from "angular";
import "app/services/routeResolver.provider";
import "app/helpers";

import { IRouteResolverProvider, IRouteDefinition } from "app/services/routeResolver.provider";
import { RoutesConfig } from "app/routesConfig";

import { IUsersService } from "app/services/users.service";
import { IAuthenticationService } from "app/services/authentication.service";

import { IUserModel } from "app/models/users";


/** Servicio con el RootScope personalizado para permiti añadir propiedades */
export interface ICustomRootScopeService extends ng.IRootScopeService {
    /** Object with current and previous route definitions */
    routes: {
        current: IRouteDefinition,
        previous: IRouteDefinition
    };
    isAuthUser: boolean;
    isLoading: boolean;
    debugMode: boolean;
}

/** Enumeracion con los dirferentes identificadores usados para gestionar la cache de angular en la aplicacion */
export enum enumCacheFactoryKeys {
    CACHE_FILTER_ID
}

// exportar evento ocurrido al inicializarse la clase
export let onInit: Function;

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
     * @remarks consider using a component
     */
    directive: (name: string, directive: ng.Injectable<ng.IDirectiveFactory>) => ng.ICompileProvider;

    /** function definition for register component in angular. ::ng.ICompileProvider.component()
     * @see http://docs.angularjs.org/api/ng.$compile
     * @see http://docs.angularjs.org/api/ng.$compileProvider
     * @param name Directive name
     * @param options Component options
     * @return Compiler provider itself used for register component
     */
    component: (name: string, options: ng.IComponentOptions) => ng.ICompileProvider;

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


/** Interface for angular main app */
export interface IAngularApp {

    /** Property for get main angular module */
    readonly module: ng.IModule;

    /** Property for get angular log service */
    readonly logService: ng.ILogService;

    /** property for get custom angular main root scope service */
    readonly rootScopeService: ICustomRootScopeService;

    /** property for get authentication service */
    readonly authenticationService: IAuthenticationService;

    /** property for get users service */
    readonly usersService: IUsersService;

    /** Property for get angular cache object for app */
    getCacheFactory(id: enumCacheFactoryKeys): ng.ICacheObject;


    /** function definition for register controller in angular. ::ng.IControllerProvider.register()
     * @see http://docs.angularjs.org/api/ng.$controller
     * @see http://docs.angularjs.org/api/ng.$controllerProvider
     * @param name Controller name
     * @param controller Controller class
     */
    registerController(name: string, controllerClass: ng.Injectable<ng.IControllerConstructor>): void;

    /** function definition for register directive in angular. ::ng.ICompileProvider.directive()
     * @see http://docs.angularjs.org/api/ng.$compile
     * @see http://docs.angularjs.org/api/ng.$compileProvider
     * @param name Directive name
     * @param directive Directive class
     * @return Compiler provider itself used for register directive or IModule if not found
     * @deprecated for new code, use component instead
     */
    registerDirective(name: string, directive: ng.Injectable<ng.IDirectiveFactory>): ng.ICompileProvider | ng.IModule;

    /** function definition for register component in angular. ::ng.ICompileProvider.component()
     * @see http://docs.angularjs.org/api/ng.$compile
     * @see http://docs.angularjs.org/api/ng.$compileProvider
     * @param name Component name
     * @param options Component options
     * @return Compiler provider itself used for register component or IModule if not found
     */
    registerComponent(name: string, options: ng.IComponentOptions): ng.ICompileProvider | ng.IModule;

    /** function definition for register filter in angular. ::ng.IFilterProvider.register()
     * @see http://docs.angularjs.org/api/ng.$filter
     * @see http://docs.angularjs.org/api/ng.$filterProvider
     * @param name Filter name
     * @param filter Filter class
     * @return Instance of registered filter or instances map of registered filters (if filters map has been provided) or IModule if not found
     */
    registerFilter(name: string, filter: Function): ng.IServiceProvider | ng.IModule;

    /** function definition for register a service factory in angular. ::ng.IProvideService.factory()
     * @see http://docs.angularjs.org/api/AUTO.$provide
     * @param name Service factory name
     * @param serviceFactory Service factory (Internally this is an abbreviation for $provide.provider(name, {$get: $getFn}).
     * @return Registered service factory instance or IModule if not found
     */
    registerFactory(name: string, serviceFactory: Function): ng.IServiceProvider | ng.IModule;

    /** function definition for register a service constructor in angular, which will be invoked with new to create the service instance.
     * ::ng.IProvideService.service()
     * @see http://docs.angularjs.org/api/AUTO.$provide
     * @param name Service constructor name
     * @param service Service class.
     * @return Registered service constructor instance or IModule if not found
     */
    registerService(name: string, service: Function): ng.IServiceProvider | ng.IModule;

}


class AngularApp implements IAngularApp {

    /** Main angular module */
    private _module: ng.IModule;

    /** Object for angular register components */
    private _angularRegister: IAngularRegister;

    /** common services in app */
    private _cacheFactory: ng.ICacheFactoryService;
    private _rootScope: ICustomRootScopeService;
    private _logService: ng.ILogService;
    private _authenticationService: IAuthenticationService;
    private _usersService: IUsersService;

    /** Default constructor */
    constructor() {

        // create angular main module
        let modules: string[] = ["ngSanitize", "ngAnimate", "ngRoute", "ngCookies", "LocalStorageModule", "ui.bootstrap", "pascalprecht.translate",
            `${APP_NAME}.routeResolverService`];
        this._module = angular.module(APP_NAME, modules);

        // load dependient modules before initialize angular
        this._loadRequiredComponents(() => {
            this._angularConfig();
            this._angularRun();
            // start angular app
            angular.bootstrap(document, [APP_NAME]);
            // invoke initialization event
            if (undefined != onInit) {
                onInit();
            }
        });
    }

    /** Property for angular get main module */
    public get module(): ng.IModule {
        return this._module;
    }

    public get rootScopeService(): ICustomRootScopeService {
        return this._rootScope;
    }

    public get logService(): ng.ILogService {
        return this._logService;
    }

    public get authenticationService(): IAuthenticationService {
        return this._authenticationService;
    }

    public get usersService(): IUsersService {
        return this._usersService;
    }


    public getCacheFactory(id: enumCacheFactoryKeys): ng.ICacheObject {

        let cache: ng.ICacheObject = this._cacheFactory.get(enumCacheFactoryKeys[id]);
        if (undefined === cache) {
            cache = this._cacheFactory(enumCacheFactoryKeys[id]);
        }
        return cache;
    }





    /** function definition for register controller in angular. ::ng.IControllerProvider.register()
     * @see http://docs.angularjs.org/api/ng.$controller
     * @see http://docs.angularjs.org/api/ng.$controllerProvider
     * @param name Controller name
     * @param controller Controller class
     */
    public registerController(name: string, controllerClass: ng.Injectable<ng.IControllerConstructor>): void {

        if (undefined == this._angularRegister || IS_RUNNING_TESTS) {
            this._module.controller(name, controllerClass);
        } else {
            this._angularRegister.controller(name, controllerClass as any);
        }
    }

    /** function definition for register directive in angular. ::ng.ICompileProvider.directive()
     * @see http://docs.angularjs.org/api/ng.$compile
     * @see http://docs.angularjs.org/api/ng.$compileProvider
     * @param name Directive name
     * @param directive Directive class
     * @return Compiler provider itself used for register directive or IModule if not found
     * @deprecated for new code, use component instead
     */
    public registerDirective(name: string, directive: ng.Injectable<ng.IDirectiveFactory>): ng.ICompileProvider | ng.IModule {

        if (undefined == this._angularRegister || IS_RUNNING_TESTS) {
            return this._module.directive(name, directive);
        } else {
            return this._angularRegister.directive(name, directive);
        }
    }

    /** function definition for register component in angular. ::ng.ICompileProvider.component()
     * @see http://docs.angularjs.org/api/ng.$compile
     * @see http://docs.angularjs.org/api/ng.$compileProvider
     * @param name Component name
     * @param options Component options
     * @return Compiler provider itself used for register component or IModule if not found
     */
    public registerComponent(name: string, options: ng.IComponentOptions): ng.ICompileProvider | ng.IModule {

        if (undefined == this._angularRegister || IS_RUNNING_TESTS) {
            return this._module.component(name, options);
        } else {
            return this._angularRegister.component(name, options);
        }
    }

    /** function definition for register filter in angular. ::ng.IFilterProvider.register()
     * @see http://docs.angularjs.org/api/ng.$filter
     * @see http://docs.angularjs.org/api/ng.$filterProvider
     * @param name Filter name
     * @param filter Filter class
     * @return Instance of registered filter or instances map of registered filters (if filters map has been provided) or IModule if not found
     */
    public registerFilter(name: string, filter: Function): ng.IServiceProvider | ng.IModule {

        if (undefined == this._angularRegister || IS_RUNNING_TESTS) {
            return this._module.filter(name, filter);
        } else {
            return this._angularRegister.filter(name, filter);
        }
    }

    /** function definition for register a service factory in angular. ::ng.IProvideService.factory()
     * @see http://docs.angularjs.org/api/AUTO.$provide
     * @param name Service factory name
     * @param serviceFactory Service factory (Internally this is an abbreviation for $provide.provider(name, {$get: $getFn}).
     * @return Registered service factory instance or IModule if not found
     */
    public registerFactory(name: string, serviceFactory: Function): ng.IServiceProvider | ng.IModule {

        if (undefined == this._angularRegister || IS_RUNNING_TESTS) {
            return this._module.factory(name, serviceFactory);
        } else {
            return this._angularRegister.factory(name, serviceFactory);
        }
    }

    /** function definition for register a service constructor in angular, which will be invoked with new to create the service instance.
     * ::ng.IProvideService.service()
     * @see http://docs.angularjs.org/api/AUTO.$provide
     * @param name Service constructor name
     * @param service Service class.
     * @return Registered service constructor instance or IModule if not found
     */
    public registerService(name: string, service: Function): ng.IServiceProvider | ng.IModule {

        if (undefined == this._angularRegister || IS_RUNNING_TESTS) {
            return this._module.service(name, service);
        } else {
            return this._angularRegister.service(name, service);
        }
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
            "$translateProvider",
            "$routeProvider",
            "RouteResolverProvider",
            ($controllerProvider: ng.IControllerProvider,
                $compileProvider: ng.ICompileProvider,
                $filterProvider: ng.IFilterProvider,
                $provide: ng.auto.IProvideService,
                $httpProvider: ng.IHttpProvider,
                $translateProvider: ng.translate.ITranslateProvider,
                $routeProvider: ng.route.IRouteProvider,
                $RouteResolverProvider: IRouteResolverProvider
            ) => {

                // asign angular register functions
                this._angularRegister = {
                    component: $compileProvider.component,
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    factory: $provide.factory,
                    filter: $filterProvider.register,
                    service: $provide.service
                };

                // delete angular DOM anotations
                $compileProvider.debugInfoEnabled(false);

                // configure http interceptor
                $httpProvider.interceptors.push("httpInterceptorService");
                $httpProvider.defaults.headers.common = { "Content-Type" : "application/json" };

                // Configure routes
                $RouteResolverProvider.controllersBasePath = "app/controllers/";
                $RouteResolverProvider.viewsBasePath = "app/controllers/";
                RoutesConfig.initialize($routeProvider, $RouteResolverProvider);

                // configure languages
                $translateProvider.fallbackLanguage("en")
                    .preferredLanguage("en");
                // $translateProvider.fallbackLanguage("en")
                // .preferredLanguage("en")
                // .useLoaderCache("$translationCache")
                // .useLoader("$translatePartialLoader", {
                //     urlTemplate: "app/{part}/lang/{lang}.json"
                // })


            }];

        // initialize angular config function
        this._module.config(fn);
    }

    /** Initialize angular 'run' function */
    private _angularRun(): void {

        // crear el array con los parametros que seran inyectados en la funcion de ejecucion y crear la funcion de ejecucion de angular
        // NOTA: la funcion debe contener los parametros a inyectar en el mismo orden
        let fn: any[] =
            ["$rootScope", "$location", "$log", "$injector", "$cacheFactory",
                ($rootScope: ICustomRootScopeService, $location: ng.ILocationService, $log: ng.ILogService, $injector: ng.auto.IInjectorService,
                    $cacheFactory: ng.ICacheFactoryService) => {

                    // guardar variables de aplicacion
                    this._cacheFactory = $cacheFactory;
                    this._logService = $log;

                    this._authenticationService = $injector.get("authenticationService") as IAuthenticationService;
                    this._usersService = $injector.get("usersService") as IUsersService;

                    // Parametros globales
                    this._rootScope = $rootScope;
                    this._rootScope.debugMode = "true" === "<%= DEBUG_MODE %>" as any;
                    this._rootScope.isAuthUser = false;

                    // verify user rol in paths y configure states
                    this._rootScope.$on("$routeChangeStart", (_event: ng.IAngularEvent, _next: IRouteDefinition, _current: IRouteDefinition) => {

                        // set loading on chage route (Should be set to false at the end of initialization on the controllers)
                        this._rootScope.isLoading = true;
                        // set routes en root scope
                        this._rootScope.routes = {
                            current: _next,
                            previous: _current
                        };

                        if (_next && _next.requireUserRole) {

                            // verify allowed roles
                            this._usersService.connectedUser.then((user: IUserModel) => {

                                /* tslint:disable no-bitwise */
                                if (!user || (_next.requireUserRole & user.rol) !== _next.requireUserRole) {
                                    /* tslint:enable no-bitwise */

                                    this._rootScope.$evalAsync(() => {
                                        $location.path("login");
                                    });
                                }
                            });
                        }
                    });

                    this._rootScope.$on("$routeChangeSuccess", (_event: ng.IAngularEvent, _current: IRouteDefinition, _previous: IRouteDefinition) => {
                        this._rootScope.isLoading = false;
                    });

                    this._rootScope.$on("$routeChangeError", (_event: ng.IAngularEvent, _current: IRouteDefinition, _previous: IRouteDefinition,
                        _rejection: any) => {
                        this._rootScope.isLoading = false;
                    });

                }];

        this._module.run(fn);
    }



    private _loadRequiredComponents(ready: Function): void {

        requirejs(["app/services/httpInterceptor.service",
            "app/services/authentication.service",
            "app/services/users.service",
            "app/components/main/mainHeader.component",
            "app/components/main/mainSidebar.component",
            "app/components/main/mainfooter.component"], () => {
                ready();
            });

    }

}


// create main app instance for export
export let angularApp: IAngularApp = new AngularApp();
