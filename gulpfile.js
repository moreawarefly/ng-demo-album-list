const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');


gulp.task('default', ['devServer']);

gulp.task('devServer', [
    'populateTmpDir',
    'transpileScss',
    'watch',
    'serveTmp',
    'serveMock',
]);
gulp.task('populateTmpDir', populateTmpDir);
gulp.task('transpileScss', transpileScss);
gulp.task('serveTmp', serveTmp);
gulp.task('serveMock', serveMock);
gulp.task('reload', reload);
gulp.task('watchHtml', watchHtml);
gulp.task('watchSass', watchSass);
gulp.task('watch', [
    'watchHtml',
    'watchSass',
]);

function populateTmpDir() {
    gulp.src([
        'src/**/*',
        '!src/css/**/*.scss',
    ]).pipe(gulp.dest('.tmp/'));
}

function transpileScss() {
    gulp.src('./src/css/css.scss').
        pipe(sourcemaps.init()).
        pipe(sass().on('error', sass.logError)).
        pipe(sourcemaps.write()).
        pipe(gulp.dest('./.tmp/css'));
}

function serveTmp() {
    connect.server({
        port: 9000,
        root: '.tmp',
        livereload: true,
    });
}
function serveMock() {
    connect.server({
        port: 9001,
        root: 'mock',
        index: 'albums.json',
    });
}

function reload() {
    gulp.src('./.tmp/*').
        pipe(connect.reload());
}

function watchHtml() {
    gulp.watch([
        './src/*.html',
    ], ['populateTmpDir', 'reload']);
}

function watchSass() {
    gulp.watch([
        './src/css/*.scss',
    ], ['transpileScss', 'reload']);
}
