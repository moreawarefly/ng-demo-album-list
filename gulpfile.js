const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const templateCache = require('gulp-angular-templatecache');
const es = require('event-stream');
const htmlmin = require('gulp-htmlmin');
const inlinesource = require('gulp-inline-source');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const browserSyncContent = browserSync.create();
const browserSyncMock = browserSync.create();


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
gulp.task('concatAndReload', ['concatJsDev'], () => browserSyncContent.reload());
gulp.task('populateTmpDirDev', populateTmpDirDev);
gulp.task('transpileScssDev', transpileScssDev);
gulp.task('serveTmp', serveTmp);
gulp.task('serveMock', serveMock);
gulp.task('watchAngular', watchAngular);
gulp.task('watchSass', watchSass);
gulp.task('watch', [
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
        pipe(gulp.dest('./.tmp/css')).
        pipe(browserSyncContent.stream());
}
function transpileScssDist() {
    gulp.src('./src/css/css.scss').
        pipe(sass({
            outputStyle: 'compressed',
        }).on('error', sass.logError)).
        pipe(gulp.dest('./.tmp/css'));
}

function serveTmp() {
    browserSyncContent.init({
        server: {
            baseDir: '.tmp',
        },
        port: 9000,
        open: false,
    });
}
function serveMock() {
    browserSyncMock.init({
        server: {
            baseDir: 'mock',
            index: 'albums.json',
        },
        ui: false,
        port: 9001,
        open: false,
        middleware: [corsAndDelay],
    });
}
function serveBuild() {
    browserSyncContent.init({
        server: {
            baseDir: 'dist',
        },
        port: 9000,
        open: false,
    });
}

function watchAngular() {
    gulp.watch([
        './src/js/**/*.js',
        './src/views/**/*.html',
    ], ['concatAndReload']);
}

function watchSass() {
    gulp.watch([
        './src/css/*.scss',
    ], ['transpileScssDev']);
}

function build() {
    return gulp.src('./.tmp/index.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./dist'));
}

function corsAndDelay(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(next, 1000);
}
