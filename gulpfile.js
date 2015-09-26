"use strict"

var gulp = require('gulp')
var concat = require('gulp-concat')
var del = require('del')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var ts = require('gulp-typescript')
var sourcemaps = require('gulp-sourcemaps')
var peg = require('gulp-peg')
var wrap = require("gulp-wrap")
var qunit = require('node-qunit-phantomjs')

var tsMainProject = ts.createProject({
	noImplicitAny: true,
	target: "ES5",
	sortOutput: true,
	sourceMap: true
})
function buildMainTypescript() {
	return gulp.src('src/main/*.ts')
		//.pipe(sourcemaps.init())
		.pipe(ts(tsMainProject))
		.pipe(concat('arnoldc-nopeg.js'))
		//.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('target/main'))
}
function buildMainPeg() {
	return gulp
		.src('src/main/arnoldc.pegjs')
		.pipe(peg({ exportVar: 'arnoldc.peg'}))
		.pipe(wrap('(function(arnoldc){\n"use strict";\n<%= contents %>\n})(arnoldc || (arnoldc = {}));'))
		.pipe(rename('peg.js'))
		.pipe(gulp.dest('target/main'))
}
function concatMain() {
	return gulp.src([
			'target/main/peg.js', 
			'target/main/arnoldc-nopeg.js'
		])
		.pipe(concat('arnoldc.js'))
		.pipe(gulp.dest('target/main'))
}
gulp.task('build:main', gulp.series(
	gulp.parallel(buildMainTypescript, buildMainPeg), 
	concatMain
))

var tsTestProject = ts.createProject({
	noImplicitAny: true,
	target: "ES5",
	sortOutput: true,
	sourceMap: true
})
function buildTestTypescript() {
	return gulp.src('src/test/*.ts')
		//.pipe(sourcemaps.init())
		.pipe(ts(tsTestProject))
		//.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('target/test'))
}
function copyQunit() {
	return gulp.src('src/test/qunit.*')
		.pipe(gulp.dest('target/test'))
}
gulp.task('build:test', gulp.parallel(buildTestTypescript, copyQunit))
gulp.task('build', gulp.parallel('build:main', 'build:test'))

gulp.task('test:nobuild', function(cb) { 
	return qunit('target/test/qunit.html', {}, cb) 
})
gulp.task('test', gulp.series('build', 'test:nobuild'))

gulp.task('package:nobuild', function() {
	return gulp.src('target/main/arnoldc.js')
		.pipe(gulp.dest('dist'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
})
gulp.task('package', gulp.series('build', 'package:nobuild'))

gulp.task('clean', function(cb) { 
	return del(['target', 'dist'], cb) 
})
gulp.task('watch:main', function() {
	return gulp.watch(['src/main/*.ts', 'src/main/arnoldc.pegjs'], gulp.series('build:main'))
})
gulp.task('watch:test', function() {
	return gulp.watch('src/test/*.ts', gulp.series('build:test')) 
})
gulp.task('watch', gulp.parallel('watch:main', 'watch:test'))

gulp.task('default', gulp.series('clean', 'build', 'test:nobuild', 'package:nobuild'))