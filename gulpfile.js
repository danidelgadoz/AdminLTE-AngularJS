const gulp = require('gulp'),
	concat = require('gulp-concat')
	uglify = require('gulp-uglify')
	browserSync = require('browser-sync').create();

gulp.task('serve', () => {
	browserSync.init({
		server: './',
		port: 3010
	});

	gulp.watch('index.html').on('change', browserSync.reload);
	gulp.watch('views/*.html').on('change', browserSync.reload);
	gulp.watch('views/*/*.html').on('change', browserSync.reload);
	gulp.watch('css/*.css').on('change', browserSync.reload);
	gulp.watch('js/*.js').on('change', browserSync.reload);
	gulp.watch('js/*/*.js').on('change', browserSync.reload);
});

gulp.task('build', function(){
	gulp.src([
			'js/main.js',
			'js/config.js',
			'js/factories.js',
			'js/services.js',
			'js/directives.js',			
			'js/controllers/*.js'
		])
		.pipe(concat('my-angular-app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});