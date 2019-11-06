const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const named = require('vinyl-named');

const bundleTask = (done) => {

    gulp.src('./src/js/*.js')
        .pipe(named())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist/js/'));
    // Finally, we alert gulp that we are done running our functionality
    // by calling the done callback function.
    done();
};


// Here we are defining a task that will run ESLint on our server code.
const lintTask = (done) => {
  // We start by grabbing all the .js files in our server folder.
  gulp.src(['./server/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
  
  done();
};


module.exports.build = gulp.parallel(bundleTask, lintTask);


// We can also use our above tasks in a watch script. Just like our previous
// watch scripts, a "watch" will watch a file and do something if it changes.
// Because gulp can start up threads, we can have multiple watches running at
// the same time from the same commandline window.
const watch = () => {
  
  // We also want it to watch our client side javascript, and if there are any
  // changes, we want it to run the jsTask from above.
  gulp.watch('./src/', bundleTask);
  
  nodemon({
    script: './server/app.js',
    ignore: ['src/', 'node_modules/'],
    ext: 'js html css'
  });
};


// We then export the watch function so that gulp can use it from the command line.
// Take a look at the watch script in package.json to see how that works.
module.exports.watch = watch;