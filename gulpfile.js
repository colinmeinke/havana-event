var babel = require( 'gulp-babel' );
var concat = require( 'gulp-concat' );
var gulp = require( 'gulp' );
var lint = require( 'gulp-eslint' );
var mocha = require( 'gulp-mocha' );

gulp.task( 'lint', function () {
  return gulp.src([
    './gulpfile.js',
    './lib/event.js',
  ])
    .pipe( lint())
    .pipe( lint.format());
});

gulp.task( 'es5', [ 'lint' ], function () {
  return gulp.src([ './lib/event.js' ])
    .pipe( babel())
    .pipe( gulp.dest( './dist' ));
});

gulp.task( 'polyfill', [ 'es5' ], function () {
  return gulp.src([
    './node_modules/gulp-babel/node_modules/babel-core/browser-polyfill.js',
    './dist/event.js',
  ])
  .pipe( concat( 'event.with-polyfill.js' ))
  .pipe( gulp.dest( './dist' ));
});

gulp.task( 'test', [ 'polyfill' ], function () {
  return gulp.src( './test/*.js' )
    .pipe( mocha());
});

gulp.task( 'default', [ 'lint', 'es5', 'polyfill', 'test' ]);
