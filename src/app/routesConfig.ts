import { IRouteResolverProvider } from "app/services/routeResolver.provider";

export class RoutesConfig {

    /** Function for initialize app routes */
    public static initialize(routeProvider: ng.route.IRouteProvider, routeResolverProvider: IRouteResolverProvider): void {

    routeProvider
        .when("/home", routeResolverProvider.resolve({ controllerAs: "Home", path: "home/home" }))
        .otherwise({ redirectTo: "/home" });
    }
}
