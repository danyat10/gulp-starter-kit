var gulp = require('gulp');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var browsersync = require('browser-sync');
var reload = browsersync.reload;

var paths = {
  jade: "app/jade/**/*.jade",
  styles: "app/css/**/*.scss",
  scripts: "app/js/**/*.js",
  images: "app/img/*"
};

gulp.task('jade', function () {
  return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('build'))
    .pipe(reload({ stream:true }));
});

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(concat('application.css'))
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(reload({ stream:true }));
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(reload({ stream:true }));
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'))
    .pipe(reload({ stream:true }));
});

gulp.task('serve', ['jade', 'styles', 'scripts', 'images'], function() {
  browsersync({
    server: {
      baseDir: './build',
      port: 5000
    }
  });

  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['serve']);