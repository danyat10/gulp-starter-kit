var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');

gulp.task('jade', function(){
  return gulp.src('app/views/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('src'));
});

gulp.task('styles', function () {
  return gulp.src('app/css/**/*.scss')
    .pipe(concat('application.css'))
    .pipe(sass())
    .pipe(gulp.dest('src/css'));
});

gulp.task('scripts', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'));
});

gulp.task('images', function () {
  return gulp.src('app/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('src/img'));
});