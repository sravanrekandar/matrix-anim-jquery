var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var config = {
  entryFile: './src/app.js',
  outputDir: './dist/',
  outputFile: 'app.js',
  cssSource: './src/*.css',
  cssDest: './dist/',
  libSource: './libs/*.*',
  libDest: './dist/libs/',
};

// clean the output directory
gulp.task('clean', function(cb){
    rimraf(config.outputDir, cb);
});

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(config.entryFile, _.extend({ debug: true }, watchify.args)));
  }
  return bundler;
};

function bundle() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }));
}

gulp.task('minify-css', function() {
  return gulp.src(config.cssSource)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.cssDest));
});

gulp.task('libs', function() {
  return gulp.src(config.libSource)
    .pipe(gulp.dest(config.libDest));
});

gulp.task('build-persistent', ['minify-css', 'libs'], function() {
  return bundle();
});

gulp.task('build', ['clean', 'build-persistent'], function() {
  process.exit(0);
});

gulp.task('watch', ['build-persistent'], function() {

  browserSync({
    server: {
      baseDir: './'
    }
  });

  getBundler().on('update', function() {
    gulp.start('minify-css')
    gulp.start('build-persistent')
  });
});

// WEB SERVER
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});