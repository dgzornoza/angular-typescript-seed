
import angular = require("angular");


/** @Brief Clase para implementar el sistema de traduccion i18n en la aplicacion,
 * la clase hace uso del modulo angular-translate: http://angular-translate.github.io/ para la gestion de la traduccion de idiomas.
 */
export class Locales
{

    // #region [Variables miembro]

    /** Variable con el nombre del servicio asincrono de carga de archivos de idioma */
    private m_translateLoaderService: string = APP_NAME + ".translateLoaderService";

    // #endregion [Variables miembro]


    /** Constructor por defecto de la clase
     * @param _appModule Modulo de angular principal de la aplicacion
     */
    constructor(_appModule: ng.IModule)
    {
        // crear y asociar al modulo de la aplicacion el servicio de carga asincrona de archivos de idioma para usar por angular
        this._createLoaderService(_appModule);
    }


    // #region [Funciones publicas]

    /** Funcion para configurar del sistema de gestion de idiomas de la aplicacion
     * (debe ser invocado desde la funcion de configuracion de la aplicacion/angular)
     * @param _localeProvider proveedor del modulo de traduccion 'angular-translate'
     */
    public configure(_localeProvider: ng.translate.ITranslateProvider)
    {
        // establecer el nombre del servicio que sera usado para carga asincrona de archivos (el creado mediante '_createLoaderService')
        _localeProvider.useLoader(this.m_translateLoaderService, null);

        // establecer idioma por defecto
        _localeProvider.preferredLanguage("es");
    }


    /** Funcion para crear y configurar en angular un servicio de carga asincrona de archivos de traduccion
     * @param _appModule Modulo de angular principal de la aplicacion
     */
    private _createLoaderService(_appModule: ng.IModule)
    {
        // crear el array con los proveedores que seran inyectados en la funcion del servicio de carga asincrona
        // y crear la funcion del servicio que permitira cargar los archivos de idioma asincronamente.
        // NOTA: la funcion debe contener los parametros a inyectar en el mismo orden
        var fn: any[] =
            ["$q", "$http",
                ($q: ng.IQService, $http: ng.IHttpService) =>
                {
                    return (_options) =>
                    {
                        // ruta a arhivo de recurso de idiomas
                        var localePath = BASE_URL + "app/locales/locale-" + _options.key + ".json";

                        // crear un objeto para obtener archivo asincronamente
                        var deferred = $q.defer();

                        // obtener el archivo de forma asincrona
                        $http(angular.extend(
                        {
                            url: localePath,
                            params: { lang: _options.key },
                            method: "GET"
                        },
                        _options.$http))
                            .success(function (data)
                        {
                            // OK
                            deferred.resolve(data);
                        })
                            .error(function (data)
                        {
                            // ERROR
                            deferred.reject(_options.key);
                        });

                        // retornar el objeto de resolucion asincrona
                        return deferred.promise;
                    };
                }];

        _appModule.factory(this.m_translateLoaderService, fn);
    }


}
