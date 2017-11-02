var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var ghPages = require('gulp-gh-pages');

gulp.task('default', function(callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  );
});

gulp.task('boot', function(callback) {
  runSequence('clean:dist',
    'copy',
    ['sass', 'images', 'fonts'],
    'useref',
    'watch',
    callback
  );
});

gulp.task('deploy', ['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({ branch: 'master' }));
});

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('useref', function() {
  return gulp.src('app/**/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano({
      discardComments: {
        removeAll: true
      }
    })))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src('app/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('fonts', function() {
  return gulp.src('app/css/libs/font/**/*')
  .pipe(gulp.dest('dist/font'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('clean:libs:js', function() {
  return del.sync('app/js/libs');
});

gulp.task('clean:libs:css', function() {
  return del.sync('app/css/libs');
});

gulp.task('clean:css', function() {
  return del.sync('app/css/*');
});

gulp.task('clean:bower', function() {
  return del.sync('bower_components');
});

gulp.task('clean:node', function() {
  return del.sync('node_modules');
});

gulp.task('clean:temps', [
    'clean:dist',
    'clean:libs:js',
    'clean:libs:css',
    'clean:css'
  ],
  function(callback) {
    callback;
  }
);

gulp.task('clean:all', [
    'clean:dist',
    'clean:libs:js',
    'clean:libs:css',
    'clean:bower',
    'clean:node'
  ],
  function(callback) {
    callback;
  }
);

gulp.task('build', function(callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'images', 'fonts'],
    callback
  );
});

gulp.task('copy', function(callback) {
  return runSequence(
    'copy:mdb:css',
    'copy:font',
    'copy:img',
    'copy:mdb:js',
    'copy:jquery',
    'copy:popper',
    'copy:typed',
    'copy:clipboard',
    callback
  );
});

gulp.task('copy:mdb:css', function() {
  return gulp.src('bower_components/MDBootstrap/css/**')
  .pipe(gulp.dest('./app/css/libs/MDBootstrap'));
});

gulp.task('copy:font', function() {
  return gulp.src('bower_components/MDBootstrap/font/**')
  .pipe(gulp.dest('./app/css/libs/font'));
});

gulp.task('copy:img', function() {
  return gulp.src('bower_components/MDBootstrap/img/**')
  .pipe(gulp.dest('./app/css/libs/img'));
});

gulp.task('copy:mdb:js', function() {
  return gulp.src('bower_components/MDBootstrap/js/**')
  .pipe(gulp.dest('./app/js/libs/MDBootstrap'));
});

gulp.task('copy:jquery', function() {
  return gulp.src('bower_components/jquery/dist/**')
  .pipe(gulp.dest('./app/js/libs/jquery'));
});

gulp.task('copy:popper', function() {
  return gulp.src('bower_components/popper.js/dist/**')
  .pipe(gulp.dest('./app/js/libs/popper.js'));
});

gulp.task('copy:typed', function() {
  return gulp.src('bower_components/typed.js/lib/**')
  .pipe(gulp.dest('./app/js/libs/typed.js'));
});

gulp.task('copy:clipboard', function() {
  return gulp.src('bower_components/clipboard/dist/**')
  .pipe(gulp.dest('./app/js/libs/clipboard'));
});
