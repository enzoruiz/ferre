const gulp = require('gulp')
const sass = require('gulp-sass');
const rename = require('gulp-rename')

gulp.task('styles', function (){
    console.log('Running Styles Tasks')
    gulp
        .src('index.scss')
        .pipe(sass())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('public'))
})

gulp.task('assets', function (){
    console.log('Running Assets Tasks')
    gulp
        .src('assets/*')
        .pipe(gulp.dest('public'))
})

var watcherStyles = gulp.watch('index.scss', ['styles', ])
watcherStyles.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
})

var watcherAssets = gulp.watch('assets/*', ['assets', ])
watcherAssets.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
})

gulp.task('default', [])
