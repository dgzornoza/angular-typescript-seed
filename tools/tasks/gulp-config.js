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

        sourceScriptFiles: _sourceFolder + "app/**/*.ts",
        sourceHtmlFiles: _sourceFolder + "app/**/*.html",
        sourceCssFiles: _sourceFolder + "app/**/*.css",
        sourceMocksFiles: _sourceFolder + "mocks/*.json",

        sourceTestsScriptFiles: _sourceFolder + "tests/**/*.ts",

        // output resources
        outputFolder: _outputFolder,

        outputAppFolder: _outputFolder + "app/",
        outputLibFolder: _outputFolder + "lib/",
        outputCssFolder: _outputFolder + "css/",
        outputFontsFolder: _outputFolder + "fonts/",
        outputMocksFolder: _outputFolder + "mocks/",

        outputTestsFolder: _outputFolder + "tests/",

    };

})();

module.exports = tasksConfig;
