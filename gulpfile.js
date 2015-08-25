var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');

gulp.task('jade', function () {
  return gulp.src('app/jade/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build'));
});

gulp.task('styles', function () {
  return gulp.src('app/css/**/*.scss')
    .pipe(concat('application.css'))
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('images', function () {
  return gulp.src('app/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function () {
  gulp.watch('app/jade/**/*.jade')
  gulp.watch('app/css/**/*.scss')
  gulp.watch('app/js/**/*.js')
  gulp.watch('app/img/**/*')
});

gulp.task('default', ['jade', 'styles', 'scripts', 'images', 'watch']);