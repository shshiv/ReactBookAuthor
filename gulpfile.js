"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //run local dev server
var open = require('gulp-open'); // open URL in web browser
var browserify = require('browserify'); // bundle JS
var reactify = require('reactify'); // Transform react JSX to JS
var source = require('vinyl-source-stream'); // use conventional text stream with Gulp
var concat = require('gulp-concat'); // Concatenates files

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths:{
      html:'./src/*.html',
      js: './src/**/*.js',
      images: './src/images/*',
      css : [
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      ],
      dist:'./dist',
      mainJs: './src/main.js'
    }
}

//start a local development serevr
gulp.task('connect',function(){
    connect.server({
      root:['dist'],
      port: config.port,
      base: config.devBaseUrl,
      livereload: true
    });
});

gulp.task('open',['connect'], function(){
  gulp.src('dist/index.html')
    .pipe(open('',{ url: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html',function(){
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('js', function(){
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error',console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('css',function(){
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function(){
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());

  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.paths.dist));
})
gulp.task('watch', function(){
  gulp.watch(config.paths.html,['html']);
  gulp.watch(config.paths.js,['js']);
})

gulp.task('default',['html','js','css','images','open','watch']);
