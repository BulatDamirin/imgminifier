const gulp  = require('gulp'),
	  nokey = require('gulp-tinypng-nokey');
const imagemin = require("gulp-imagemin");
const webp = require("imagemin-webp");
const extReplace = require("gulp-ext-replace");

gulp.task('default', function() {
	return gulp.src('img/**/*')
		.pipe(nokey())
		.pipe(gulp.dest('miniImg'));
});



gulp.task("imagemin", function() {
  let src = "miniImg/**/*"; // Where your PNGs are coming from.
  let dest = "dist"; // Where your WebPs are going.

  return gulp.src(src)
    .pipe(imagemin([
      webp({
        quality: 100
      })
    ]))
    .pipe(extReplace(".webp"))
    .pipe(gulp.dest(dest));
});