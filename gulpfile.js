/**
 * @license
 * The MIT License
 *
 * Copyright (c) 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/**
 * @fileoverview Build process for wicked-good-xpath.
 * @author zhoumotongxue008@gmail.com (Michael Zhou)
 */

'use strict';

var gulp = require('gulp');
var closureCompiler = require('google-closure-compiler').gulp();

gulp.task('compile', function() {
  return gulp.src([
          'src/*.js',
          '!src/*_test.js',
          'node_modules/google-closure-library/closure/**/*.js',
          '!node_modules/google-closure-library/closure/**/*_test.js'
      ])
      .pipe(closureCompiler({
        assume_function_wrapper: true,
        compilation_level: 'ADVANCED',
        dependency_mode: 'STRICT',
        entry_point: 'goog:wgxpath',
        language_in: 'ES6_STRICT',
        language_out: 'ES5_STRICT',
        js_output_file: 'wgxpath.install.js',
        output_wrapper: '(function(){%output%}).call(this)',
        use_types_for_optimization: true,
        warning_level: 'VERBOSE'
      }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('compile-node', function() {
  return gulp.src([
          'src/*.js',
          '!src/*_test.js',
          '!src/nodeModuleExterns.js',
          'node_modules/google-closure-library/closure/**/*.js',
          '!node_modules/google-closure-library/closure/**/*_test.js',
      ])
      .pipe(closureCompiler({
        assume_function_wrapper: true,
        compilation_level: 'ADVANCED',
        dependency_mode: 'STRICT',
        entry_point: 'goog:wgxpath.nodeModuleExports',
        externs: 'src/nodeModuleExterns.js',
        language_in: 'ES6_STRICT',
        language_out: 'ES5_STRICT',
        js_output_file: 'wgxpath.install-node.js',
        output_wrapper: '(function(){%output%}).call(global)',
        use_types_for_optimization: true,
        warning_level: 'VERBOSE'
      }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['compile', 'compile-node']);
