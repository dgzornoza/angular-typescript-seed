// -----------------------------------------------
// Task for manage html project files
'use strict';

var gulp = require("gulp");

var tasksConfig = require("./gulp-config");


var htmlTasks = (function()
{
    var _publish = function()
    {
        gulp.src(tasksConfig.sourceHtmlFiles).pipe(gulp.dest(tasksConfig.outputFolder));
    }

    var _cleanOutput = function()
    {
        del.sync([tasksConfig.outpuLibFolder, tasksConfig.outputCssFolder, tasksConfig.outputFontsFolder]);
    };
    
    return { publish: _publish, cleanOutput: _cleanOutput };

})();

module.exports = htmlTasks;
