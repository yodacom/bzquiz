var gulp = require('gulp');
var stylus = require('gulp-stylus');
gulp.task('styles', function(){
    gulp.src('./css/style.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./css/'));
});

gulp.task('watch:styles', function(){
        gulp.watch('**/*.styl', ['styles']);
        });