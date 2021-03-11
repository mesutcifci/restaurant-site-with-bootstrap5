const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');

const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const uglify = require('gulp-uglify');


gulp.task('style', () => {
    const plugins = [
        autoprefixer({ cascade: false }),
        cssnano()
    ];
    return gulp.src('./style.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream())
})


gulp.task('javascript', () => {
    return gulp.src('./index.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/'))
})


gulp.task('browsersync', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })

    gulp.watch('./index.html').on('change', reload);

    gulp.watch(['./style.css'], gulp.series('style'));
    gulp.watch(['./index.js'], gulp.series('javascript'));
});


gulp.task('default', () => {
    gulp.watch(['./style.css', './index.js'], gulp.series('browsersync'));
});

