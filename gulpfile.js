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
  }
};

gulp.task('jade', function () {
  return gulp.src(paths.location.jade)
    .pipe(jade())
    .pipe(gulp.dest('build'));
});

gulp.task('styles', function () {
  return gulp.src(paths.location.styles)
    .pipe(concat('application.css'))
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function () {
  return gulp.src(paths.location.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('images', function () {
  return gulp.src(paths.location.images)
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function () {
  gulp.watch(paths.location.jade, ['jade']);
  gulp.watch(paths.location.styles, ['styles']);
  gulp.watch(paths.location.scripts, ['scripts']);
  gulp.watch(paths.location.images, ['images']);
});

gulp.task('default', ['watch', 'jade', 'styles', 'scripts', 'images']);