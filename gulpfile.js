var babel = require( 'gulp-babel' );
var babelify = require( 'babelify' );
var browserify = require( 'browserify' );
var concat = require( 'gulp-concat' );
var gulp = require( 'gulp' );
var insert = require( 'gulp-insert' );
var lint = require( 'gulp-eslint' );
var mocha = require( 'gulp-mocha' );
var rename = require( 'gulp-rename' );
var source = require( 'vinyl-source-stream' );

gulp.task( 'lint', function () {
  return gulp.src([
    './gulpfile.js',
    './lib/**/*.js',
    './test/lib/**/*.js',
  ])
    .pipe( lint())
    .pipe( lint.format());
});

gulp.task( 'compileServer', [ 'lint' ], function () {
  return gulp.src([ './lib/event.js' ])
    .pipe( babel())
    .pipe( rename({
      'suffix': '.server',
    }))
    .pipe( gulp.dest( './dist' ));
});

gulp.task( 'compileBrowser', [ 'lint' ], function () {
  return browserify({
    'entries': './lib/event.js',
    'standalone': 'havana-event',
  })
    .transform( babelify )
    .bundle()
    .pipe( source( 'event.browser.js' ))
    .pipe( gulp.dest( './dist' ));
});

gulp.task( 'compileTests', [ 'lint' ], function () {
  return gulp.src([ './test/lib/**/*.js' ])
    .pipe( babel())
    .pipe( gulp.dest( './test/dist' ));
});

gulp.task( 'compile', [ 'compileServer', 'compileBrowser', 'compileTests' ]);

gulp.task( 'polyfillServer', [ 'compile' ], function () {
  return gulp.src( './dist/event.server.js' )
    .pipe( insert.prepend( 'require(\'../node_modules/gulp-babel/node_modules/babel-core/polyfill.js\');\r\n\n' ))
    .pipe( rename({
      'suffix': '.with-polyfill',
    }))
    .pipe( gulp.dest( './dist' ));
});

gulp.task( 'polyfillBrowser', [ 'compile' ], function () {
  return gulp.src([
      './node_modules/gulp-babel/node_modules/babel-core/browser-polyfill.js',
      './dist/event.browser.js',
    ])
    .pipe( concat( 'event.browser.with-polyfill.js' ))
    .pipe( gulp.dest( './dist' ));
});

gulp.task( 'polyfill', [ 'polyfillServer', 'polyfillBrowser' ]);

gulp.task( 'test', function () {
  return gulp.src( './test/dist/**/*.js' )
    .pipe( mocha());
});

gulp.task( 'default', [ 'compile', 'polyfill' ]);
