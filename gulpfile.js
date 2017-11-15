'use strict';
let gulp = require('gulp');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let babel = require('gulp-babel');
/**
 * 编译sass文件
 */
gulp.task('sass', function () {
    return gulp.src('./**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
});
/**
 * 编译js文件
 */
gulp.task('es6-js', function () {
    //pages下面的业务代码进行babel处理
    gulp.src(['./es6-demos/**/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist/js'));
});
/**
 * 运行任务
 */
gulp.task('default', ['es6-js','sass'], function () {
    gulp.watch('./src/js/**/*.js', ['es6-js']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});