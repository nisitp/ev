// gulpfile.js
// Alexander Rhett Crammer
// August 29, 2016
var gulp = require('gulp');
var debug = require('gulp-debug');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var fs = require('fs');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function () {
  // Run Browser-Sync
  browserSync.init([
    'app.js',
    'app.css',
    'scripts/**',
    'templates/**',
    'index.html'
  ], {
    proxy: 'my-revolution.dev',
    // proxy: 'ev.hotsauceatl.com',
    injectChanges: true,
    open: false,
    browser: "Google Chrome"
  });
});

// Compile Sass and source maps
gulp.task('sass', function () {
  gulp.src(["scss/*.scss", "scss/partials/*.scss", "scss/pages/*.scss"])
    // .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest("stylesheets"))
    // .pipe(browserSync.stream());
});

// Watch and compile Sass
gulp.task('sass:watch', function () {
  gulp.watch([
    'scss/*.scss',
    'scss/partials/*.scss',
    'scss/pages/*.scss'
  ], ['sass']);
});

gulp.task('merge-styles', function () {
  // Delete the contents of 'app.css'
  fs.truncateSync('app.css');

  // Concatenate all of the styles to 'app.css'
  gulp.src(['stylesheets/**'])
    .pipe(debug({title: 'Merge Stylesheet:'}))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('merge-styles:watch', function () {
  gulp.watch('stylesheets/**', ['merge-styles']);
});

gulp.task('merge-scripts', function () {
  // Concatenate all of the scripts to 'app.js'
  gulp.src([
    'app/**',
    'scripts/**'
  ])
    .pipe(debug({title: 'Merge Script:'}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('merge-scripts:watch', function () {
  gulp.watch(['app/**', 'scripts/**'], ['merge-scripts'])
});

gulp.task('zip', function () {
  var currentDate = new Date();

  var monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ][currentDate.getMonth()];

  return gulp.src([
    './**',
    '!app',
    '!app/**',
    '!bin',
    '!bin/**',
    '!App_Data',
    '!App_Data/**',
    '!bower.json',
    '!gulpfile.js',
    '!node_modules',
    '!node_modules/**',
    '!package.json',
    '!scss',
    '!scss/**',
    '!stylesheets',
    '!stylesheets/**'
  ])
    .pipe(zip('Deployment-Package-' + currentDate.getFullYear() + '-' + monthName + '-' + currentDate.getDate() + '.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('prepare', [
  'sass',
  'merge-styles',
  'merge-scripts'
]);

gulp.task('default', [
  'browserSync',
  'sass:watch',
  'merge-styles:watch',
  'merge-scripts:watch'
]);
