
/** @Brief Class for define help methods */
class Helpers
{
    /** @brief Help function for split an array/string into parts of a specified size
    @param _input Array elements or string to split into parts
    @param _chunks Size of parts that will separate the array/string
    @return Matrix containing splitted input array, null if not able to perform.
    */
    static SplitArray<T>(_input: T[] | string, _chunks: number = 1): any[]
    {
        // verify array type
        if (!Array.isArray(_input) && !String.isString(_input)) return null;

        // Loop for split result array
        var result = [];
        for (var i = 0; i < _input.length; i += _chunks) result.push(_input.slice(i, i + _chunks));

        return result;
    }
}


/** Extend StringConstructor interface with new features */
interface StringConstructor
{
    /** Method declaration to check whether an object is of type string
    @param _obj object to check
    @return true if object is type of string, false otherwise
    */
    isString(_obj: any): boolean;
}

String.isString = function (_obj: any): boolean
{
    return typeof _obj === "string" || _obj instanceof String;
}



/**  Extend string interface with new features  */
interface String
{
    /** @brief Extension method for split a string into an array just as string.split(), but allowing the array to remove items
    that match the string specified by the parameter 'removeItemString'.    
    @param _separator separator to create the array
    @param _removeItemString string to remove items in the array eg "" -> removes empty items
    @param _limit array size limit
    @return array of strings splited
    */
    splitWithRemove(_separator: string | RegExp, _removeItemString: string, _limit?: number): string[];
    /** Metodo extensor para asegurar que la cadena finalice con barra '/', usado para formar rutas */
    ensureSlash(): string;
}


String.prototype.splitWithRemove = function (_separator: string | RegExp, _removeItemString: string, _limit?: number): string[]
{
    if ("" == this) return new Array();        
    var items = this.split(_separator, _limit);

    for (var i = 0; i < items.length; i++)
    {
        if (items[i] == _removeItemString)
        {
            items.splice(i, 1);
            i--;
        }
    }    
    return items;
}

String.prototype.ensureSlash = function (): string
{
    return this.replace(/\/?$/, '/');  
}


