import { app } from "app/main";

class HomeController {

    // services
    private _scope: ng.IScope;

    /** Constructor por defecto de la clase */
    constructor($scope: ng.IScope) {
        this._scope = $scope;
    }

    public test(){
        //
    }
}

// establecer variables a inyectar en el controlador
// NOTA: (Deben seguir el mismo orden que el constructor del controlador)
HomeController.$inject = ["$scope"];

// registrar el controlador en la aplicacion
app.registerController("homeController", HomeController);
