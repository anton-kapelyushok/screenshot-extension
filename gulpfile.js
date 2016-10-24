const gulp = require('gulp');
const watch = require('gulp-watch');
const webpack = require('webpack-stream');
const path = require('path');

const PATHS = require('./paths.js');

gulp.task('webpack', function(done) {
    return gulp.src('')
        .pipe(webpack(require('./webpack.config.js')))
        .on('error', function(error) {
            done(error);
        })
        .pipe(gulp.dest(PATHS.build));
});

gulp.task('copyStatic', function() {
    return gulp.src(PATHS.staticFiles)
        .pipe(gulp.dest(PATHS.build));
});

gulp.task('build', ['webpack', 'copyStatic']);
gulp.task('watch', ['build'], function() {
    gulp.watch(path.join(PATHS.src, '/**/*'), ['build']);
});

gulp.task('default', ['watch']);
