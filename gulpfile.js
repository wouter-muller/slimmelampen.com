var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    // uglify = require('gulp-uglify'),
    minify = require('gulp-minify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    // notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    include = require('gulp-include'),
    del = require('del'),
    magicImporter = require('node-sass-magic-importer');

// ----------------------------------------------------------------------------
// CSS
// ----------------------------------------------------------------------------

gulp.task('css', function() {
  return gulp.src('src/css/main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({ style: 'expanded', importer: magicImporter() }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(cssnano())
    // .pipe(gulp.dest('assets/css'))
    //.pipe(notify({ message: 'Css task complete' }));
});

// ----------------------------------------------------------------------------
// Javascript
// ----------------------------------------------------------------------------

gulp.task('js', function() {
  return gulp.src('src/js/modules/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('assets/js'))
});

gulp.task('js-vendor', function() {
  return gulp.src('src/js/vendors/**/*.js')
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('assets/js'))
});

// ----------------------------------------------------------------------------
// Images
// ----------------------------------------------------------------------------

gulp.task('img-all', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('assets/images'))
    //.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('img-new', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/images'))
    //.pipe(notify({ message: 'Images task complete' }));
});

// ----------------------------------------------------------------------------
// Clean/remove all compiled assets
// ----------------------------------------------------------------------------

gulp.task('clean', function() {
    return del(['assets/css', 'assets/js', 'assets/images']);
});

// ----------------------------------------------------------------------------
// Run all
// ----------------------------------------------------------------------------

gulp.task('all', ['clean'], function() {
  gulp.start('css', 'js', 'js-vendor', 'img-new');
});

// ----------------------------------------------------------------------------
// Watchers
// ----------------------------------------------------------------------------

gulp.task('watch', function() {
  gulp.watch('src/css/**/*.*', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/images/**/*', ['img-new']);

  // Create LiveReload server
  livereload.listen();

  gulp.watch(['assets/**/*']).on('change', livereload.changed);
});
