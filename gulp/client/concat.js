var gulp = require('gulp');
var concat = require('gulp-concat', {recurse : true});

/* This will create concatenate all our angular
 * code into one file the bundle.js and place it
 * in the dist folder
 */
gulp.task('concat:jsi', function() {
  return gulp.src([
    './client/app/app.module.js',
    './client/app/**/*.module.js',
    './client/app/**/*.js'
  ])
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./dist/'));
});


/*
gulp.task('concat:jsIndex', function() {
  return gulp.src([
    './client/assets/js/jquery-1.11.3.min.js',
    './client/assets/js/bootstrap.js',
    './client/assets/js/neon-slider.js',
    './client/assets/js/neon-custom.js',
    './client/assets/js/gsap/TweenMax.min.js',
    './client/assets/js/js.cookie.js'
  ])
  .pipe(concat('bundleIndex.js'))
  .pipe(gulp.dest('./dist/assets/js'));
});
*/

gulp.task('concat:js', function() {
  return gulp.src([
    './client/assets/js/bootstrap.js',
    './client/assets/js/joinable.js',
    './client/assets/js/neon-custom.js',
    './client/assets/js/gsap/TweenMax.min.js',
    './client/assets/js/js.cookie.js',
    './client/assets/js/socket.io.js',
    './client/assets/js/neon-api.js',
    './client/assets/js/handlebars-v4.0.5.js',
    './client/assets/js/neon-slider.js',
    './client/assets/js/jquery-ui/js/jquery-ui-1.10.3.minimal.min.js'
  ])
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./dist/assets/js'));
});

/* Concatenate all css files into bundle.css and place it
 * in dist/assets folder
 */
gulp.task('concat:css', function() {
  return gulp.src(['./client/assets/*.css', '!./client/assets/css/neon.css', '!./client/assets/css/bootstrap.css'])
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./dist/'));
});

