'use strict';

import gulp from "gulp";
import gutil from "gulp-util";
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import uglify from "gulp-uglify";
import sourcemaps from "gulp-sourcemaps";
import del from 'del'

const SRC = "src/app/Root.jsx";
const DEST_FOLDER = "public/js/";
const DEST_FILE = "bundle.js";

const config = {
    debug: gutil.env.debug || false
}

gulp.task('clean', function() {
    return del([DEST_FOLDER + DEST_FILE, DEST_FOLDER + DEST_FILE + ".map"]);
});

gulp.task('js', () => {
    // set up the browserify instance on a task basis
    let b = browserify({
        entries: SRC,
        debug: true
    });

    return b
        .transform("babelify", {
            presets: ["es2015", "react"],
            plugins: ['transform-decorators-legacy', 'transform-object-rest-spread']
        })
        .bundle()
        .pipe(source(DEST_FILE))
        .pipe(buffer())
        .pipe(config.debug ? sourcemaps.init({loadMaps: true}) : gutil.noop())
        .pipe(config.debug ? gutil.noop() : uglify())
        .on('error', gutil.log)
        .pipe(config.debug ? sourcemaps.write('./') : gutil.noop())
        .pipe(gulp.dest(DEST_FOLDER));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['js']);
});

gulp.task('default', ['clean', 'js', 'watch'])