// -----------------------------------------------
// Configuration file for gulp tasks
'use strict';

var tasksConfig = (function ()
{
    var _sourceFolder = "src/";
    var _outputFolder = "wwwroot/";

    return {

        // source resources
        sourceFolder: _sourceFolder,

        sourceScriptFiles: _sourceFolder + "**/*.ts",
        sourceHtmlFiles: _sourceFolder + "**/*.html",
        sourceCssFiles: _sourceFolder + "**/*.css",

        // output resources
        outputFolder: _outputFolder,

        outputAppFolder: _outputFolder + "app/",
        outputLibFolder: _outputFolder + "lib/",
        outputCssFolder: _outputFolder + "css/",
        outputFontsFolder: _outputFolder + "fonts/"

    };

})();

module.exports = tasksConfig;
