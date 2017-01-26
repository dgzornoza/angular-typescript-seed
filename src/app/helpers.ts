
/******************************************
 * Helpers
 */

/** Interface for create dynamic objects */
interface IDynamic<T> {
    [key: string]: T;
}


/** Interface for create key/values pair */
interface IKeyValueMap<T, U> {
    key: T;
    value: U;
}

/** @Brief Class for define help methods */
class Helpers {

    /** Funcion para cargar un css de forma dinamica
     * @param url url del css a cargar
     * @param insertBeforeId (Opcional) Identificador del elemento que sera usado para insertarse antes de el.
     * en caso de no especificarse sera añadido como ultimo elemento de <head>
     */
    public static loadCss(url: string, insertBeforeId?: string): void {
        let link: HTMLLinkElement = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        if (insertBeforeId) {
            let element: Element = document.querySelector(`#${insertBeforeId}`);
            element.parentNode.insertBefore(link, element);
        } else {
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    }

    /** @brief Help function for split an array/string into parts of a specified size
     * @param input Array elements or string to split into parts
     * @param chunks Size of parts that will separate the array/string
     * @return Matrix containing splitted input array, null if not able to perform.
     */
    public static splitArray<T>(input: T[] | string, chunks: number = 1): any[] {

        // verify array type
        if (!Array.isArray(input) && !String.isString(input)) { return undefined; }

        // Loop for split result array
        let result: any[] = [];
        for (let i: number = 0; i < input.length; i += chunks) {
            result.push(input.slice(i, i + chunks));
        }

        return result;
    }

    /**
     * Function to search for an item in an array that matches the specified property and value
     * @param inputArray Array of objects where search
     * @param propertyName property name that will be used to compare the value
     * @param propertyValue Value that will be compared to find the element in the array
     * @return item array match, empty object if not found
     */
    public static findArrayItemFromPropertyValue<T>(inputArray: T[], propertyName: string, propertyValue: any): T {

        if (undefined == inputArray || inputArray.length === 0 || undefined === propertyName || undefined == propertyValue) {
            return {} as T;
        }

        for (let obj of inputArray) {

            for (let prop in obj) {
                if (obj.hasOwnProperty(prop) && prop === propertyName && obj[prop] === propertyValue) {
                    return obj;
                }
            }
        }

        return {} as T;
    }

    public static groupBy<T>(array: T[], key: string): IDynamic<T> {

        let obj: any = array.reduce((previous: T, current: T) => {
            (previous[current[key]] = previous[current[key]] || []).push(current);
            return previous;
        }, {} as any);

        return obj;
    }

    public static arrayToDynamicObject<T>(array: T[], key: string): IDynamic<T> {

        let obj: any = array.reduce((previous: T, current: T) => {
            previous[current[key]] = current || {};
            return previous;
        }, {} as any);

        return obj;
    }

    public static dynamicObjectToArray<T>(obj: any): T[] {

        let result: T[] = [];
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                result.push(obj[prop]);
            }
        }

        return result;
    }

    /**
     * Function for avoid calling a function multiple times between a specified time
     * @param fn function to invoke
     * @param limit time between calls
     * @returns Function to invoke wrapped in throttle function
     */
    public static throttle(fn: Function, limit: number): Function {
        let wait: boolean = false;

        // Inicialmente no se espera, se retorna la funcion throttle.
        // Si no se esta esperando se ejecuta la funcion callback previniendo invocaciones futuras,
        // despues del periodo de tiempo especificado, se permitira volver a ejecutar la funcion callback.
        return (thisArg: any, ...argArray: any[]): any => {
            // verificar que no se esta esperando
            if (!wait) {
                // invocar la funcion callback y establecer flag en espera
                fn.call(thisArg, argArray);
                wait = true;
                // establecer el tiempo para permitir volver a invocar la funcion
                setTimeout(() => { wait = false; }, limit);
            }
        };
    }

    /**
     * Returns a function, that, as long as it continues to be invoked, will not be triggered.
     * The function will be called after it stops being called for N milliseconds.
     * @param fn function to invoke
     * @param wait time for invoke 'fn' once
     * @param immediate true if trigger the function on the leading edge, instead of the trailing.
     * @returns Function to invoke wrapped in Debounce function
     */
    public static debounce(fn: Function, wait: number, immediate?: boolean): Function {
        let timeout: number;

        return (thisArg: any, ...argArray: any[]): any => {

            let later: Function = () => {
                timeout = undefined;
                if (!immediate) { fn.call(thisArg, argArray); }
            };

            let callNow: boolean = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) { fn.call(thisArg, argArray); }
        };
    }

    /** Function for download multiples files
     * @param urls urls to files
     */
    public static downloadMultipleFiles(...urls: string[]): void {

        for (let i: number = 0; i < urls.length; i++) {

            let link: HTMLAnchorElement = document.createElement("a");
            link.setAttribute("download", urls[i].split("/").pop());
            link.style.display = "none";
            link.setAttribute("href", urls[i]);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

/******************************************
 * Common Regular Expressions
 */

namespace Helpers {
    "use strict";

    /* tslint:disable max-line-length */
    export class CommonPatterns {
        public static MAIL: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        public static PASSWORD: RegExp = /((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,8})/;
    }
    /* tslint:enable max-line-length */
}


/******************************************
 * Add functions to Number object
 */

/* tslint:disable interface-name */
interface NumberConstructor {
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
    MAX_SAFE_INTEGER: number;
}

// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
if (!Number.MAX_SAFE_INTEGER) {
    Number.MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
}
/* tslint:enable interface-name */


/******************************************
 * Add functions to string object
 */

/* tslint:disable interface-name */
/** Extend StringConstructor interface with new features */
interface StringConstructor {
    /** @brief Method declaration to check whether an object is of type string
     * @param obj object to check
     * @return true if object is type of string, false otherwise
     */
    isString(obj: any): boolean;
}

String.isString = function (obj: any): boolean {
    return typeof obj === "string" || obj instanceof String;
};

/**  Extend string interface with new features  */
interface String {
    /** @brief Extension method for split a string into an array just as string.split(), but allowing the array to remove items
     * that match the string specified by the parameter 'removeItemString'.
     * @param separator separator to create the array
     * @param removeItemString string to remove items in the array eg "" -> removes empty items
     * @param limit array size limit
     * @return array of strings splited
     */
    splitWithRemove(separator: string | RegExp, removeItemString: string, limit?: number): string[];
    /** Metodo extensor para asegurar que la cadena finalice con barra '/', usado para formar rutas */
    ensureSlash(): string;
}
/* tslint:enable interface-name */

/* tslint:disable no-invalid-this */
String.prototype.splitWithRemove = function (separator: string | RegExp, removeItemString: string, limit?: number): string[] {
    if ("" === this) { return new Array(); }
    let items: any = this.split(separator, limit);

    for (let i: number = 0; i < items.length; i++) {
        if (items[i] === removeItemString) {
            items.splice(i, 1);
            i--;
        }
    }

    return items;
};

String.prototype.ensureSlash = function (): string {
    return this.replace(/\/?$/, "/");
};
/* tslint:enable no-invalid-this */

