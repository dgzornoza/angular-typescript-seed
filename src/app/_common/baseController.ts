import "app/services/ui/toast.service";
import { IUiToastService } from "app/services/ui/toast.service";

/** Clase base para usar por controladores con funcionalidades comunes
 * @tparam T Tipo del scope usado por la clase padre
 */
export class BaseController<T extends ng.IScope> {

    // servicios
    protected _scope: T;
    protected _injector: ng.auto.IInjectorService;
    protected _location: ng.ILocationService;
    protected _uiToastService: IUiToastService;

    // miembros
    protected _activeRequest: boolean;

    // comandos
    protected _onGo: (path: string, pushHistory: boolean) => ng.IPromise<void>;
    protected _onCanGo: () => boolean;
    protected _onGoBack: () => ng.IPromise<void>;
    protected _onCanGoBack: () => boolean;

    /** Constructor por defecto de la clase */
    constructor($scope: T, $injector: ng.auto.IInjectorService) {

        this._scope = $scope;
        this._injector = $injector;
        this._location = this._injector.get("$location") as ng.ILocationService;
        this._uiToastService = $injector.get("uiToastService") as IUiToastService;

        this._activeRequest = false;
    }

    /**
     * Comando para ir a una ruta
     * @param path Ruta donde se quiere navegar
     * @param pushHistory true si se añade al historial del navegador, false en caso contrario (Por defecto es true)
     */
    public goCmd(path: string, pushHistory: boolean = true): void {
        if (this._onGo) {
            this._executeCmd(this._onGo, path, pushHistory);
        } else {
            this._location.path(path);
            if (!pushHistory) {
                this._location.replace();
            }
        }
    }
    public goCanCmd(): boolean {
        return !this._activeRequest && (this._onCanGo ? this._onCanGo.apply(this) : true);
    }

    /** Funcion para navegar atras en el historial */
    public goBackCmd(): void {
        if (this._onGoBack) {
            this._executeCmd(this._onGoBack);
        } else {
            this._scope.$applyAsync(() => window.history.back());
        }
    }
    public goBackCanCmd(): boolean {
        return !this._activeRequest && (this._onCanGoBack ? this._onCanGoBack.apply(this) : true);
    }

    /** Funcion para encapsular la ejecucion de un comando
     * @param comando que se quiere ejecutar
     * @param params parametros a pasar al comando
     */
    protected _executeCmd(cmd: (...params: any[]) => ng.IPromise<void>, ...params: any[]): void {

        this._activeRequest = true;

        if (cmd) {
            cmd.apply(this, params).finally(() => { this._activeRequest = false; });
        } else {
            this._activeRequest = false;
        }
    }


}

