/**
 * Created by kyleparisi on 1/12/16.
 */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    babel = require('gulp-babel');

/*
 *  CONFIG
 */

var config = {
    src: {
        sass: {
            main: 'src/sass/*.scss',
            dir: 'src/sass/**/*.scss'
        },
        js: {
            main: ['src/js/modules/*.js', '!src/js/modules/*.spec.js']
        }
    },
    dist: {
        css: 'dist/css',
        js: 'dist/js'
    },
    clean: ['dist', 'node_modules']
};

/*
 *  INDIVIDUAL TASKS
 */

gulp.task('sass', function () {
    gulp.src(config.src.sass.main)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.dist.css));
});

gulp.task('sass:watch', function () {
    gulp.watch(config.src.sass.dir, ['sass']);
});

gulp.task('babel', function () {
    gulp.src(config.src.js.main)
        .pipe(babel())
        .pipe(gulp.dest(config.dist.js));
});

gulp.task('babel:watch', function () {
    gulp.watch(config.src.js.main, ['babel']);
});

gulp.task('clean', function () {
    gulp.src(config.clean, {read: false})
        .pipe(clean());
});

gulp.task('default', ['sass']);