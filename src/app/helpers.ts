
/** Interface for create pair keys/values */
interface IKeyValueMap<T> {
    [key: string]: T;
}

/** @Brief Class for define help methods */
class Helpers {

    /** @brief Help function for split an array/string into parts of a specified size
     * @param input Array elements or string to split into parts
     * @param chunks Size of parts that will separate the array/string
     * @return Matrix containing splitted input array, null if not able to perform.
     */
    public static SplitArray<T>(input: T[] | string, chunks: number = 1): any[] {

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
     * Function for avoid calling a function multiple times between a specified time
     * @param fn function to invoke
     * @param limit time between calls
     * @returns Function to invoke wrapped in throttle function    
     */
    public static Throttle(fn: Function, limit: number): Function {
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
	public static Debounce(fn: Function, wait: number, immediate?: boolean): Function {
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
    };
}

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
    if ("" == this)  { return new Array(); }        
    let items = this.split(separator, limit);

    for (let i: number = 0; i < items.length; i++) {
        if (items[i] == removeItemString) {
            items.splice(i, 1);
            i--;
        }
    }    
    
    return items;
}

String.prototype.ensureSlash = function (): string {
    return this.replace(/\/?$/, '/');  
}
/* tslint:enable no-invalid-this */

