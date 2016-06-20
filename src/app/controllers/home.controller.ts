import { app } from "app/main";

class HomeController {

    // services
    private _scope: ng.IScope;

    /** Constructor por defecto de la clase */
    constructor($scope: ng.IScope) {
        this._scope = $scope;
    }


}

// establecer variables a inyectar en el viewmodel
// NOTA: (Deben seguir el mismo orden que el constructor del viewmodel)
HomeController.$inject = ["$scope"];

// registrar el viewmodel en la aplicacion
app.registerController("HomeController", HomeController);
