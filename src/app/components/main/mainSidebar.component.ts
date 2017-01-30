import { angularApp } from "app/main";


/******************************************
 * Componente
 */

/** @Brief componente con un menu lateral para la pagina principal de la aplicacion
 * @code
 * <main-sidebar></main-sidebar>
 * @endcode
 */
let mainSidebarComponent: ng.IComponentOptions = {
    controller: "mainSidebarComponentController",
    templateUrl: "app/components/main/mainSidebar.component.html"
};

// registrar el componente en la aplicacion
angularApp.registerComponent("mainSidebar", mainSidebarComponent);



/******************************************
 * Controlador
 */


/** @Brief Controlador para el componente 'mainSidebarComponent' */
class MainSidebarComponentController {

    // Servicios
    private _scope: ng.IScope;
    private _attrs: any;
    private _element: JQuery;
    private _parse: ng.IParseService;

    // variables miembro
    private _selectedMenuItem: number;


    constructor($scope: ng.IScope, $attrs: any, $element: JQuery, $parse: ng.IParseService) {

        this._scope = $scope;
        this._attrs = $attrs;
        this._element = $element;
        this._parse = $parse;

        this._init();
    }

    public isSelectedMenuItem(index: number): boolean {
        return this._selectedMenuItem === index;
    }

    public selectMenuItem(index: number): void  {
        this._selectedMenuItem = index;
    }


    private _init(): void {
        this._selectedMenuItem = 0;
    }
}

// establecer variables a inyectar en el controlador
// NOTA: (Deben seguir el mismo orden que el constructor del controlador)
MainSidebarComponentController.$inject = ["$scope", "$attrs", "$element", "$parse"];
angularApp.registerController("mainSidebarComponentController", MainSidebarComponentController);



