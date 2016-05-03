
import angular = require("angular");
"use strict";

/** Enumeracion con los diferentes temas de la aplicacion */
export enum enumThemes
{
    /** Tema por defecto de la aplicacion */
    default
}

/** Clase para gestionar los temas de la aplicaion */
export class Themes
{

    /** constructor por defecto de la clase
     * @param _initialized funcion callback que sera invocada al inicializarse el tema, como primer argumento sera establecido un array con los posibles modulos que se requieran añadir
     * al modulo principal de angular (modulos necesarios por el tema o un array vacio si no se requiere ningun modulo)
     * @remarks esta clase debe ser inicializada antes de crear el modulo principal de angular, ya que es posible que se requieran modulos adicionales, de modo que el modulo principal de 
     * angular debera ser inicializado en la funcion callback al inicializarse la clase.
     */
    constructor(_initialized: (_angularModules: string[]) => void)
    {        
        // TODO: falta obtener de la cookie el tema
        var theme = enumThemes.default;

        // evaluar el tema a usar para inicializarlo.
        switch (theme)
        {
            // TODO: añadir temas ...

            // Tema por defecto
            default:

                // inicializar tema por defecto
                this._configureDefaultTheme(_initialized);

                break;
        }
    }

    // #region [Propiedades]

    /** Propiedad para obtener el tema actual usado en la aplicacion */
    static get Theme(): enumThemes
    {
        // TODO: falta implementar obtener desde la cookie
        return enumThemes.default;
    }

    /** Propiedad para establecer el tema actual a usar en la aplicacion, los temas disponibles residen en la enumeracion ::enumThemes
     * @remarks SOLO puede establecerse el tema al iniciarse el modulo de la aplicacion principal.
     */
    static set Theme(_theme: enumThemes)
    {
        // TODO: falta implementar, se tiene que guardar el tema en la cookie y se debe refrescar la pagina
    }

    // #endregion [Propiedades]


    // #endregion [Funciones privadas]

    /** Funcion para configurar el tema por defecto (para este tema sera usado Ionic framework) 
     * @param _initialized funcion callback que sera invocada al inicializarse el tema, como primer argumento sera establecido un array con los posibles modulos que se requieran añadir
     * al modulo principal de angular (modulos necesarios por el tema o un array vacio si no se requiere ningun modulo)
     */
    private _configureDefaultTheme(_initialized: (_angularModules: string[]) => void): void
    {
        // CSS
        $("<link/>").attr("rel", "stylesheet").attr("href", BASE_URL + "Content/default/bootstrap.min.css").appendTo($("head"));
        $("<link/>").attr("rel", "stylesheet").attr("href", BASE_URL + "Content/default/site.css").appendTo($("head"));

        // añadir el contendor principal para usar angular-ui-router
        $("<div data-ui-view></div>").prependTo(document.body);
        
        // se requiere la libreria ionic para este tema
        require(["bootstrap"], () =>
        {
            // este tema no requiere modulos adicionales de angular
            _initialized([]);
        });

    }

    // #endregion [Funciones privadas]

}




