const { src, dest, watch, series, parallel } = require('gulp');

// console log
function defaultTask(cb) {
  // place code for your default task here
  console.log('gulp 任務安裝成功')
  cb();
}

exports.default = defaultTask


//A 任務
function TaskA(cb) {
  console.log('A任務')
  cb();
}
//B 任務
function TaskB(cb) {
  console.log('B任務')
  cb();
}

//非同步 A先執行完才換B
exports.async = series(TaskA, TaskB);

//同步 AB同時開始執行
exports.sync = parallel(TaskA, TaskB);




//搬家 src(來源路徑) -> dest(目的地)
function move() {
  return src('./src/*.html').pipe(dest('dist'))
}
exports.m = move


const fileinclude = require('gulp-file-include');

function includeHTML() {
  return src('src/*.html') // 來源
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))// fileinclude function
    .pipe(dest('./dist'));// 目的地
}

exports.html = includeHTML;


// js move
function moveJs() {
  return src('js/*.js').pipe(dest('dist/js'))
}

// css move
function moveCss() {
  return src('css/*.css').pipe(dest('dist/css'))
}


const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

function styleSass() {
  return src('./src/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/css'));
}

// 監看
function watchfile() {
  watch(['src/*.html' , 'src/**/*.html'], includeHTML)    // 監看html
  //  watch('js/*.js' , moveJs)  // 監看js
  //  watch('css/*.css' , moveCss)  // 監看js
  watch(['./src/sass/*.scss' ,'./src/sass/**/*.scss'], styleSass)
}
 
exports.w = series(parallel(includeHTML,styleSass), watchfile)

