
import * as angular from "angular";

/** Model for custom route definition */
export interface RouteDefinition extends ng.route.IRoute {
    /** flag indicating whether the route requires authentication */
    requireAuth: boolean;
}

/** Model for define dynamic routes resolution */
export interface ResolveModel {
    /** path and name relative (without postfix) to the appropriate folder 
     * (must match the path of the view/controller following the convention) 
     */
    path: string;
    /** (optional) alias for controller name used in view 
     * (default will be the same as the class name of controller without the suffix, e.g 'oneController' = 'one') 
     */
    controllerAs?: string;
    /** (optional) flag indicating whether the route requires authentication (default not require authentication) */
    requireAuth?: boolean;
}

/** Interface for declare ::RouteResolver provider */
export interface RouteResolverProvider extends ng.IServiceProvider {
    /** Property for the controllers base path */
    controllersBasePath: string;

    /** Property for the views base path */
    viewsBasePath: string;

    /** Function to create a route definition that will be used by AngularJS to solve views/controllers dynamically using RequireJS
     * @param _data ::ResolveModel defining a route
     * @return Route definition for use in the angular route provider
     */
    resolve(_data: ResolveModel): RouteDefinition;
}

/** @Brief Class to implement the routing system in Views/Controllers of the application,
 * the class uses the angular route provider allowing loading angular views and controllers dynamically.
 * @remarks The class uses the convention over configuration to manage views and controllers,
 * you can specify the directory for views/controllers to create the instance,
 * but the names of controllers must be contain the suffix '.controllers'
 * In addition to follow the convention used in script files, file names begin with a lowercase letter, 
 * in the case of controllers models start with a lowercase letter but the class must begin with a capital letter.
 * The alias of the controllers in the view, will be the same as the class name of controller without the suffix,
 * e.g 'oneController' = 'one'
 */
class RouteResolver implements RouteResolverProvider {

    private _controllersBasePath: string = "";
    private _viewsBasePath: string = "";


    public $get(): RouteResolverProvider {
        return this;
    };


    public get controllersBasePath(): string {
        return this._controllersBasePath;
    }
    public set controllersBasePath(controllersBasePath: string) {
        this._controllersBasePath = controllersBasePath.ensureSlash();
    }

    public get viewsBasePath(): string {
        return this._viewsBasePath;
    }
    public set viewsBasePath(viewsBasePath: string) {
        this._viewsBasePath = viewsBasePath.ensureSlash();
    }

    public resolve(data: ResolveModel): RouteDefinition {

        let viewPath: string = this._viewsBasePath + data.path + ".html";
        let controllerPath: string = this._viewsBasePath + data.path + ".controller.js";
        let controllerName: string = data.path.split("/").pop();
        let controllerClass: string = controllerName.charAt(0).toUpperCase() + controllerName.slice(1) + "Controller";

        // create return object with route definition
        let route: RouteDefinition = {
            // HACK: set 'as' also in the controller, in some frameworks like Ionic does not work 'controllerAs'
            controller: controllerClass + " as " + data.controllerAs,
            controllerAs: data.controllerAs,
            requireAuth: (data.requireAuth) ? data.requireAuth : false,
            resolve:
            {
                load: ["$q", "$rootScope", ($q: ng.IQService, $rootScope: ng.IRootScopeService) => {

                        let defer: angular.IDeferred<{}> = $q.defer();

                        // load async with requirejs
                        requirejs([controllerPath], () => {
                            defer.resolve();
                            // $rootScope.$apply();
                        });

                        // return promise
                        return defer.promise;
                    }]
            },
            templateUrl: viewPath
        };

        return route;
    }
}

// Must be a provider since it will be injected into module.config()    
angular.module(`${APP_NAME}.routeResolverService`, []).provider("RouteResolver", RouteResolver);
