'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');
var myth = require('gulp-myth');
var csso = require('gulp-csso');
var gulp = require('gulp');

gulp.task('modules', function() {
  gulp
    .src('client/index.js')
    .pipe(browserify({buffer: false, debug: true}))
    .pipe(uglify({outSourceMap: true}))
    .pipe(rename('application.js'))
    .pipe(gulp.dest('build/scripts/'));
});

gulp.task('static', function() {
  gulp.src("client/vendor/localforage/dist/backbone.localforage.js").pipe(gulp.dest("build/vendor"));
  gulp.src("client/vendor/lodash/dist/lodash.underscore.min.js").pipe(gulp.dest("build/vendor"));
  gulp.src("client/vendor/localforage/dist/localforage.js").pipe(gulp.dest("build/vendor"));
  gulp.src("client/vendor/backbone/backbone.js").pipe(gulp.dest("build/vendor"));
  gulp.src("client/vendor/jquery/dist/jquery.min.map").pipe(gulp.dest("build/vendor"));
  gulp.src("client/vendor/jquery/dist/jquery.min.js").pipe(gulp.dest("build/vendor"));
  gulp.src("client/vendor/react/react.min.js").pipe(gulp.dest("build/vendor"));
  gulp.src('client/images/**').pipe(gulp.dest('build/images/'));
  gulp.src('client/fonts/**').pipe(gulp.dest('build/fonts'));
  gulp.src('client/index.html').pipe(gulp.dest('build/'));
});

gulp.task('lint', function() {
  gulp.src(['client/**/*.js', 'client/**/**/*.js', 'client/**/**/**/*.js'])
    .pipe(eslint.format('stylish'))
})

gulp.task('styles', function() {
  gulp
    .src([
      'client/vendor/reset-css/reset.css', 
      'client/vendor/normalize-css/normalize.css', 
      'client/styles/utilities/*.css',
      'client/styles/micro/*.css',
      'client/styles/macro/*.css'
    ])
    .pipe(myth())
    .pipe(csso(true))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/styles'));
});

gulp.task('default', [
  'modules',
  'static',
  'styles'
]);