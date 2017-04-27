'use strict';

import gulp from 'gulp'
import gUtil from 'gulp-util'
import browserify from 'gulp-browserify'
import reactify from 'reactify'

const SRC = "src/app/Root.jsx";
const DEST = "public/js/bundle.js";

gulp.task('browserify', () => {
    gulp.src(SRC)
        .pipe(browserify({
            transform: [reactify]
        }))
        .pipe(gulp.dest(DEST))
});

gulp.task('default', ['browserify'])