// -----------------------------------------------
// Configuration file for gulp tasks
'use strict';

var tasksConfig = (function ()
{
    var _sourceFolder = "src/";
    var _sourceTestsFolder = "tests/";
    var _outputFolder = "wwwroot/";
    

    return {

        // source resources
        sourceFolder: _sourceFolder,

        sourceScriptFiles: _sourceFolder + "**/*.ts",
        sourceHtmlFiles: _sourceFolder + "**/*.html",
        sourceCssFiles: _sourceFolder + "**/*.css",
        sourceMocksFiles: _sourceFolder + "mocks/*.json",

        sourceTestsFolder: _sourceTestsFolder,
        sourceTestsScriptFiles: _sourceTestsFolder + "**/*.ts",

        // output resources
        outputFolder: _outputFolder,

        outputAppFolder: _outputFolder + "app/",
        outputLibFolder: _outputFolder + "lib/",
        outputCssFolder: _outputFolder + "css/",
        outputFontsFolder: _outputFolder + "fonts/",
        outputMocksFolder: _outputFolder + "mocks/"

    };

})();

module.exports = tasksConfig;
