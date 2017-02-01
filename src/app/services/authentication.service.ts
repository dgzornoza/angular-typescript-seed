import { angularApp } from "app/main";
import * as angular from "angular";

import { ILoginModel, ILoginResponseModel } from "app/models/authentications";

const LOCAL_STORAGE_AUTH_KEY: string = "authorizationData";

/** Evento en rootscope para registrarse que sera invocado al realizarse un login */
export const EVT_LOGIN: string = "authentication.service.evt.login";
/** Evento en rootscope para registrarse que sera invocado al realizarse un logout */
export const EVT_LOGOUT: string = "authentication.service.evt.logout";

export interface  IAuthenticationService {

    /** Propiedad (ReadOnly) para obtener los datos de autenticacion del usuario actual */
    readonly AuthenticationData: ILoginResponseModel;

    /** Funcion para intentar añadir una cabecera de autenticacion en una peticion http
     * @param header cabecera http donde sera añadida la autenticacion
     * @return true si se ha podido añadir la cabecera, false en caso contrario
     */
    tryAddAuthToHttpHeader(header: ng.IHttpRequestConfigHeaders): boolean;

    /** Funcion para relizar un login de un usuario
     * @param loginData modelo con los datos del login
     * @return Promesa con un modelo de respuesta del login
     */
    login(loginModel: ILoginModel): ng.IPromise<ILoginResponseModel | any>;
    /** Funcion para realizar un logout del usuario actual */
    logOut(): void;
}

class AuthenticationService implements IAuthenticationService {

    // servicios
    private _rootScope: ng.IRootScopeService;
    private _http: ng.IHttpService;
    private _q: ng.IQService;
    private _localStorageService: ng.local.storage.ILocalStorageService;

    constructor($rootScope: ng.IRootScopeService, $http: ng.IHttpService, $q: ng.IQService, localStorageService: ng.local.storage.ILocalStorageService) {

        this._rootScope = $rootScope;
        this._http = $http;
        this._q = $q;
        this._localStorageService = localStorageService;
    }


    public tryAddAuthToHttpHeader(header: ng.IHttpRequestConfigHeaders): boolean {
        let result: boolean = false;

        let authData: any = this.AuthenticationData;
        if (undefined != authData && header) {
            (header as any).Authorization = `Bearer ${authData.Token}`;
            result = true;
        }

        return result;
    }

    public get AuthenticationData(): ILoginResponseModel {
        return this._localStorageService.get(LOCAL_STORAGE_AUTH_KEY) as ILoginResponseModel || undefined;
    }



    public login(loginData: ILoginModel): ng.IPromise<ILoginResponseModel>  {

        angularApp.logService.debug("authentication.service - login ...");

        // eliminar datos de logon si ya se esta logueado
        if (this.AuthenticationData) {
            this.logOut();
        }

        let params: any = {
            grant_type: "password",
            password: loginData.password,
            username: loginData.username
        };

        if (loginData.useRefreshTokens) {
            params.client_id = APP_NAME;
        }

        return this._http({
            data: $.param(params),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
            url: API_BASE_URL + "token"
        })
        .then((resultCallback: ng.IHttpPromiseCallbackArg<any>): ILoginResponseModel => {
            angularApp.logService.debug("authentication.service - login: " + angular.toJson(resultCallback.data));

            let now: Date = new Date();
            let loginResponse: ILoginResponseModel = {
                    lastRequestDateTime: now,
                    loginDateTime: now,
                    refreshToken: loginData.useRefreshTokens ? resultCallback.data.refresh_token : "",
                    token: resultCallback.data.access_token,
                    useRefreshTokens: loginData.useRefreshTokens ? true : false,
                    userName: loginData.username
            };

            this._localStorageService.set(LOCAL_STORAGE_AUTH_KEY, loginResponse);

            this._rootScope.$emit(EVT_LOGIN);

            return loginResponse;
        })
        .catch((reason: any) => {
            angularApp.logService.error("Error: auth.service - login: " + angular.toJson(reason.data));
            this.logOut();
            return this._q.reject(reason);
        });

    }

    public logOut(): void {
        this._localStorageService.remove(LOCAL_STORAGE_AUTH_KEY);

        this._rootScope.$emit(EVT_LOGOUT);
        angularApp.logService.debug("authentication.service - logOut");
    }


};


// NOTA: (Deben seguir el mismo orden que el constructor del viewmodel)
AuthenticationService.$inject = ["$rootScope", "$http", "$q", "localStorageService"];
angularApp.registerService("authenticationService", AuthenticationService);
