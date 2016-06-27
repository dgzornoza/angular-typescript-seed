import { app } from "app/main";
import "angular";


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

    private _q: ng.IQService;
    private _location: ng.ILocationService;
    private _injector: ng.auto.IInjectorService;

    constructor($q: ng.IQService, $location: ng.ILocationService, $injector: ng.auto.IInjectorService) {
        this._q = $q;
        this._location = $location;
        this._injector = $injector;
    }

    // implement when use
    // public request: any = (config: ng.IRequestConfig): ng.IRequestConfig | ng.IPromise<ng.IRequestConfig> => {
    // }

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
                    if (match[0] === "0001-01-01T00:00:00") {
                        obj[key] = undefined;
                    } else {

                        let milliseconds: number = Date.parse(match[0]);
                        if (!isNaN(milliseconds)) {

                            let utcDate: Date = new Date(milliseconds);
                            // convertir utc en GTM local
                            obj[key] = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
                        }
                    }
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
app.module.service("httpInterceptorService", HttpInterceptorService);









