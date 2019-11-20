const gulp       = require('gulp');
const nokey      = require('gulp-tinypng-nokey');
const imagemin   = require("gulp-imagemin");
const webp       = require("imagemin-webp");
const extReplace = require("gulp-ext-replace");
const watermark  = require("gulp-watermark");
const gm         = require('gulp-gm');
const imageResize = require('gulp-image-resize');


const mainFolder = 'img/**/*';

const forCompressFolder = 'compress';
const forWebpFolder = "webp";
const forWatermarkFolder = "watermark-complete-img";
const generalFolder = "general";

const serviceFolders = {
	self: "service-folders/",
	temporaryFolder: this.self + "temporaryFolder",
	watermarks: this.self + "watermarks",
}


gulp.task('compress', function() {
	return gulp.src(mainFolder, {base:"."})
		.pipe(nokey())
		.pipe(gulp.dest(forCompressFolder));
});

gulp.task('resize', function() {
	return gulp.src(mainFolder, {base:"."})
		.pipe(imageResize({
			width : 1200,
			height: 1200,
			crop : false,
			upscale : false
		}))
		.pipe(gulp.dest(forCompressFolder));
})

gulp.task('compress-resize', function() {
	return gulp.src(mainFolder, {base:"."})
		.pipe(imageResize({
			width : 1200,
			crop : false,
			upscale : false
		}))
		.pipe(nokey())
		.pipe(gulp.dest(forCompressFolder));
})

gulp.task("webp", function() {
  return gulp.src(mainFolder, {base:"."})
    .pipe(imagemin([
      webp({
        quality: 100
      })
    ]))
    .pipe(extReplace(".webp"))
    .pipe(gulp.dest(forWebpFolder));
});

gulp.task("watermark", function() {
	return gulp.src(mainFolder)
		.pipe(watermark({
			image: serviceFolders.watermarks + '/logo.png',
			resize: '60%',
			gravity: 'North',
			dissolve: 30
		}))
		
		.pipe(gulp.dest(forWatermarkFolder));
})