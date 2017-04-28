'use strict';

import gulp from "gulp";
import gutil from "gulp-util";
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import uglify from "gulp-uglify";
import sourcemaps from "gulp-sourcemaps";

const SRC = "src/app/Root.jsx";
const DEST_FOLDER = "public/js/";
const DEST_FILE = "bundle.js";

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
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(DEST_FOLDER));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['js']);
});

gulp.task('default', ['js', 'watch'])