

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var clean       = require('gulp-clean');

var paths = [
    'app/**/*',
    '!app/**/*.scss'
];


/*
 * Sass task, will run when any SCSS files change & BrowserSync
 * will auto-update browsers
 */
gulp.task('sass', function () {
    return gulp.src('app/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({stream:true}));
});

/* 
 * JS task, will run when any JS files change & BrowserSync
 * will auto-update browsers
 */
gulp.task('js', function () {
    return gulp.src('app/scripts/*.js')
        .pipe(gulp.dest('dist/scripts'))
        .pipe(reload({stream:true}));
});

/*
 * HTML task, will run when any HTML files change & BrowserSync
 * will auto-update browsers
 */
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream:true}));
});


/*
 * Build Task - will copy from app/ to dist/
 */
gulp.task('build', ['clean'], function () {
    return gulp.src(paths)
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}));
});


/*
 * Clean task - removes everything in dist/
 */
gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe(clean());
});


/*
 * Browser-sync task
 */
 gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dist/"
        },
        ghostMode: {
            clicks: true,
            location: false,
            forms: false,
            scroll: true
        },
        //browser: ["google chrome", "firefox", "safari"]
        browser: ["google chrome"]
    });
});


/*
 * Default task to be run with `gulp`
 */
gulp.task('default', ['sass', 'js', 'html', 'browser-sync'], function () {
    gulp.watch("app/styles/*.scss", ['sass']);
    gulp.watch("app/scripts/*.js", ['js']);
    gulp.watch("app/*.html", ['html']);
});
