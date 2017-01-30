import { angularApp } from "app/main";


const CONTAINER: string = "clientAlertsServiceContainer" + Date.now();
const ROOT_SCOPE_ALERT_PROPERTY: string = "clientAlertsServiceCloseAlerts" + Date.now();
const ROOT_SCOPE_CLOSE_ALERT_FN: string = "clientAlertsServiceClose" + Date.now();

export enum enumDataAlert {
    INFO = 0,
    SUCCESS = 1,
    WARNING = 2,
    DANGER = 3
}

export interface IAlertConfigModel {
    type?: enumDataAlert;
    html: string;
}


export interface IUiToastService {

    alert(options: IAlertConfigModel): void;
    alertSuccess(htmlContent: string): void;
    alertDanger(htmlContent: string): void;
    alertWarning(htmlContent: string): void;
    alertInfo(htmlContent: string): void;

};

class UiToastService implements IUiToastService {

    // servicios
    private _rootScope: ng.IRootScopeService;
    private _compile: ng.ICompileService;

    // variables miembro
    private _alerts: IAlertConfigModel[];

    constructor($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) {

        this._rootScope = $rootScope;
        this._compile = $compile;

        this._alerts = [];

        // establecer propiedades en el rootscope
        this._rootScope[ROOT_SCOPE_ALERT_PROPERTY] = this._alerts;
        this._rootScope[ROOT_SCOPE_CLOSE_ALERT_FN] = this._closeAlert;

        this._init();
    }


    public alert(options: IAlertConfigModel): void {

        options.type = options.type || enumDataAlert.INFO;
        // propiedades extras
        (options as any).typeuib = enumDataAlert[options.type].toLowerCase();
        (options as any).id = new Date().valueOf();

        this._alerts.push(options);

        let timer: number = 0;
        switch (options.type) {
            case enumDataAlert.WARNING: timer = 0; break;
            case enumDataAlert.DANGER: timer = 0; break;
            case enumDataAlert.INFO: timer = 2000; break;
            default: timer = 3000;
        }

        if (timer) {
            window.setTimeout(() => {
                angularApp.rootScopeService.$applyAsync(() => { this._closeAlert((options as any).id); });
            }, timer);
        }
    }

    public alertSuccess(htmlContent: string): void {

        let options: IAlertConfigModel = {
            html: htmlContent,
            type: enumDataAlert.SUCCESS
        };

        this.alert(options);
    }

    public alertDanger(htmlContent: string): void {

        let options: IAlertConfigModel = {
            html: htmlContent,
            type: enumDataAlert.DANGER
        };

        this.alert(options);
    }

    public alertWarning(htmlContent: string): void {

        let options: IAlertConfigModel = {
            html: htmlContent,
            type: enumDataAlert.WARNING
        };

        this.alert(options);
    }

    public alertInfo(htmlContent: string): void {

        let options: IAlertConfigModel = {
            html: htmlContent,
            type: enumDataAlert.INFO
        };

        this.alert(options);
    }

    private _init(): void {

        let mainContent: HTMLBodyElement = document.querySelector("body");
        let alertsContainer: HTMLElement = document.querySelector("#" + CONTAINER) as any;

        // crear  contenedor si no existe y la directiva de angular bootstrap ui
        if (!alertsContainer) {
            alertsContainer = document.createElement("div");
            alertsContainer.id = CONTAINER;
            alertsContainer.style.cssText += `position: fixed; z-index: 1100; top: 20px; right: 20px;`;

            mainContent.insertBefore(alertsContainer, mainContent.firstChild);

            // crear la alerta en su contenedor y cerrarla en el tiempo especificado
            let uibAlert: HTMLElement = document.createElement("div");
            uibAlert.setAttribute("uib-alert", "");
            uibAlert.setAttribute("data-ng-repeat", `alert in ${ROOT_SCOPE_ALERT_PROPERTY}`);
            uibAlert.setAttribute("data-ng-class", "'alert-' + (alert.typeuib || 'warning')");
            uibAlert.setAttribute("close", `${ROOT_SCOPE_CLOSE_ALERT_FN}(alert.id)`);
            uibAlert.innerHTML = "{{ alert.html }}";

            alertsContainer.appendChild(uibAlert);

            this._compile(alertsContainer)(this._rootScope);
        }

    }

    private _closeAlert(id: number): void {
        // NOTA: angular ui entra en esta funcion desde otro ambito, y no puede usarse una propiedad de la IClientAlertsService
        let item: any = Helpers.findArrayItemFromPropertyValue(angularApp.rootScopeService[ROOT_SCOPE_ALERT_PROPERTY], "id", id);
        let index: number = angularApp.rootScopeService[ROOT_SCOPE_ALERT_PROPERTY].indexOf(item);
        angularApp.rootScopeService[ROOT_SCOPE_ALERT_PROPERTY].splice(index, 1);
    }


}

// NOTA: (Deben seguir el mismo orden que el constructor del viewmodel)
UiToastService.$inject = ["$rootScope", "$compile"];
angularApp.registerService("uiToastService", UiToastService);
