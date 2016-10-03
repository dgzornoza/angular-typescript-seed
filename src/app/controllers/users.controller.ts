import { app } from "app/main";

import "app/services/users.service";

import { IUserModel } from "app/models/users";
import { IUsersService } from "app/services/users.service";

export interface IUsersController {
        Users: IUserModel[];
}



/** Users Controller */
class UsersController implements IUsersController {

    // services
    private _scope: ng.IScope;
    private _usersService: IUsersService;

    // variables miembro
    private _users: IUserModel[];

    constructor($scope: ng.IScope, usersService: IUsersService) {
        this._scope = $scope;
        this._usersService = usersService;

        this._users = [];

        this._init();
    }

    /** Users */
    public get Users(): IUserModel[] {
        return this._users;
    }


    private _init(): void {

        this._usersService.getUsers().then((resultCallback: IUserModel[]) => {
            this._users = resultCallback;
        });
    }

}

// establecer variables a inyectar en el controlador
// NOTA: (Deben seguir el mismo orden que el constructor del controlador)
UsersController.$inject = ["$scope", "usersService"];

// registrar el controlador en la aplicacion
app.registerController("usersController", UsersController);
