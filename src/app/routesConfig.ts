import { IRouteResolverProvider } from "app/services/routeResolver.provider";

export class RoutesConfig {

    /** Function for initialize app routes */
    public static initialize(routeProvider: ng.route.IRouteProvider, routeResolverProvider: IRouteResolverProvider): void {

        // DEFAULT
        routeProvider.otherwise({ redirectTo: "/home" });

        // MAIN ROUTES
        routeProvider.when("/about", routeResolverProvider.resolve({ controllerAs: "vm", path: "about" }));
        routeProvider.when("/contact", routeResolverProvider.resolve({ controllerAs: "vm", path: "contact" }));
        routeProvider.when("/home", routeResolverProvider.resolve({ controllerAs: "vm", path: "home" }));
        routeProvider.when("/users", routeResolverProvider.resolve({ controllerAs: "vm", path: "users" }));

    }
}
