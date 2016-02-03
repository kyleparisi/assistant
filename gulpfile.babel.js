/**
 * Created by kyleparisi on 1/12/16.
 */

import {spawn} from 'child_process'
import BrowserSync from 'browser-sync'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import runElectronApp from './runner'

const $ = gulpLoadPlugins()
const browserSync = BrowserSync.create()

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
            main: ['src/js/modules/**/*.js', '!src/js/modules/*.spec.js']
        }
    },
    dist: {
        css: 'dist/css',
        js: 'dist/js'
    },
    clean: ['dist', 'node_modules']
}

/*
 *  INDIVIDUAL TASKS
 */

gulp.task('sass', () => {
    gulp.src(config.src.sass.main)
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gulp.dest(config.dist.css))
})

gulp.task('sass:watch', () => {
    gulp.watch(config.src.sass.dir, ['sass'])
})

gulp.task('babel', () => {
    gulp.src(config.src.js.main)
        .pipe($.plumber())
        .pipe($.babel())
        .pipe(gulp.dest(config.dist.js))
        .pipe(browserSync.stream())
})

gulp.task('babel:watch', () => {
    gulp.watch(config.src.js.main, ['babel'])
})

gulp.task('run', () => {
    runElectronApp(__dirname);
})

gulp.task('browser-sync', ['babel', 'babel:watch'], cb => {

    function getRootUrl(options) {
        const port = options.get('port');
        return `http://localhost:${port}`;
    }

    function getClientUrl(options) {
        const connectUtils = require('browser-sync/lib/connect-utils');
        const pathname = connectUtils.clientScript(options);
        return getRootUrl(options) + pathname;
    }

    const options = {
        ui: false,
        // Port 35829 = LiveReload's default port 35729 + 100.
        // If the port is occupied, Browsersync uses next free port automatically.
        port: 35829,
        ghostMode: false,
        open: false,
        notify: false,
        logSnippet: false,
        socket: {
            // Use the actual port here.
            domain: getRootUrl
        }
    };

    browserSync.init(options, (err, bs) => {
        if (err) {
            return cb(err);
        }

        runElectronApp(__dirname, {
            BROWSER_SYNC_CLIENT_URL: getClientUrl(bs.options),
            NODE_ENV: 'development'
        });

    });
})

gulp.task('clean', () => {
    gulp.src(config.clean, {read: false})
        .pipe($.clean())
})

gulp.task('default', ['sass'])