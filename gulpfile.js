const gulp = require('gulp');
const gutil = require('gulp-util');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const filelist = require('gulp-filelist')
const jsoncombine = require('gulp-jsoncombine');
const del = require('del');

const conf = require('./icons.json');
const sets = conf.sets;
const config = conf.config
const fontPath = config.path || '../fonts';

// Static server
const browserSync = require('browser-sync').create();
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('clean', function() {
  return del(['./css', './fonts']);
});


gulp.task('buildIcons', function(done) {
    for (var i = 0; i < sets.length; i++) {
      set = sets[i]
      gulp.src(set.src + '**/*.svg')
       .pipe(iconfontCss({
         fontName: set.name,
         path: './base/base.css',
         targetPath: '../../css/' + set.name +'.css',
         fontPath: fontPath + '/' + set.name + '/',
         cssClass: set.prefix
       }))
       .pipe(iconfont({
         fontName: set.name,
         normalize: true,
         formats: ['svg', 'ttf', 'eot', 'woff']
       }))
       .pipe(gulp.dest('./fonts/' + set.name + '/'));
       console.log(set.title + ' icon font created!');
    }
    done();
});

gulp.task('createJsonFile', function(done) {
  for (var i = 0; i < sets.length; i++) {
    set = sets[i];
    gulp.src(set.src + '**/*.svg')
    .pipe(filelist(set.name + '.json', {
      removeExtensions: true,
      flatten: true
    }))
    .pipe(gulp.dest('./fonts/' + set.name + '/'));
  }
  done();
});

gulp.task('default', gulp.series('clean', 'buildIcons', 'createJsonFile', function(done) {
  done();
}));
