var gulp = require("gulp"),
	stylus = require("gulp-stylus"),
	livereload = require("gulp-livereload"),
	uglify = require("gulp-uglify"),
	connect = require("gulp-connect"),
	webserver = require("gulp-webserver"),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    reload = browserSync.reload,
    rename = require('gulp-rename'),
    stripDebug = require('gulp-strip-debug'),
    prefix = require('gulp-autoprefixer'),
    nib = require('nib');
    args   = require('yargs').argv;

var serverUrl = args.proxy;


// Confingure our directories
var paths = {
    js:     'js/**/*.js',
    jsDest: 'build',
    css:    'css',
    styles: 'styles',
    img:    'img',
};

// Error Log function
function errorLog(error) {
	console.error.bind(error);
	this.emit("end");
}

// SCRIPTS TASKS
//////////////////////////////
// Begin Script Tasks
//////////////////////////////
gulp.task('lint', function () {
    return gulp.src([
        paths.js
    ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
});
gulp.task('scripts', function() {
    return gulp.src(paths.js)
    // Concatenate everything within the JavaScript folder.
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(paths.jsDest))
        .pipe(rename('scripts.min.js'))
        // Strip all debugger code out.
        .pipe(stripDebug())
        // Minify the JavaScript.
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsDest));
});


//////////////////////////////
// Stylus Tasks
//////////////////////////////
gulp.task('styles', function () {
    gulp.src(paths.styles + '/*.styl')
        .pipe(stylus({
            paths:  ['node_modules', 'styles/globals'],
            import: ['stylus-type-utils', 'nib'],
            use: [nib()],
            'include css': true
        }))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.stream());
});

// Local Dev Server
gulp.task("webserver", function() {
	connect.server({
		livereload: true
	});
});

//////////////////////////////
// Autoprefixer Tasks
//////////////////////////////
gulp.task('prefix', function () {
    gulp.src(paths.css + '/*.css')
        .pipe(prefix(["last 8 version", "> 1%", "ie 8"]))
        .pipe(gulp.dest(paths.css));
});

//////////////////////////////
// Watch
//////////////////////////////
gulp.task('watch', function () {
    gulp.watch(paths.js, [ 'scripts']);
    gulp.watch(paths.styles + '/**/*.styl', ['styles']);
    //gulp.watch(paths.styles + '/globals/**/*.styl', ['styles']);
});

//////////////////////////////
// Server Tasks
//////////////////////////////
gulp.task('default', ['scripts', 'watch', 'prefix']);
gulp.task('serve', ['scripts', 'watch', 'prefix', 'webserver'])

//gulp.task ("default", ["scripts", "watch:styles", "webserver"]);
