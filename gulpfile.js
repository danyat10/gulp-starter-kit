var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');

var paths = {
  location: {
    jade: "app/jade/**/*.jade",
    styles: "app/css/**/*.scss",
    scripts: "app/js/**/*.js",
    images: "app/img/*"
  },
  destination: {
    jade: "build",
    styles: "build/css",
    scripts: "build/scripts",
    images: "build/images"
  }
};

gulp.task('jade', function () {
  return gulp.src(paths.location.jade)
    .pipe(jade())
    .pipe(gulp.dest(paths.destination.jade));
});

gulp.task('styles', function () {
  return gulp.src(paths.location.styles)
    .pipe(concat('application.css'))
    .pipe(sass())
    .pipe(gulp.dest(paths.destination.styles));
});

gulp.task('scripts', function () {
  return gulp.src(paths.location.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.destination.scripts));
});

gulp.task('images', function () {
  return gulp.src(paths.location.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.destination.images));
});

gulp.task('watch', function () {
  gulp.watch(paths.location.jade, ['jade']);
  gulp.watch(paths.location.styles, ['styles']);
  gulp.watch(paths.location.scripts, ['scripts']);
  gulp.watch(paths.location.images, ['images']);
});

gulp.task('default', ['watch', 'jade', 'styles', 'scripts', 'images']);