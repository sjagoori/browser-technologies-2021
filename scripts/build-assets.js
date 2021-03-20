const gulp = require('gulp')

moveAssets()

function moveAssets() {
  gulp.src([
    './static/*/*.*',
  ])
    .pipe(gulp.dest('./dist/'))
  return

}
