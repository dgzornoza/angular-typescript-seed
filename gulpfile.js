var gulp = require("gulp");
var debug = require("gulp-debug");
var postcss = require("gulp-postcss");
var tsc = require("gulp-typescript");

//var tslint = require('gulp-tslint');

// publish third-party task
var publishThirdparty = require("./tools/tasks/gulp-publish-thirdparty");


allTypeScript = "src/app/**/*.ts";

/**
 * Lint all custom TypeScript files.
 */
// gulp.task("ts-lint", function () {
//     return gulp.src(allTypeScript).pipe(tslint()).pipe(tslint.report("prose"));
// });

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task("compile-ts", function () {

    //// 1.- borrar el directorio de salida
    //console.log("eliminando directorio de salida:\n", outdir);
    //del_module.sync(outdir);

    // 2.- generar archivos typescript
    console.log("generando archivos typescript:\n");

    // usar el archivo tsconfig.json como base para la generacion, modificando algunas propiedades
    var tsProject = tsc.createProject("tsconfig.json", { typescript: require("typescript") });
 
    // generar typescript desde la configuracion
    var tsResult = tsProject.src().pipe(debug())
    .pipe(tsc(tsProject));
    // filtrar resultados para incluir solo archivos javascript del framework
    //tsResult.js.pipe(jsFilter)
    // concatenar archivos
    //.pipe(concat_module("juno.framework-bundle.js"))
    // minificar (NOTA: Comentar si no se quiere minificar)
    //.pipe(uglify_module())
    // mover resultados al directorio de salida 'dist'
    tsResult.js.pipe(gulp.dest("wwwroot/app"));  

});

// gulp.task("compile-ts", function() {
// 	var tsResult = gulp.src("src/**/*.ts")
// 		.pipe(tsc({
// 			noExternalResolve: true
// 		}));
 
// 	tsResult.pipe(gulp.dest('built/local'));
// });


// gulp.task("watch", function() {
//     gulp.watch([allTypeScript], ["ts-lint", "compile-ts"]);
// });


//gulp.task('default', ['ts-lint', 'compile-ts']);
