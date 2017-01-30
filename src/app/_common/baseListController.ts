import { angularApp, enumCacheFactoryKeys } from "app/main";
import { IBaseFilterModel, IRangeListModel, IRangeDynamicListModel } from "app/models/common.d";

import { BaseController } from "app/_common/baseController";


/** Numero de elementos por pagina por defecto */
const PAGE_SIZE: number = 50;


/** Clase base para usar por controladores que implementan listas
 * @tparam T Tipo del modelo usado en los items de la lista
 * @tparam TRangeList tipo de la lista de items, debe heredar de 'IRangeListModel<T> | IRangeDynamicListModel<T>'
 * @tparam TFilter tipo del filtro de lista, debe heredar de IRangeFilterModel<number>>
 */
export class BaseListController<T, TRangeList extends IRangeListModel<T> | IRangeDynamicListModel<T>, TFilter extends IBaseFilterModel>
    extends BaseController<ng.IScope>  {

    // servicios
    protected _uibModalService: ng.ui.bootstrap.IModalService;

    // miembros
    protected _listStateProperties: IListStateProperties<TFilter>;
    protected _rangeList: TRangeList;
    protected _activeRequest: boolean;

    protected _onFilter: () => ng.IPromise<any>;
    protected _onCanFilter: () => boolean;
    protected _onNew: (id?: number) => ng.IPromise<any>;
    protected _onCanNew: () => boolean;
    protected _onEdit: (id: number) => ng.IPromise<any>;
    protected _onCanEdit: () => boolean;
    protected _onDelete: (id: number) => ng.IPromise<any>;
    protected _onCanDelete: () => boolean;
    protected _onClone: (id: number) => ng.IPromise<any>;
    protected _onCanClone: () => boolean;

    /** Constructor por defecto de la clase */
    constructor($scope: ng.IScope, $injector: ng.auto.IInjectorService) {
        super($scope, $injector);

        this._rangeList = {
            rangeItems: [],
            totalFilteredItems: 0,
            totalItems: 0
        } as TRangeList;

        this._uibModalService = $injector.get("$uibModal") as ng.ui.bootstrap.IModalService;

        this._configureFilterCache();
    }

    public get listStateProperties(): IListStateProperties<TFilter> {
        return this._listStateProperties;
    }
    public set listStateProperties(properties: IListStateProperties<TFilter>) {
        this._listStateProperties = properties;
    }

    public get totalFilteredItems(): number {
        return this._rangeList.totalFilteredItems;
    }
    public get totalItems(): number {
        return this._rangeList.totalItems;
    }

    public get rangeItems(): T[] | IDynamic<T> {
        return this._rangeList.rangeItems;
    }


    public toggleFilterVisibilityCmd(): void {
        this._listStateProperties.filterVisibility = !this._listStateProperties.filterVisibility;
    }

    public newCmd(id: number): void {
        this._executeCmd(this._onNew, id);
    }
    public newCanCmd(): boolean {
        return !this._activeRequest;
    }

    public editCmd(id: number): void {
        this._executeCmd(this._onEdit, id);
    }
    public editCanCmd(): boolean {
        return !this._activeRequest;
    }

    public deleteCmd(id: number): void {
        this._executeCmd(this._onDelete, id);
    }
    public deleteCanCmd(): boolean {
        return !this._activeRequest;
    }

    public cloneCmd(id: number): void {
        this._executeCmd(this._onClone, id);
    }
    public cloneCanCmd(): boolean {
        return !this._activeRequest;
    }

    public filterCmd(): void {
        if (this._rangeList.totalFilteredItems) {
            this._listStateProperties.filter.skip = ((this._listStateProperties.currentPage - 1) * this._listStateProperties.pageSize);
            this._listStateProperties.filter.take = this._listStateProperties.pageSize;
        }

        this._executeCmd(this._onFilter);
    }
    public filterCanCmd(): boolean {
        return !this._activeRequest && this._onCanFilter ? this._onCanFilter.apply(this) : true;
    }

    public cleanFilterCmd(): void {
        // Nota: SOLO se eliminan los datos del filtro que no corresponden al estado de la lista dados por 'IRangeFilterModel'
        // de modo que se cre un nuevo objeto con los datos de 'IRangeFilterModel' actuales
        this._listStateProperties.filter = {
            skip: this._listStateProperties.filter.skip,
            sortPropertyName: this._listStateProperties.filter.sortPropertyName,
            take: this._listStateProperties.filter.take
        } as TFilter;
        // buscar tras limpiar los filtros
        this.filterCmd();
    }
    public cleanFilterCanCmd(): boolean {
        return !this._activeRequest;
    }

    /** Funcion para mostrar un dialogo de eliminacion de un item
     * En caso de una seleccion afirmatica, sera invocado el evento '_onDelete'
     * @param id Identificador del registro que sera pasado como parametro en el evento '_onDelete'
     * @param title titulo del dialogo
     * @param content Contenido del dialogo
     * @param acceptText texto del boton aceptar del dialogo
     * @param closeText texto del boton cerrar del dialogo
     */
    public showDeleteModalCmd(id: number, title: string, content: string, acceptText: string, closeText: string): ng.ui.bootstrap.IModalServiceInstance {

        let modal: ng.ui.bootstrap.IModalServiceInstance = this._uibModalService.open({
            animation: true,
            controller: ($scope: any) => {
                $scope.Id = id;
                $scope.deleteModalCmd = (_id: any) => {
                    this._onDelete(_id).then(() => modal.close());
                };
                $scope.closeCmd = modal.close;
            },
            template: `
<div class="modal-header">
    <h3 class="modal-title" id="modal-title">${title}</h3>
</div>
<div class="modal-body" id="modal-body">${content}</div>
<div class="modal-footer">
    <button class="btn btn-default" type="button" ng-click="closeCmd()">${closeText}</button>
    <button class="btn btn-danger" type="button" ng-click="deleteModalCmd(Id)">${acceptText}</button>
</div>`
        });

        return modal;
    }


    protected _resetListStateProperties(): void {

        this._listStateProperties = {} as IListStateProperties<TFilter>;

        this._listStateProperties.filter = {
            skip: 0,
            sortPropertyName: "Id",
            take: PAGE_SIZE
        } as TFilter;

        this._listStateProperties.currentPage = 1;
        this._listStateProperties.filterVisibility = false;
        this._listStateProperties.pageSize = PAGE_SIZE;
    }


    private _configureFilterCache(): void {

        // el nombre de la clave de cache sera: 'nombreclase.filter', de este modo cada lista podra reusar su cache de filtros
        let cacheFilterKey: string = (this.constructor as any).name + ".filter";

        this._listStateProperties = angularApp.getCacheFactory(enumCacheFactoryKeys.CACHE_FILTER_ID).get(cacheFilterKey) as IListStateProperties<TFilter>;
        if (undefined == this._listStateProperties) {
            this._resetListStateProperties();
            angularApp.getCacheFactory(enumCacheFactoryKeys.CACHE_FILTER_ID).put(cacheFilterKey, this._listStateProperties);
        }
    }

}

/** Interface con las propiedades del estado de una lista */
interface IListStateProperties<TFilter> {
    currentPage: number;
    filter: TFilter;
    filterVisibility: boolean;
    pageSize: number;
}
