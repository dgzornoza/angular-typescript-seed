import { angularApp } from "app/main";



/******************************************
 * Componente
 */

/** @Brief componente con un footer para la pagina principal de la aplicacion
 * @code
 * <main-footer></main-footer>
 * @endcode
 */
let mainFooterComponent: ng.IComponentOptions = {
    controller: "mainFooterComponentController",
    templateUrl: "app/components/main/mainFooter.component.html"
};

// registrar el componente en la aplicacion
angularApp.registerComponent("mainFooter", mainFooterComponent);



/******************************************
 * Controlador
 */


/** @Brief Controlador para el componente 'mainFooterComponent' */
class MainFooterComponentController {

    // Servicios
    private _scope: ng.IScope;
    private _attrs: any;
    private _element: JQuery;
    private _parse: ng.IParseService;

    // variables miembro
    // ...

    constructor($scope: ng.IScope, $attrs: any, $element: JQuery, $parse: ng.IParseService) {

        this._scope = $scope;
        this._attrs = $attrs;
        this._element = $element;
        this._parse = $parse;

        this._init();
    }


    private _init(): void {
        //
    }
}

// establecer variables a inyectar en el controlador
// NOTA: (Deben seguir el mismo orden que el constructor del controlador)
MainFooterComponentController.$inject = ["$scope", "$attrs", "$element", "$parse"];
angularApp.registerController("mainFooterComponentController", MainFooterComponentController);



