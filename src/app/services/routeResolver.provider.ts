
import * as angular from "angular";

/** Interface para declarar un modelo de definicion de ruta de estados personalizado (usando angular-ui-router)*/
export interface RouteDefinition extends ng.route.IRoute
{
    /** Flag indicando si la ruta requiere estar autenticado */
    requireAuth: boolean;
}

export interface ResolveModel
{
    path: string;
    controllerAs: string;
    requireAuth?: boolean;
}

export interface RouteResolverProvider extends ng.IServiceProvider
{
    basePath: string;
    resolve(ResolveModel): RouteDefinition;
}

/** @Brief Clase para implementar el sistema de enrutado en vitas/vistas-modelos de la aplicacion, la clase hace uso del modulo con el proveedor de rutas de angular permitiendo cargadr dinamicamente las vistas y vistas-modelos.
 * @remarks La clase usa la convencion sobre configuracion al gestionar vistas y vistas-modelos, se puede especificar el directorio de vistas/vistas-modelos al crear la instancia,
 * pero los nombres de las vistas creadas deben contener el sufijo 'View' y las vistas-modelos 'ViewModels'.
 * Ademas para seguir la convencion usada en archivos de scripts, los nombres de archivos comenzaran por minuscula, en el caso de las vistas-modelos el archivo comenzara por minuscula pero la
 * clase que declara la vista-modelo comenzara por mayuscula.
 * El alias de los view-models en las vistas, sera el mismo que el nombre del view-model sin el sufijo, de modo que el alias de 'oneViewModel' sera 'one'
 */
class RouteResolver implements RouteResolverProvider
{     
        
    private m_basePath: string = "";

    
    $get = function () {
        return this;
    };        


    public get basePath(): string
    {
        return this.m_basePath;
    }
    public set basePath(_basePath: string)
    {
        this.m_basePath = _basePath.ensureSlash();
    }


    /** Funcion para crear una definicion de ruta que sera usada por angularjs para resolver las vistas/vistas-modelos de forma dinamica haciendo uso de requirejs
     * @param _path Ruta a la vista/vistas-modelo relativa a la carpeta correspondiente (debe coincidir la ruta de la vista/vistas-modelo siguiendo la convencion)
     * @param _requireAuth flag para indicar si requiere autenticacion la ruta,
     * este flag sera guardado en la definicion de la ruta y podra ser obtenido posteriormente al cargarse para realizar operaciones relacionadas con la autenticacion.
     * @return Definicion de ruta de estado para usar en el modulo route de angular.
     */
    public resolve(_data: ResolveModel): RouteDefinition
    {            
        // la ruta de la vista sera la ruta base mas la ruta pasada como parametro y por convencion se añade el sufijo y extension
        var viewPath = this.m_basePath + _data.path + ".view.html";
        // la ruta de la vista-modelo sera la ruta base mas la ruta pasada como parametro y por convencion se añade el sufijo y extension
        var controllerPath = this.m_basePath + _data.path + ".controller.js";
        // el nombre de la clase de la vista-modelo por convencion debe ser el mismo que el ultimo fragmento del path, pero empezando por mayuscula y añadiendo el sufijo
        var controllerName = _data.path.split("/").pop();        
        var controllerClass = controllerName.charAt(0).toUpperCase() + controllerName.slice(1) + "Controller";

        // crear el objeto de retorno con la definicion de la ruta
        var route: RouteDefinition =
            {
                templateUrl: viewPath,
                // HACK: Establecer 'as' tambien en el controlador, en algunas integraciones de framweworks como Ionic no funciona 'controllerAs'
                controller: controllerClass + " as " + _data.controllerAs,
                controllerAs: _data.controllerAs,
                requireAuth: (_data.requireAuth) ? _data.requireAuth : false,
                // añadir mapa con la funcion de resolucion de dependencias que hara uso de requirejs para la carga dinamica
                resolve: {
                    load: ["$q", "$rootScope",
                        ($q: ng.IQService, $rootScope: ng.IRootScopeService) =>
                        {
                            // obtener el objeto defer para resolver la dependencia asincronamente
                            var defer = $q.defer();
                            // cargar el viewmodel mediante require
                            require([controllerPath],() =>
                            {
                                // indicar que se ha obtenido el recurso resolviendo la promesa
                                defer.resolve();
                                // invocar todos los watchers
                                //$rootScope.$apply();
                            });

                            // retornar el objeto para la resolucion asincrona
                            return defer.promise;
                        }]
                }
            };

        return route;
    }
}

// Must be a provider since it will be injected into module.config()    
angular.module(`${APP_NAME}.routeResolverService`, []).provider("RouteResolver", RouteResolver);


    
