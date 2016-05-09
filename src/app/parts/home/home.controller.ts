import * as angular from "angular";
import { App } from "../../app";

class HomeController
{
    
    /** Constructor por defecto de la clase */
    constructor(private $scope: ng.IScope)
    {
        alert("HomeController");
    }


}

// establecer variables a inyectar en el viewmodel
// NOTA: (Deben seguir el mismo orden que el constructor del viewmodel)
HomeController.$inject = ["$scope"];

// registrar el viewmodel en la aplicacion
App.registerController("HomeController", HomeController);
