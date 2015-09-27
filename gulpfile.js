var gulp = require('gulp')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var bower = require('main-bower-files')
var filter = require('gulp-filter')
var flatten = require('gulp-flatten')

gulp.task('copy', function() {
	var jsFilter = filter('**/*.js', { restore: true});
	var cssFilter = filter('**/*.css', { restore: true});

	return gulp.src(bower(), { base: 'bower_components' })
		.pipe(flatten())
		.pipe(jsFilter)
		.pipe(gulp.dest('js'))
		.pipe(jsFilter.restore)
		.pipe(cssFilter)
		.pipe(gulp.dest('css'))
		.pipe(cssFilter.restore)
})

gulp.task('package', function() {
	return gulp.src('js/site.js')
		.pipe(uglify())
		.pipe(rename('site.min.js'))
		.pipe(gulp.dest('js'))
})

gulp.task('watch', function() {
	return gulp.watch('js/site.js', gulp.series('package'))
})

gulp.task('default', gulp.series('copy', 'package'))