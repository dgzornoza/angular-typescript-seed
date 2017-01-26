import * as angular from "angular";
import { infraestructure } from "app/infraestructure";

/** Interface for custom route definition model */
export interface IRouteDefinition extends ng.route.IRoute {
    /** (optional) user rol required for path access */
    requireUserRole?: infraestructure.enumUserRoles;
    /** (optional) route title */
    title?: string;
    /** (optional) route subtitle */
    subtitle?: string;
}

/** Interface for define dynamic routes model resolution */
export interface IResolveModel {
    /** path and name relative (without postfix) to the appropriate folder
     * (must match the path of the view/controller following the convention)
     */
    path: string;
    /** (optional) alias for controller name used in view
     * (default will be the same as the class name of controller without the suffix, e.g 'oneController' = 'one')
     */
    controllerAs?: string;
    /** (optional) roles de usuario requeridos para el acceso a la ruta */
    requireUserRole?: infraestructure.enumUserRoles;
    /** (optional) route title */
    title?: string;
    /** (optional) route subtitle */
    subtitle?: string;
}

/** Interface for declare ::RouteResolver provider */
export interface IRouteResolverProvider extends ng.IServiceProvider {
    /** Property for the controllers base path */
    controllersBasePath: string;

    /** Property for the views base path */
    viewsBasePath: string;

    /** Function to create a route definition that will be used by AngularJS to solve views/controllers dynamically using RequireJS
     * @param _data ::ResolveModel defining a route
     * @return Route definition for use in the angular route provider
     */
    resolve(_data: IResolveModel): IRouteDefinition;
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
class RouteResolver implements IRouteResolverProvider {

    private _controllersBasePath: string = "";
    private _viewsBasePath: string = "";


    public $get(): IRouteResolverProvider {
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

    public resolve(data: IResolveModel): IRouteDefinition {

        let viewPath: string = BASE_URL + this._viewsBasePath + data.path + ".html";
        let controllerPath: string = BASE_URL + this._controllersBasePath + data.path + ".controller.js";
        let controllerName: string = data.path.split("/").pop();
        let controllerClass: string = controllerName + "Controller";
        // 'controllerAs' default is controller name without 'Controller' prefix
        data.controllerAs = data.controllerAs || controllerName;

        // create return object with route definition
        let route: IRouteDefinition = {
            // HACK: set 'as' also in the controller, in some frameworks like Ionic does not work 'controllerAs'
            controller: controllerClass + " as " + data.controllerAs,
            controllerAs: data.controllerAs,
            requireUserRole: (data.requireUserRole) ? data.requireUserRole : undefined,
            resolve:
            {
                load: ["$q", ($q: ng.IQService) => {

                        let defer: angular.IDeferred<{}> = $q.defer();

                        // load async with requirejs
                        requirejs([controllerPath], () => {
                            defer.resolve();
                        });

                        // return promise
                        return defer.promise;
                    }]
            },
            subtitle: data.subtitle,
            templateUrl: viewPath,
            title: data.title
        };

        return route;
    }
}

// Must be a provider since it will be injected into module.config()
angular.module(`${APP_NAME}.routeResolverService`, []).provider("RouteResolver", RouteResolver);
