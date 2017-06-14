var gulp = require('gulp');

/* This will create the dist folder
 * That is ready to serve by our backend
 */
gulp.task('dist', [
  'bower',
  'concat:css',
  'concat:js',
  'concat:cssAppointment',
  'copy:assets',
  'copy:bower-components',
  'copy:views',
  'copy:css',
  'copy:js',
  'copy:images'
]);
