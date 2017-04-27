'use strict';

import gulp from 'gulp'
import gUtil from 'gulp-util'

gulp.task('browserify', () => {
    gUtil.log("hello world");
});

gulp.task('default', ['browserify'])