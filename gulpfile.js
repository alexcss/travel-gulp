const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const files = {
    html : [
        './src/*.html',
        './src/favicon.png'
    ],
    scss : [
        './src/scss/style.scss'
    ], 
    img:[
        './src/img/**/*.*'
    ],
    js : [
        './src/js/jquery-3.3.1.min.js',
        './src/js/slick.min.js',
        './src/js/main.js'
    ]
}
function buildScripts(){
    return gulp.src(files.js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./build/js/'))
        .pipe(browserSync.stream())
}

function buildStyles(){
    return gulp.src(files.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css/'))
        .pipe(browserSync.stream())
}

function buildHtml(){
    return gulp.src(files.html)
            .pipe(gulp.dest('./build/'))
            .pipe(browserSync.stream())
}

function moveImg(){
    return gulp.src(files.img)
            .pipe(gulp.dest('./build/img/'))
            .pipe(browserSync.stream())
}

function watch(){
    browserSync.init({
        server: {
            baseDir: "./build/"
        },
        // tunnel: true
    });

    gulp.watch(files.scss, buildStyles);
    gulp.watch(files.js, buildScripts);
    gulp.watch(files.html, buildHtml);
    gulp.watch(files.img, moveImg);
}

gulp.task('html', buildHtml);
gulp.task('styles', buildStyles);
gulp.task('images', moveImg);
gulp.task('js', buildScripts);
gulp.task('watch', watch);


gulp.task('default', gulp.series(
    gulp.parallel(buildHtml, buildStyles, moveImg, buildScripts),
    watch
));