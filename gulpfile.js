const gulp = require('gulp');
const gutil = require('gulp-util');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const filelist = require('gulp-filelist')
const merge = require('gulp-merge-json');
const browserSync = require('browser-sync').create();

const conf = require('./icons.json');
const sets = conf.sets;
const config = conf.config

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('clean', function() {
  gulp.src(['./css', './fonts'])
  .pipe(clean());
});

var set = sets[0],
    icons = set.icons,
    dest = './fonts/' + set.name + '/',
    fontPath = config || '../fonts';

gulp.task('buildIcons', function() {
    gulp.src(set.src + '/*.svg')
      .pipe(iconfontCss({
        fontName: set.name,
        path: './base/base.css',
        targetPath: '../../css/' + set.name +'.css',
        fontPath: fontPath + '/' + set.name + '/',
        cssClass: set.prefix
      }))
      .pipe(iconfont({
        fontName: set.name,
        formats: ['svg', 'ttf', 'eot', 'woff']
      }))
      .pipe(gulp.dest(dest));
      console.log(set.title + ' icon font created!');
});

gulp.task('buildIconsList', function() {
  gulp.src(set.src + '/*.svg')
    .pipe(filelist(set.name + '.json', {
      removeExtension: true,
      flatten: true
    }))
    .pipe(merge( set.name + '.json', false, set))
    .pipe(gulp.dest(dest));
});

gulp.task('default', gulp.series('clean', 'buildIcons', 'buildIconsList', function() {

}));


// .pipe(filelist(set.name + '.json', {
//   removeExtension: true,
//   flatten: true
// }))
// .pipe(gulp.dest(dest));

// gulp.src(dest)
//   .pipe(merge( set.name + '.json', false, set))
//   .pipe(gulp.dest(dest));
