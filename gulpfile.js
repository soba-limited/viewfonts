var gulp = require('gulp');
var isChanged = require('gulp-changed');
var minifyImg = require('gulp-imagemin');
var minifyImg_JPG = require('imagemin-jpeg-recompress');
var minifyImg_PNG = require('imagemin-pngquant');
var minifyImg_GIF = require('imagemin-gifsicle');
var svgmin = require('gulp-svgmin');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var gcmq = require('gulp-group-css-media-queries');
var csscomb = require('gulp-csscomb'); //cssプロパティ順序
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var sassGlob = require("gulp-sass-glob");
var sourcemaps = require('gulp-sourcemaps');
sass.compiler = require('sass');

var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

const paths = {
  src: '/xampp/htdocs/viewfonts/dist/build',
  dest: '/html/viewfonts-build',
};

gulp.task('minify-img', function (done) {
  gulp
    .src('./src/complex-img/**/*.+(jpg|jpeg|png|gif)') //src部分は適宜環境に合わせて修正
    .pipe(isChanged('/src/assets/images'))
    .pipe(minifyImg([minifyImg_JPG(), minifyImg_PNG(), minifyImg_GIF()]))
    .pipe(gulp.dest('/src/assets/images'));
  done();
});

gulp.task('svgmin', function (done) {
  gulp
    .src('./src/complex-img/**/*.+(svg)')
    .pipe(isChanged('./src/assets/images'))
    .pipe(svgmin())
    .pipe(gulp.dest('./src/assets/images'));
  done();
});

// Sass compile task
gulp.task('scss', function (done) {
  return gulp
    .src('./src/assets/css/**/*.scss') // コンパイル対象 scss
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      fibers: "fibers"
    }))
    .pipe(plumber({
      errorHandler: notify.onError("Error: &lt;%= error.message %&gt;")
    }))
    .pipe(csscomb())
    .pipe(
      autoprefixer({
        // ☆IEは11以上、Androidは4.4以上
        // その他は最新2バージョンで必要なベンダープレフィックスを付与する設定
        overrideBrowserslist: ['last 2 versions', 'ie >= 11', 'Android >= 6'],
        grid: "autoplace"
      })
    )
    .pipe(gcmq())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/assets/css')); // 出力
  done()
});

// .min.css generate task
gulp.task('mincss', function (done) {
  return gulp
    .src(['./src/assets/css/**/*.css', '!./src/assets/css/**/*.min.css']) //上のタスクで生成した css
    .pipe(cleanCSS()) // css 圧縮
    .pipe(
      rename({
        extname: '.min.css',
      })
    ) // .min.css にリネーム
    .pipe(gulp.dest('./src/assets/css')) // min.css 出力
    .pipe(
      notify({
        title: 'compiled!',
        message: new Date(),
        sound: 'Pop',
      })
    );
  done();
});

// ftp-deploy
gulp.task('ftp', done => {
  var config = {
    user: 'php_test',
    password: 'W6n8wTFb',
    host: '150.60.169.158',
    port: 21,
    localRoot: paths.src,
    remoteRoot: paths.dest,
    include: ['*'],
    deleteRemote: false,
    forcePasv: true,
  };
  ftpDeploy.deploy(config, function (err) {
    if (err) console.log(err);
    else console.log('ftp deploy finished');
  });
  done();
});

gulp.task('default', function (done) {
  // scss watch & ftp deploy
  gulp.watch('./src/assets/css/**/*.scss', gulp.series('scss', 'mincss'));
  gulp.watch('./dist/**/*.*', gulp.series('ftp'));
  gulp.watch(['./src/complex-img/**/*.*'], gulp.series('minify-img', 'svgmin')); //src部分は適宜環境に合わせて修正
  done();
});