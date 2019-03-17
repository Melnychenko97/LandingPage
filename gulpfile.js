const gulp = require( 'gulp');
// const concat = require( 'gulp-concat');// all to a one file
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function styles() {
	return gulp.src('src/scss/**/*.scss')
				.pipe(sass().on('error', sass.logError))
				// .pipe(concat('all.css'))
				.pipe(browserSync.stream())
				.pipe(gulp.dest('./build'));
}

function watch() {
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./src/scss/**/*.scss', styles);
    gulp.watch('./*.html', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('watch', watch);
