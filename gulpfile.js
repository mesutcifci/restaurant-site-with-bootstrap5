const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');

const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');


gulp.task('style', () => {
    const plugins = [
        autoprefixer({ cascade: false }),
        cssnano()
    ];
    return gulp.src('./src/style.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream())
})


gulp.task('imagemin', () => {
    return gulp.src('./images/*')
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 75, progressive: true })
        ]))
        .pipe(gulp.dest('./images/'))
});


gulp.task('htmlmin', () => {
    return gulp.src('./src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./build"))
})

gulp.task('javascript', () => {
    return gulp.src('./src/index.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/'))
})


gulp.task('browsersync', () => {
    browserSync.init({
        server: {
            baseDir: './build/'
        }
    })

    gulp.watch('./src/index.html').on('change', reload);

    gulp.watch(['./src/style.css'], gulp.series('style'));
    gulp.watch(['./src/index.js'], gulp.series('javascript'));
    gulp.watch(['./src/index.html'], gulp.series('htmlmin'));
});


gulp.task('default', () => {
    gulp.watch(['./src/style.css', './src/index.js'], gulp.series('browsersync'));
});

