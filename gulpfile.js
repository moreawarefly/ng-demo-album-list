const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const templateCache = require('gulp-angular-templatecache');
const es = require('event-stream');
const cors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(next, 1000);
};

gulp.task('default', ['devServer']);

gulp.task('devServer', [
    'populateTmpDir',
    'concatJs',
    'transpileScss',
    'watch',
    'serveTmp',
    'serveMock',
]);
gulp.task('concatJs', concatJs);
gulp.task('populateTmpDir', populateTmpDir);
gulp.task('transpileScss', transpileScss);
gulp.task('serveTmp', serveTmp);
gulp.task('serveMock', serveMock);
gulp.task('reload', reload);
gulp.task('watchHtml', watchHtml);
gulp.task('watchAngular', watchAngular);
gulp.task('watchSass', watchSass);
gulp.task('watch', [
    'watchHtml',
    'watchAngular',
    'watchSass',
]);

function compileTemplates() {
    return gulp.src('./src/views/**/*.html').
        pipe(templateCache());
}

function concatJs() {
    return es.merge(gulp.src([
        './src/js/app.js',
        './.tmp/js/templates.js',
        './src/js/**/*.js',
    ]), compileTemplates()).
        pipe(sourcemaps.init()).
        pipe(concat('app.js')).
        pipe(sourcemaps.write()).
        pipe(gulp.dest('.tmp/js'));
}

function populateTmpDir() {
    gulp.src([
        './src/index.html',
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
        middleware: () => [cors],
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

function watchAngular() {
    gulp.watch([
        './src/js/**/*.js',
        './src/views/**/*.html',
    ], ['concatJs', 'reload']);
}

function watchSass() {
    gulp.watch([
        './src/css/*.scss',
    ], ['transpileScss', 'reload']);
}
