import { BaseController } from "app/_common/baseController";

/** Servicio personalizado para los parametros de ruta del controlador */
export interface IDetailsRouteParamsService extends ng.route.IRouteParamsService {
    idEdit: string;
}

export interface IDetailsScope extends ng.IScope {
    detailsForm: ng.IFormController;
}


/** Clase base para usar por controladores que implementan un formulario con detalles de un elemento de lista
 * @tparam T Tipo del modelo usado en el detalle
 */
export class BaseDetailsController<T> extends BaseController<IDetailsScope> {

    // servicios
    // ...

    // miembros
    protected _viewUids: string[];
    protected _id: string;
    protected _details: T;

    protected _onSave: () => ng.IPromise<void>;
    protected _onCanSave: () => boolean;

    /** Constructor por defecto de la clase */
    constructor($scope: IDetailsScope, $injector: ng.auto.IInjectorService) {
        super($scope, $injector);

        this._details = {} as T;
        this._id = ($injector.get("$routeParams") as IDetailsRouteParamsService).idEdit || "";

        this._activeRequest = false;

        // establecer el formulario del controlador que herede de esta clase
        // NOTA: debera usarse la convencion "NombreClaseControlador" + "Form", ej: TimelinesDetailControllerForm
        this._scope.$on("$viewContentLoaded", () => {
            this._scope.detailsForm = this._scope[(this.constructor as any).name + "Form"];
        });
    }


    public get details(): T {
        return this._details;
    }
    public set details(details: T) {
        this._details = details;
    }

    public get isNew(): boolean {
        return this._id ? false : true;
    }


    public saveCmd(): void {
        this._executeCmd(this._onSave);
    }
    public saveCanCmd(): boolean {
        let validForm: boolean = this._scope.detailsForm && !this._scope.detailsForm.$invalid;
        return !this._activeRequest && validForm && (this._onCanSave ? this._onCanSave.apply(this) : true);
    }

    /** Funcion para obtener un identificador unico para la vista mediante su indice
     * @param index indice del identificador a obtener
     * @remarks para usar esta funcion primero deberan crearse los identificadores mediante la funcion '_createViewUids' (generalmente en una funcion _init())
     */
    public getViewUid(index: number): string {
        return this._viewUids[index];
    }

    /** Funcion para crear identificadores unicos que pueden ser usados en la vista
     * Mediante esta funcion se evita usar identificadores fijos, permitiendo que componentes hereden de esta clase y puedan usarse conjuntamente.
     * @param lenght numero de identificadores que seran creados
     * @remarks esta funcion generalmente es invocada en una funcion _init() en caso de querer hacer uso de identificadores. Los identificadores
     * se podran obtener mediante un indice usando la funcion getViewUid(index: number);
     */
    protected _createViewUids(count: number): void {
        // Crear identificadores unicos
        this._viewUids = [];
        for (let index: number = 0; index < count; index++) {
            // this._viewUids.push(`viewUid_${new Date().valueOf()}`);
            this._viewUids.push(`viewUid_${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`);
        }
    }
}

