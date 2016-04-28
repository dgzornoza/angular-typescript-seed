var gulp = require("gulp");
var del = require("del"); // delete files/directories
var postcss = require("gulp-postcss"); // css processor

// output web libraries directory
var www_lib = "wwwroot/lib/";
    
var thirdPartyLibraries = [

        // modernizr      
        "node_modules/systemjs/dist/system-polyfills.js",
        "node_modules/angular2/bundles/angular2-polyfills.js",

        // systemjs
        "node_modules/systemjs/dist/system.js",

        // angular2        
        "node_modules/rxjs/bundles/Rx.js",
        "node_modules/angular2/bundles/angular2.js",
        "node_modules/angular2/bundles/http.min.js",
        "node_modules/angular2/bundles/router.js",

        // angular2-translate
        "node_modules/ng2-translate/bundles/ng2-translate.js",

        // requisitos polyfills 
        // NOTA: este polifill se agrega el primero en index.html y asi esta en la documentacion de angular2, pero por algun motivo no funciona en el boundle para IExplorer/Chrome
        // y solo funciona si se establece el ultimo, parece ser algun tipo de compatibilidad con systemjs
        "node_modules/es6-shim/es6-shim.min.js"

];


// --------------------------------------------------------------------------------------------------
// Tarea para generar el directorio de librerias de terceros desde las dependencias de bower y node
// - Limpia el directorio lib del sitio web de salida y copia los scripts en el.
gulp.task("generate-lib", function () {

    del(www_lib).then(function () {

        console.log("Eliminados archivos:\n", www_lib);
        
        // copiar las librerias de terceros en el directorio de salida
        //gulp.src(allDependencies)
        //.pipe(gulp.dest(www_lib));

        console.log("copiados archivos nuevos:\n", www_lib);

    });
});