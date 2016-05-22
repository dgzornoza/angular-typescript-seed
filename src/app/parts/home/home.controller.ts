import { app } from "app";

class HomeController {

    /** Constructor por defecto de la clase */
    constructor($scope: ng.IScope) {
    }


}

// establecer variables a inyectar en el viewmodel
// NOTA: (Deben seguir el mismo orden que el constructor del viewmodel)
HomeController.$inject = ["$scope"];

// registrar el viewmodel en la aplicacion
app.registerController("HomeController", HomeController);
