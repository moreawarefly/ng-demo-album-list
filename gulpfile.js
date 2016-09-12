const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const templateCache = require('gulp-angular-templatecache');
const es = require('event-stream');
const htmlmin = require('gulp-htmlmin');
const inlinesource = require('gulp-inline-source');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


gulp.task('default', ['devServer']);
gulp.task('build', ['prepareBuild'], build);
gulp.task('serveBuild', ['build', 'serveMock'], serveBuild);


gulp.task('prepareBuild', [
    'populateTmpDirDist',
    'concatJsDist',
    'transpileScssDist',
]);
gulp.task('devServer', [
    'populateTmpDirDev',
    'concatJsDev',
    'transpileScssDev',
    'watch',
    'serveTmp',
    'serveMock',
]);
gulp.task('populateTmpDirDist', populateTmpDirDist);
gulp.task('concatJsDist', concatJsDist);
gulp.task('transpileScssDist', transpileScssDist);
gulp.task('concatJsDev', concatJsDev);
gulp.task('populateTmpDirDev', populateTmpDirDev);
gulp.task('transpileScssDev', transpileScssDev);
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
        pipe(htmlmin({
            collapseWhitespace: true,
        })).pipe(templateCache());
}

function concatJsDev() {
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
function concatJsDist() {
    return es.merge(gulp.src([
        './src/js/app.js',
        './.tmp/js/templates.js',
        './src/js/**/*.js',
    ]), compileTemplates()).
        pipe(concat('app.js')).
        pipe(babel({
            presets: ['es2015'],
        })).
        pipe(uglify()).
        pipe(gulp.dest('.tmp/js'));
}

function populateTmpDirDev() {
    gulp.src([
        './src/index.html',
    ]).pipe(gulp.dest('.tmp/'));
}
function populateTmpDirDist() {
    gulp.src([
        './src/index.html',
    ]).pipe(htmlmin({
        collapseWhitespace: true,
    })).pipe(gulp.dest('.tmp/'));
}

function transpileScssDev() {
    gulp.src('./src/css/css.scss').
        pipe(sourcemaps.init()).
        pipe(sass().on('error', sass.logError)).
        pipe(sourcemaps.write()).
        pipe(gulp.dest('./.tmp/css'));
}
function transpileScssDist() {
    gulp.src('./src/css/css.scss').
        pipe(sass({
            outputStyle: 'compressed',
        }).on('error', sass.logError)).
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
function serveBuild() {
    connect.server({
        port: 9000,
        root: './dist',
    });
}

function reload() {
    gulp.src('./.tmp/*').
        pipe(connect.reload());
}

function watchHtml() {
    gulp.watch([
        './src/*.html',
    ], ['populateTmpDirDev', 'reload']);
}

function watchAngular() {
    gulp.watch([
        './src/js/**/*.js',
        './src/views/**/*.html',
    ], ['concatJsDev', 'reload']);
}

function watchSass() {
    gulp.watch([
        './src/css/*.scss',
    ], ['transpileScssDev', 'reload']);
}

function build() {
    return gulp.src('./.tmp/index.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./dist'));
}

function cors(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(next, 1000);
}
