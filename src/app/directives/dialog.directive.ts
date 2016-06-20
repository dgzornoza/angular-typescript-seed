import { app } from "app/main";
import "angular";


/** Interface para definir los atributos de la directiva */
interface IDirectiveAttributes extends ng.IAttributes {

    /** atributo 'keyboard' indicando si la tecla scape puede cerrar el dialogo = true, false en caso contrario */
    keyboard: string;
    /** atributo 'backdrop', posibles valores:
     * true - muestra una capa oscura de fondo
     * false - sin capa oscura de fondo (transparente)
     * static - no se permite cerrar el dialogo al realizar click fuera de el.
     */
    backdrop: string;
    /** Atributo 'visible' propiedad booleana para mostrar/ocultar el dialogo */
    visible: string;
    /** Atributo 'shown-cmd' con la funcion del comando que sera invocada tras abrirse el dialogo */
    shownCmd: string;
    /** Atributo 'hidden-cmd' con la funcion del comando que sera invocada tras cerrarse el dialogo */
    hiddenCmd: string;
}


/******************************************
 * Directiva
 */

/** @Brief directiva personalizada para crear una ventana con un dialogo de bootstrap
 * @code
 *   <dialog data-visible="vm.ShowModal" data-shown-cmd="vm.modalShownCmd()" data-hidden-cmd="vm.modalHiddenCmd()" data-backdrop="static" data-keyboard="true" >
 *      <dialog-header>Titulo del dialogo</dialog-header>
 *      <dialog-body>
 *          <h3>Cuerpo del dialogo</h3>
 *      </dialog-body>
 *      <dialog-footer>
 *          <button class="btn btn-primary"  ng-click="vm.saveCmd()">Guardar</button>
 *      </dialog-footer>
 *   </dialog>
 * @endcode
 */
let dialogDirective: Function = (): ng.IDirective => {
    // crear y retornar el objeto con la directiva
    return {
        // enlazar propiedades del controlador de la directiva
        bindToController: {
            Visible: "=visible",
            hiddenCmd: "&",
            shownCmd: "&"
        },
        // controlador de la directiva
        controller: "DialogDirectiveController as dialog",
        // reemplazar el tag de la directiva
        replace: true,
        // Solo puede usarse en tags
        restrict: "E",
        // obtener un nuevo ambito (sin estar enlazado al controlador padre)
        scope: {},
        // plantilla para la directiva
        template:
`<div class="modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" ng-transclude></div>
    </div>
</div>`,
        // Transclusion del contenido
        transclude: true
    };
};

// registrar la directiva en la aplicacion
app.registerDirective("dialog", dialogDirective);


/******************************************
 * Controlador
 */

/** @Brief Controlador para la directiva 'dialogDirective' */
class DialogDirectiveController {

    /** binding de expresiones de la directiva */
    public shownCmd: Function;
    public hiddenCmd: Function;

    // Servicios
    private _scope: ng.IScope;
    private _attrs: IDirectiveAttributes;
    private _element: JQuery;
    private _parse: ng.IParseService;

    // variables miembro
    private _initialized: boolean;
    private _visible: boolean;

    constructor($scope: ng.IScope, $attrs: IDirectiveAttributes, $element: JQuery, $parse: ng.IParseService) {

        this._scope = $scope;
        this._attrs = $attrs;
        this._element = $element;
        this._parse = $parse;

        this._initialized = false;

        this._init();
    }


    public get Visible(): boolean {
        return this._visible;
    }
    public set Visible(flag: boolean) {
        if (flag === this._visible) { return; }
        this._visible = flag;

        if (this._initialized) { this._element.modal(this._visible ? "show" : "hide"); }
    }


    private _init(): void {

        // crear dialogo modal de bootstrap
        this._element.modal({
            backdrop: this._attrs.backdrop === "static" ? "static" : this._attrs.backdrop === "true" ? true : false,
            keyboard: this._attrs.keyboard === "true",
            show: false
        } as any);

        // evento de bootstrap ocurrido al mostrarse el dialogo
        this._element.on("shown.bs.modal", () => {
            let fn: any = () => {
                this._visible = true;
                this.shownCmd();
            };

            if (this._scope.$parent.$$phase) { fn(); } else { this._scope.$apply(fn); }
        });

        // evento de bootstrap ocurrido al ocultarse el dialogo
        this._element.on("hidden.bs.modal", () => {
            let fn: any = () => {
                this._visible = false;
                this.hiddenCmd();
            };

            if (this._scope.$parent.$$phase) { fn(); } else { this._scope.$apply(fn); }
        });

        this._initialized = true;
    }
}

// establecer variables a inyectar en el controlador
// NOTA: (Deben seguir el mismo orden que el constructor del controlador)
DialogDirectiveController.$inject = ["$scope", "$attrs", "$element", "$parse"];
app.registerController("DialogDirectiveController", DialogDirectiveController);




/******************************************
 * Directivas del dialogo internas
 */

let dialogHeaderDirective: Function = (): ng.IDirective => {
    return {
        replace: true,
        restrict: "E",
        template:
`<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><ng-transclude></ng-transclude></h4>
</div>`,
        transclude: true
    };
};
// registrar la directiva en la aplicacion
app.registerDirective("dialogHeader", dialogHeaderDirective);



let dialogBodyDirective: Function = (): ng.IDirective => {
    return {
        replace: true,
        restrict: "E",
        template: `<div class="modal-body" ng-transclude></div>`,
        transclude: true
    };
};
// registrar la directiva en la aplicacion
app.registerDirective("dialogBody", dialogBodyDirective);



let dialogFooterDirective: Function = (): ng.IDirective => {
    return {
        replace: true,
        restrict: "E",
        template: '<div class="modal-footer" ng-transclude></div>',
        transclude: true
    };
};
// registrar la directiva en la aplicacion
app.registerDirective("dialogFooter", dialogFooterDirective);




