import { angularApp } from "app/main";
import "angular";

import "app/services/authentication.service";
import { IAuthenticationService } from "app/services/authentication.service";

// http://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
/* tslint:disable max-line-length */
const REGEX_ISO8601: RegExp = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
/* tslint:enable max-line-length */

/**
 * Service to implement the HTTP angular interception and allow to add logic in requests and responses.
 * @remarks This service can only be used by injection at http angular provider in the configuration function:
 * https://docs.angularjs.org/api/ng/service/$http
 */
class HttpInterceptorService implements ng.IHttpInterceptor {

    // Services
    private _q: ng.IQService;
    private _location: ng.ILocationService;
    private _injector: ng.auto.IInjectorService;

    // members
    private _authenticationService: IAuthenticationService;

    constructor($q: ng.IQService, $location: ng.ILocationService, $injector: ng.auto.IInjectorService) {
        this._q = $q;
        this._location = $location;
        this._injector = $injector;
    }

    public request: any = (config: ng.IRequestConfig): ng.IRequestConfig | ng.IPromise<ng.IRequestConfig> => {

        config.headers = config.headers || {};
        config.params = config.params || {};

        // configurar token de autenticacion
        this.AuthService.tryAddAuthToHttpHeader(config.headers);

        // configurar cache para la peticion
        this._configureRequestCache(config);

        return config;
    }

    // implement when use
    // public requestError: any = (rejection: any): any => {
    // }

    public response: any = <T>(response: ng.IHttpPromiseCallbackArg<T>): ng.IPromise<ng.IHttpPromiseCallbackArg<T>> | ng.IHttpPromiseCallbackArg<T> => {

        // Las fechas del servidor son guardadas en UTC, de modo que se convierten las cadenas de fechas json (en UTC) en objetos de fecha local (en GTM)
        // usadas por el navegador y angular material
        this._convertUTCDateStringsToLocalDateObjects(response.data);
        return response;

    }

    // implement when use
    // public responseError: any = (rejection: any): any => {
    // }


    private get AuthService(): IAuthenticationService {

        if (undefined == this._authenticationService) { this._authenticationService = this._injector.get("authenticationService") as IAuthenticationService; }
        return this._authenticationService;
    }

    private _configureRequestCache(config: ng.IRequestConfig): void {

        // regex path web service (Change 'api' for web service path)
        let webApiRegex: RegExp = /^.*\/api\/(.(?!cache=true))*$/;

        // default GET method will not be cached in calls to WebServices, unless implicitly contain the parameter 'cache = true'
        if (config.method === "GET" && config.params && (webApiRegex.test(config.url))) {
            config.params._v = Date.now();
        }
    }

    private _convertUTCDateStringsToLocalDateObjects(obj: any): void {

        if (typeof obj !== "object") { return; }

        for (let key in obj) {

            if (!obj.hasOwnProperty(key)) { continue; }

            let value: any = obj[key];
            // las fechas vienen de los servicios en cadenas
            if (typeof value === "string") {

                // expresion regular para coincidencia con las cadenas de fechas para ISO 8601
                let match: RegExpMatchArray = value.match(REGEX_ISO8601);

                if (match) {
                    // HACK: las fechas '0001-01-01T00:00:00' son consideradas como nulas
                    obj[key] = match[0] === "0001-01-01T00:00:00" ? undefined : new Date(match[0]);
                }

            } else if (typeof value === "object") {
                // recursividad
                this._convertUTCDateStringsToLocalDateObjects(value);
            }
        }
    }

}

// NOTA: (Deben seguir el mismo orden que el constructor del viewmodel)
HttpInterceptorService.$inject = ["$q", "$location", "$injector"];
angularApp.module.service("httpInterceptorService", HttpInterceptorService);









