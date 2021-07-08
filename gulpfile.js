const { task, src, dest, series, parallel } = require('gulp');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const watch = require('gulp-watch');
const clean = require('gulp-clean');

task('clean', function (cb) {
  // 清空旧的
  src('dist/', { read: false })
    .pipe(clean());
  cb()
})

task('copy', function (cb) {
  // 拷贝静态资源
  src([
    'src/*.json',
    'src/random/*.json',
    'src/static/*',
  ], { base: './src' })
    .pipe(dest('dist'))
  cb()
})

task('tsc', function (cb) {
  // 编译ts
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(dest("dist"));
  cb()
})

task('default', series('copy', 'tsc'));

// watch('src/*', ['copy', 'tsc']);