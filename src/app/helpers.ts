
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

