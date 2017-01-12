import { app } from "app/main";
import "angular";

import "app/services/authentication.service";

import { IAuthenticationService, EVT_LOGIN, EVT_LOGOUT } from "app/services/authentication.service";
import { IUserModel } from "app/models/users";

/** Evento en rootscope para registrarse que sera invocado al cargarse los datos con la informacion del usuario */
export const EVT_USERINFO_LOADED: string = "user.service.evt.userinfo_loaded";

export interface IUsersService {

    readonly connectedUser: ng.IPromise<IUserModel>;

    getUsers(): ng.IPromise<IUserModel[]>;
};

class UsersService implements IUsersService {

    // servicios
    private _rootScope: ng.IRootScopeService;
    private _http: ng.IHttpService;
    private _q: ng.IQService;
    private _authenticationService: IAuthenticationService;

    // variables miembro
    private _connectedUser: IUserModel;

    constructor($rootScope: ng.IRootScopeService, $http: ng.IHttpService, $q: ng.IQService, authenticationService: IAuthenticationService) {

        this._rootScope = $rootScope;
        this._http = $http;
        this._q = $q;
        this._authenticationService = authenticationService;

        this._init();
    }


    public get connectedUser(): ng.IPromise<IUserModel> {

        let deferred: angular.IDeferred<IUserModel> = this._q.defer();

        // si existen datos de autenticacion y no del usuario conectado, es por que aun no se a invocado el servicio, de modo que
        // se suscribe al evento ocurrido al obtenerse los datos de usuario
        if (this._authenticationService.AuthenticationData !== undefined && this._connectedUser == undefined) {

            let unwatchEvt: Function = this._rootScope.$on(EVT_USERINFO_LOADED, () => {

                // eliminar el registro del evento
                unwatchEvt();
                deferred.resolve(this._connectedUser);
            });

        } else {
            deferred.resolve(this._connectedUser);
        }

        return deferred.promise;
    }


    public getUsers(): ng.IPromise<IUserModel[]> {

        return this._http({
                headers: { "Content-Type": "application/json" },
                method: "GET",
                url: BASE_URL + "content/mocks/users.json"
            }).then((successCallback: ng.IHttpPromiseCallbackArg<IUserModel[]>): IUserModel[] => {

                return successCallback.data;

            }).catch((reason: any) => {

                return this._q.reject(reason);

            });

    }


    private _init(): void {

        if (this._authenticationService.AuthenticationData !== undefined) {
            this._readConnectedUserInfo();
        }

        this._rootScope.$on(EVT_LOGIN, () => {
            this._readConnectedUserInfo();
        });

        this._rootScope.$on(EVT_LOGOUT, () => {
            this._connectedUser = undefined;
        });
    }

    private _readConnectedUserInfo(): ng.IPromise<void> {

        app.logService.debug("user.service - _readConnectedUserInfo: ...");

        return this._http({
                headers: { "Content-Type": "application/json" },
                method: "GET",
                url: BASE_URL + "content/mocks/userInfo.json"
            })
            .then((resultCallback: ng.IHttpPromiseCallbackArg<IUserModel>): void => {
                app.logService.debug("user.service - _readConnectedUserInfo: " + angular.toJson(resultCallback.data));
                this._connectedUser = resultCallback.data;
            })
            .catch((reason: any) => {
                app.logService.error("Error: usuario.service - _readConnectedUserInfo: " + angular.toJson(reason.data));
                this._connectedUser = undefined;
            })
            .finally(() => { this._rootScope.$emit(EVT_USERINFO_LOADED); });
    }
}

// NOTA: (Deben seguir el mismo orden que el constructor del viewmodel)
UsersService.$inject = ["$rootScope", "$http", "$q", "authenticationService"];
app.registerService("usersService", UsersService);
