import { angularApp } from "app/main";
import "angular";

import "app/services/authentication.service";

import { BaseHttp } from "app/services/common/baseHttp";
import { IAuthenticationService, EVT_LOGIN, EVT_LOGOUT } from "app/services/authentication.service";
import { IUserModel } from "app/models/users";

/** Evento en rootscope para registrarse que sera invocado al cargarse los datos con la informacion del usuario */
export const EVT_USERINFO_LOADED: string = "user.service.evt.userinfo_loaded";

export interface IUsersService {

    readonly connectedUser: ng.IPromise<IUserModel>;

    getUsers(): ng.IPromise<IUserModel[]>;
};

class UsersService extends BaseHttp implements IUsersService {

    // servicios
    private _rootScope: ng.IRootScopeService;
    private _authenticationService: IAuthenticationService;

    // variables miembro
    private _connectedUser: IUserModel;

    constructor($rootScope: ng.IRootScopeService, $http: ng.IHttpService, $q: ng.IQService, authenticationService: IAuthenticationService) {
        super($http, $q);

        this._rootScope = $rootScope;
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

        let url: string = `${BASE_URL}content/mocks/users.json`;

        return this.httpGet<IUserModel[]>(url);
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

        let url: string = `${BASE_URL}content/mocks/userInfo.json`;

        return this.httpGet<IUserModel>(url)
            .then((resultCallback: ng.IHttpPromiseCallbackArg<IUserModel>): void => {
                this._connectedUser = resultCallback.data;
            })
            .catch(() => {
                this._connectedUser = undefined;
            })
            .finally(() => { this._rootScope.$emit(EVT_USERINFO_LOADED); });
    }
}

// NOTA: (Deben seguir el mismo orden que el constructor del viewmodel)
UsersService.$inject = ["$rootScope", "$http", "$q", "authenticationService"];
angularApp.registerService("usersService", UsersService);
