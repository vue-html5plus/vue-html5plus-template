const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);
const watch = require('gulp-watch');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');         // 压缩代码
const concat = require('gulp-concat');         // 合并文件
const gulpif = require('gulp-if');             // 条件判断
const stripDebug = require('gulp-strip-debug');// 删除日志
const minifycss = require('gulp-minify-css');  // 压缩css
const htmlmin = require('gulp-htmlmin');
const del = require("del");                    // 删除文件
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');

// SOURCES CONFIG
const source = {
  static: {
    src: './static/**/*',
    dist: './dist/'
  },
  scripts: { 
    src: './src/**/**/*.js',
    dist: './dist/'
  },
  styles: {
    src: './src/**/**/*.css',
    dist: './dist/'
  },
  htmls: {
    src: './src/**/**/*.html',
    dist: './dist/'
  },
  assets: {
    src: './src/assets/**/*',
    dist: './dist/assets/'
  }
};

// 编译 .js 文件
function buildJS(src, dist) {
  gulp.src(src)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
    .pipe(gulpif(process.env.NODE_ENV === 'production', stripDebug()))
    .pipe(gulp.dest(dist));
}

// 编译 .css 文件
function buildCSS(src, dist) {
  gulp.src(src)
    .pipe(postcss())
    .pipe(gulpif(process.env.NODE_ENV === 'production', minifycss()))
    .pipe(gulp.dest(dist));
}

// 压缩 .html 文件
function buildHTML(src, dist) {
  gulp.src(src)
    .pipe(gulpif(process.env.NODE_ENV === 'production', htmlmin({
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值
      removeEmptyAttributes: true,//删除所有空格作属性值
      removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS
    })))
    .pipe(gulp.dest(dist));
}

// 拷贝
function copyfile(src, dist) {
  gulp.src(src)
    .pipe(gulp.dest(dist));
}

function delfile(file) {
  var distFile = getDistFile(file);
  if (fs.lstatSync(distFile).isDirectory()) {
    del(distFile);
  } else {
    distFile && fs.existsSync(distFile) && fs.unlink(distFile);
  }
}

function getDistDir(file) {
  return path.dirname(file).replace('src', 'dist');
}

function getDistFile(file) {
  return './dist/' + path.relative('./src', file);
}

// 初始化拷贝静态资源
gulp.task('static', () => {
  copyfile(source.static.src, source.static.dist);
});

// JS vendor
gulp.task('vendor', () => {
  return gulp.src(require('./vendor.config.json'))
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('./dist/lib/js/'));
});

// JS source
gulp.task('scripts', () => {
  buildJS(source.scripts.src, source.scripts.dist);
});

// CSS source
gulp.task('styles', () => {
  buildCSS(source.styles.src, source.styles.dist);
});

// HTML source
gulp.task('htmls', () => {
  buildHTML(source.htmls.src, source.htmls.dist);
});

// 拷贝 assets 资源目录
gulp.task('assets', () => {
  copyfile(source.assets.src, source.assets.dist);
});

// watch
gulp.task('watch', () => {
  // JS source
  watch(source.scripts.src)
		.on('add', function(file) {
      buildJS(file, getDistDir(file));
    })
		.on('change', function(file) {
      buildJS(file, getDistDir(file));
    })
		.on('unlink', function(file) {
			delfile(file);
		});
  
  // CSS source
  watch(source.styles.src)
		.on('add', function(file) {
      buildCSS(file, getDistDir(file));
    })
		.on('change', function(file) {
      buildCSS(file, getDistDir(file));
    })
		.on('unlink', function(file) {
		  delfile(file);
		});

  // HTML source
  watch(source.htmls.src)
		.on('add', function(file) {
      buildHTML(file, getDistDir(file));
    })
		.on('change', function(file) {
      buildHTML(file, getDistDir(file));
    })
		.on('unlink', function(file) {
			delfile(file);
		});
});

gulp.task('init', gulpsync.sync([
  'vendor',
  'static'
]));

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

gulp.task('default', gulpsync.sync([
  'scripts',
  'styles',
  'htmls',
  'assets',
  'watch'
]));

gulp.task('build', gulpsync.sync([
  'init',
  'default'
]));