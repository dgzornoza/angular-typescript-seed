import { angularApp } from "app/main";
import { infraestructure } from "app/infraestructure";

import { IUserModel } from "app/models/users.d";
import { EVT_USERINFO_LOADED } from "app/services/users.service";


/******************************************
 * Componente
 */

/** @Brief componente con una cabecera para la pagina principal de la aplicacion
 * @code
 * <main-header></main-header>
 * @endcode
 */
let mainHeaderComponent: ng.IComponentOptions = {
    controller: "mainHeaderComponentController",
    templateUrl: "app/components/main/mainHeader.component.html"
};

// registrar el componente en la aplicacion
angularApp.registerComponent("mainHeader", mainHeaderComponent);



/******************************************
 * Controlador
 */


/** @Brief Controlador para el componente 'mainHeaderComponent' */
class MainHeaderComponentController {

    // redefinir metodos en el controlador para usar por la vista
    public enumUserRoles: any = infraestructure.enumUserRoles;

    // Servicios
    private _scope: ng.IScope;
    private _attrs: any;
    private _element: JQuery;
    private _parse: ng.IParseService;

    // variables miembro
    private _userModel: IUserModel;


    constructor($scope: ng.IScope, $attrs: any, $element: JQuery, $parse: ng.IParseService) {

        this._scope = $scope;
        this._attrs = $attrs;
        this._element = $element;
        this._parse = $parse;

        this._init();
    }


    public get CurrentUser(): IUserModel {
        return this._userModel;
    }


    public LogoutCmd(): void {
        angularApp.authenticationService.logOut();
        // ir a la pagina principal (refrescando la URL)
        location.replace("/");
    }


    private _init(): void {

        angularApp.rootScopeService.$on(EVT_USERINFO_LOADED, () => {
            this._scope.$applyAsync(() => {
                angularApp.usersService.connectedUser.then((user: IUserModel) => {
                    this._userModel = user;
                });
            });
        });
    }
}

// establecer variables a inyectar en el controlador
// NOTA: (Deben seguir el mismo orden que el constructor del controlador)
MainHeaderComponentController.$inject = ["$scope", "$attrs", "$element", "$parse"];
angularApp.registerController("mainHeaderComponentController", MainHeaderComponentController);



