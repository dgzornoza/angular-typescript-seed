// -----------------------------------------------
// Configuration file for gulp tasks

'use strict';

var tasksConfig = (function () 
{
    return {
        
        sourceScriptFiles: "src/**/*.ts",
        outputScriptFiles: "wwwroot/**/*.js",
        
        sourceFolder: "src/",
        outputFolder: "wwwroot/",
        
        outpuLibFolder: "wwwroot/lib/",
        outputCssFolder: "wwwroot/css/",
        outputFontsFolder: "wwwroot/fonts/"

    };
    
})();

module.exports = tasksConfig