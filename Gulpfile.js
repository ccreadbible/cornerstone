'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var jsDoc = require('gulp-jsdoc-to-markdown');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');
var docco = require('gulp-docco');
var localVars;

var paths = {
  docs: [
    'index.js'
  ]
};
// try to load up local vars
try {
  localVars = require('./config/_local');
} catch(e) {
  localVars = {};
}

gulp.task('set', function() {
  _.forEach(localVars, function(val, name) {
    process.env[name] = val;
  });
});

gulp.task('docco', function() {
  return gulp.src(paths.docs)
    .pipe(concat('Red-Bull-Vodka.js'))
    .pipe(docco({
      layout: 'parallel'
    }))
    .pipe(gulp.dest('./docs'));
});

// gulp.task('test', function(){
//   return gulp.src(['specs/setup/**/*.js', 'specs/unit/**/*Spec.js'])
//     .pipe(mocha({
//     }))
//     .on('end', function(){
//       process.exit();
//     });
// });

gulp.task('default', ['set']);