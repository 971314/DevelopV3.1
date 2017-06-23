var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-minify-css'),
    sequence = require('gulp-run-sequence'),
    autoprefixer = require('gulp-autoprefixer'),
    //新加模块
    path = require('path'),
    glob = require('glob'),
    del = require('del'), //删除模块
    concat = require('gulp-concat'); //合并模块

// 清空
// {read: false} 防止读取文件内容，使任务更快完成
// {force: true}
gulp.task('clean', function(){
    return gulp.src('dist/css',  {read: false})
    .pipe(clean({force: true}));
});



/*
*npm run dev ----运行指定的index.html
*例如 npm run dev --main 运行main模块下面的index.html进行调试
*执行的步骤
*/
//清除static文件夹
gulp.task('clean:static', function (cb) {
  return del([
    'static/*',
    '!static/.gitkeep'
  ], cb);
});

//复制公共图片
gulp.task('copy:devimage', function(){
    return gulp.src('src/assets/images/*.*')
    // .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('static/images'));
});

//复制模块图片
gulp.task('copy:devmoduleImage', function(){
  var commandDirName = getCommand();//要打包的文件目录
  for (var i = 0; i < commandDirName.length; i++) {
    var srcStr = 'src/module/' + commandDirName[i] + '/images/*.*';
    var destStr = 'static/' + commandDirName[i] + '/images';
    gulp.src(srcStr).pipe(gulp.dest(destStr));
  }
  if (commandDirName <= 0) {
    return gulp.src('src/module/*/images/*.*')
  // .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('static'));
  }
  return;
});

//复制配置文件
gulp.task('copy:devconf', function(){
  return gulp.src('src/assets/conf/*.*')
  // .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('static/conf'));
});

//复制百度地图js
gulp.task('copy:devbaidu', function(){
  return gulp.src('js/baidumap.js')
  // .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('static/js'));
});

//公共样式
gulp.task('commonCss:dev', function(){
    return gulp.src(['src/assets/scss/themes/_default.scss','src/assets/scss/vendors/index.scss'])
    .pipe(concat('oneForAll.scss'))
    .pipe(sass())
    .pipe(rename('pbApp.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('static/css'));
});

//单独打包模块下的css
gulp.task('modulesCss:devseparate', function(){
    var commandDirName = getCommand();//要打包的文件目录
    return glob.sync('src/assets/scss/modules/*.scss').forEach((itemPath) => {
    var  basename = path.basename(itemPath, path.extname(itemPath));
      if (basename == '_modules') {
          return;
      }
      for (var i = 0; i < commandDirName.length; i++) {
        if (commandDirName[i] == basename) {
          return gulp.src(['src/assets/scss/themes/_default.scss',`src/assets/scss/modules/${basename}.scss`])
                .pipe(concat('oneForAll.scss'))
                .pipe(sass())
                .pipe(rename(`${basename}.css`))
                .pipe(cssmin())
                .pipe(gulp.dest('static/css'));
        }
      }

      if (commandDirName.length < 1) {
        return gulp.src(['src/assets/scss/themes/_default.scss',`src/assets/scss/modules/${basename}.scss`])
                .pipe(concat('oneForAll.scss'))
                .pipe(sass())
                .pipe(rename(`${basename}.css`))
                .pipe(cssmin())
                .pipe(gulp.dest('static/css'));
      }
    });
});













/*
*npm run build      打包所有的模块
*例如npm run build --main 打包main模块下面的样式和js
*执行的步骤
*/

//删除dist下的样式文件
gulp.task('clean:pbAppSkin', function (cb) {
  return del([
    'dist/css/*.css',
    '!dist/css/pbApp.css'
  ], cb);
});

//复制公共图片
gulp.task('copy:image', function(){
    return gulp.src('src/assets/images/*.*')
    // .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('dist/images'));
});

//复制模块下的图片
gulp.task('copy:moduleImage', function(){
  var commandDirName = getCommand();//要打包的文件目录
  for (var i = 0; i < commandDirName.length; i++) {
    var srcStr = 'src/module/' + commandDirName[i] + '/images/*.*';
    var destStr = 'dist/' + commandDirName[i] + '/images';
    gulp.src(srcStr).pipe(gulp.dest(destStr));
  }
  if (commandDirName <= 0) {
    return gulp.src('src/module/*/images/*.*')
  // .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('dist'));
  }
  return;
});

//复制配置文件
gulp.task('copy:conf', function(){
  return gulp.src('src/assets/conf/*.*')
  // .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('dist/conf'));
});

//打包公共的样式
gulp.task('commonCss', function(){
    return gulp.src(['src/assets/scss/themes/_default.scss','src/assets/scss/vendors/index.scss'])
    .pipe(concat('oneForAll.scss'))
    .pipe(sass())
    .pipe(rename('pbApp.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});

//分开打包模块样的样式
gulp.task('modulesCss:separate', function(){
    var commandDirName = getCommand();//要打包的文件目录
    return glob.sync('src/assets/scss/modules/*.scss').forEach((itemPath) => {
    var  basename = path.basename(itemPath, path.extname(itemPath));
      if (basename == '_modules') {
          return;
      }
      for (var i = 0; i < commandDirName.length; i++) {
        if (commandDirName[i] == basename) {
          return gulp.src(['src/assets/scss/themes/_default.scss',`src/assets/scss/modules/${basename}.scss`])
                .pipe(concat('oneForAll.scss'))
                .pipe(sass())
                .pipe(rename(`${basename}.css`))
                .pipe(cssmin())
                .pipe(gulp.dest('dist/css'));
        }
      }

      if (commandDirName.length < 1) {
        return gulp.src(['src/assets/scss/themes/_default.scss',`src/assets/scss/modules/${basename}.scss`])
                .pipe(concat('oneForAll.scss'))
                .pipe(sass())
                .pipe(rename(`${basename}.css`))
                .pipe(cssmin())
                .pipe(gulp.dest('dist/css'));
      }
    });
});










/*
*npm run theme    应用默认的_default主题
*例如 npm run theme --_theme2  应用指定的_theme2主题
*执行的步骤
*/

//公共样式修改主题
gulp.task('commonCss:changetheme', function(){
  var themeStr = '';
    if (getCommand()[0] != undefined && getCommand()[0] != '') {
      themeStr = getCommand()[0];
    }else {
      themeStr = '_default';
    }

    return gulp.src([`src/assets/scss/themes/${themeStr}.scss`,'src/assets/scss/vendors/index.scss'])
    .pipe(concat('oneForAll.scss'))
    .pipe(sass())
    .pipe(rename('pbApp.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});

//模块样式修改主题
gulp.task('modulesCss:changeTheme', function(){
    var themeStr = '';
    if (getCommand()[0] != undefined && getCommand()[0] != '') {
      themeStr = getCommand()[0];
    }else {
      themeStr = '_default';
    }

    glob.sync('src/assets/scss/modules/*.scss').forEach((itemPath) => {
      var basename = path.basename(itemPath, path.extname(itemPath));
      return gulp.src([`src/assets/scss/themes/${themeStr}.scss`,`src/assets/scss/modules/${basename}.scss`])
                .pipe(concat('oneForAll.scss'))
                .pipe(sass())
                .pipe(rename(`${basename}.css`))
                .pipe(cssmin())
                .pipe(gulp.dest('dist/css'));
    });
});












//监听
gulp.task('watch', function(){
    gulp.watch('src/styles/**/*.scss', ['commonCss:dev','modulesCss:devseparate']);
});


//启动产品环境(npm run build)
gulp.task('build', function(cb) {
    sequence(['copy:image','copy:moduleImage','copy:conf'], ['commonCss','modulesCss:separate'], cb);
});

//单独打包样式文件(npm run theme)
gulp.task('theme',['clean'], function(cb) {
    sequence('commonCss:changetheme','modulesCss:changeTheme',cb);
});

//启动开发环境npm run dev
gulp.task('dev',['clean:static'], function(cb) {
    sequence(['copy:devimage','copy:devmoduleImage','copy:devconf','copy:devbaidu'],['commonCss:dev','modulesCss:devseparate'],cb);
});


//获取文件夹名称
function getDirName(entry) {
    var lastString = '';
    var currentString = '';
    var dirEntryName = '';
    var lastIndex = entry.lastIndexOf('/');
        lastString = entry.slice(0,lastIndex);
    var currentIndex = lastString.lastIndexOf('/');
        dirEntryName = lastString.slice(currentIndex+1,lastIndex);
    return dirEntryName;
}

//获取参数信息(npm run build --main --my)获取其中的main ，my目录
function getCommand() {
  var allArr = process.env.npm_config_argv;
      allArr = JSON.parse(allArr);
  var tempArr = [];
  var commandArr = [];
  for (var key in allArr) {
    if (key == 'cooked' || key == 'original') {
      tempArr = allArr[key];
    }
  }

  for (var i = 2; i < tempArr.length; i++) {
    commandArr.push(tempArr[i].replace('--',''));
  }
  return commandArr;
}
