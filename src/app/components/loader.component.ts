import { angularApp } from "app/main";
import "angular";


/******************************************
 * Componente
 */

/** @Brief componente personalizado para crear un loader.
 * Para poder implementarlo de forma global, el loader se activa/desactiva mediante la propiedad '$RootScope.IsLoading = true/false' que esta presente
 * en la interface 'ICustomRootScopeService' de app.ts
 * @code
 *   <loader></loader>
 * @endcode
 */
let loaderComponent: Function = (): ng.IComponentOptions => {
    // crear y retornar el objeto con el componente
    return {
        controller: "loaderComponentController",
        template: `
        <div class="black-bg loader">
            <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
        </div>`
    };
};

// registrar la directiva en la aplicacion
angularApp.registerComponent("loader", loaderComponent());


/******************************************
 * Controlador del componente
 */

/** @Brief Controlador para el componente "loaderComponent" */
class LoaderComponentController {

    // Servicios
    private _rootScope: ng.IRootScopeService;
    private _scope: ng.IScope;
    private _element: JQuery;


    constructor($rootScope: ng.IRootScopeService, scope: ng.IScope, element: JQuery) {

        this._rootScope = $rootScope;
        this._scope = scope;
        this._element = element;
        this._init();
    }


    private _init(): void {

        // observar cambios de la propiedad establecida en el atributo 'IsLoading'
        let unwatchProperty: Function = this._rootScope.$watch("IsLoading", (_newValue: boolean, _oldValue: boolean,
            _scope: ng.IScope) => {

            if (_newValue) {
                this._element.show();
            } else {
                this._element.hide();
            }

        });

        // evento ocurrido al eliminarse el controlador
        this._scope.$on("$destroy", () => {
            // eliminar seguimiento de propiedades
            unwatchProperty();
        });

    }
}

// establecer variables a inyectar en el controlador
// NOTA: (Deben seguir el mismo orden que el constructor del controlador)
LoaderComponentController.$inject = ["$rootScope", "$scope", "$element"];
angularApp.registerController("loaderComponentController", LoaderComponentController);


