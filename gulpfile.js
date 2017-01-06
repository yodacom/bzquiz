var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	livereload = require('gulp-livereload'),
	uglify = require('gulp-uglify'); 

// Error Log function
function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}

// SCRIPTS TASKS
//Uglifies

gulp.task('scripts', function(){
	gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Styles Task
gulp.task('styles', function(){
	gulp.src('./css/style.styl')
        .pipe(stylus())
        .on('error', errorLog)
        .pipe(gulp.dest('./css/'))
        .pipe(livereload());
});

// Watch Styles Task
gulp.task('watch:styles', function(){
	var server = livereload();
	gulp.watch('**/*.styl', ['styles']);
});

// Watch Task
gulp.task('watch', function(){
	gulp.watch('js/*.js', ['scripts']);
});

gulp.task ('default', ['scripts', 'watch:styles']);