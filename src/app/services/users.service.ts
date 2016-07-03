import { app } from "app/main";

import { IUserModel } from "app/models/users";

/**
 * Servicio para la gestion de usuarios
 */
export interface IUsersService {

    /**
     * Funcion para obtener los usuarios desde el servidor
     * @return Array de modelos de usuarios obtenidos
     */
    getUsers(): ng.IPromise<IUserModel[]>;
}

class UsersService implements IUsersService {

    // servicios
    private _http: ng.IHttpService;
    private _q: ng.IQService;

    constructor($http: ng.IHttpService, $q: ng.IQService) {
        this._http = $http;
        this._q = $q;
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

}

// establecer variables a inyectar en el viewmodel
// NOTA: (Deben seguir el mismo orden que el constructor del viewmodel)
UsersService.$inject = ["$http", "$q"];

// registrar el servicio en la aplicacion
app.registerService("usersService", UsersService);
