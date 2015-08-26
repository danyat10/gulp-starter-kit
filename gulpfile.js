var gulp = require('gulp');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var connect = require('connect');
var serve = require('serve-static');

var paths = {
  jade: "app/jade/**/*.jade",
  styles: "app/css/**/*.scss",
  scripts: "app/js/**/*.js",
  images: "app/img/*"
};

gulp.task('jade', function () {
  return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('build'));
});

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(concat('application.css'))
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

gulp.task('server', function() {
  return connect().use(serve(__dirname + '/build'))
    .listen(8080)
    .on('listening', function(){
      console.log('Server running: http://localhost:8080');
    });
});

gulp.task('watch', function () {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['jade', 'styles', 'scripts', 'images', 'watch', 'server']);