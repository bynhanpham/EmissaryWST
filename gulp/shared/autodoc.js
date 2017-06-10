var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3', {recurse : true});

gulp.task('doc', function() {
   gulp.src(['README.md',
   "./client/assets/native/js/*.js",
   "./server/*.js",
   "./server/config/*.js",
   "./server/models/*.js",
   "./server/notification/*.js",
   "./server/routes/*",
   "./server/socket/*.js",
   "./server/test/*.js"])
   .pipe(jsdoc());
});
