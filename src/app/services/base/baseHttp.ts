import { app } from "app/main";
import "angular";


/** Clase base para encapsular las peticiones HTTP */
export class BaseHttp {

    // servicios
    protected _http: ng.IHttpService;
    protected _q: ng.IQService;

    // variables miembro

    constructor($http: ng.IHttpService, $q: ng.IQService) {

        this._http = $http;
        this._q = $q;
    }

    protected httpGet<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {
        app.logService.debug(`${url}: ...`);
        return this._httpCall(this._http.get(url, config), url);
    }

    protected httpPost<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {
        app.logService.debug(`${url}: ...`);
        return this._httpCall(this._http.post(url, data, config), url);
    }

    protected httpPut<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {
        app.logService.debug(`${url}: ...`);
        return this._httpCall(this._http.put(url, data, config), url);
    }

    protected httpDelete<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {
        app.logService.debug(`${url}: ...`);
        return this._httpCall(this._http.delete(url, config), url);
    }



    private _httpCall<T>(httpFn: ng.IHttpPromise<T>, url: string): ng.IPromise<T> {

        return httpFn.then((result: ng.IHttpPromiseCallbackArg<T>): T => {
            app.logService.debug(`OK: ${url}: ${angular.toJson(result.data)}`);
            return result.data;
        })
            .catch((reason: any) => {
                app.logService.error(`Error - ${url}: ${angular.toJson(reason.data)}`);
                return this._q.reject(reason);
            });
    }
}
