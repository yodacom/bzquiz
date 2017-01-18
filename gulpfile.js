var gulp = require("gulp"),
	stylus = require("gulp-stylus"),
	livereload = require("gulp-livereload"),
	uglify = require("gulp-uglify"),
	connect = require("gulp-connect"),
	webserver = require("gulp-webserver");
	

// Error Log function
function errorLog(error) {
	console.error.bind(error);
	this.emit("end");
}

// SCRIPTS TASKS
//Uglifies

gulp.task("scripts", function(){
	gulp.src("./js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/js"))
		.pipe(livereload());
});

// Styles Task
gulp.task("styles", function(){
	gulp.src("./css/stylus.styl, ./css/srmTable.styl")
        .pipe(stylus())
		.on("error", errorLog)
        .pipe(gulp.dest("./css/"))
		.pipe(livereload());
		.pipe(connect.reload());
});

// Watch Styles Task
gulp.task("watch:styles", function(){
	gulp.watch("**/*.styl", ["styles"]);
});

// Watch Task
gulp.task("watch", function(){
	gulp.watch("./js/*.js", ["scripts"]);
});

// Live reload
gulp.task("livereload", function() {
	gulp.src("./css/*.css", "./js/*.js");
});

// Local Dev Server
gulp.task("webserver", function() {
	connect.server({
		livereload: true
	});
});

gulp.task ("default", ["scripts", "watch:styles", "webserver"]);