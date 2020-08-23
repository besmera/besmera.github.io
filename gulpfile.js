var
// node
path = require('path'),


// gulp plugins
gulp = require('gulp'),
gutil = require('gulp-util'),
spawn = require('gulp-spawn-shim'),
rename = require('gulp-rename'),
watch = require('gulp-watch'),
plumb = require('gulp-plumber'),
ignore = require('gulp-ignore'),
livereload = require('gulp-livereload'),


// config
src_docs = './src/',
dest_docs = './slides/';

// listen to live-reload at port 35729
livereload.listen();

gulp.task('default', function() {

    var
    opts = {};
    opts.cmd = 'pandoc';
    opts.args = [];

    // global pandoc opts
    opts.args.push('--toc');
    opts.args.push('--mathjax');
    //opts.args.push('-S');
    opts.args.push('-s');
    opts.args.push('-t');
    opts.args.push('revealjs');
    opts.args.push('--template=' + path.join(__dirname, './assets/revealjs.html'));
    opts.args.push('-V');
    opts.args.push('theme=sky');
    opts.args.push('-V');
    opts.args.push('highlight-theme=zenburn');
    opts.args.push('-V');
    opts.args.push('revealjs-url=../../reveal.js');
    opts.args.push('--no-highlight'); //For pandoc highlights not reveal
    opts.args.push('--toc-depth=1');

    var magic = function(file, opts, cb) {

        var
        // meta stuff
        _from = path.join(__dirname, src_docs),
        _to = path.join(__dirname, dest_docs),
        new_file_path_dir = path.dirname(file.path.replace(_from, _to)),

        // assets
        jquery = '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',

        // mathjax = path.join(__dirname, './html/assets/mathjax-MathJax-727332c/MathJax.js'),
        mathjax = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
        mathjax_lazy = path.join(__dirname, './html/assets/mathjax-lazyload.min.js'),
        css = path.join(__dirname, './assets/custom.css');

        // mark assets relative to 'this' file
        var relpath = function(asset) {
            return path.relative(new_file_path_dir, asset);
        };

        // add css
        opts.args.push('-c');
        opts.args.push(relpath(css));

        // custom template vars
        opts.args.push('--variable=jquery-src:' + relpath(jquery));
        opts.args.push('--variable=mathjax-src:' + relpath(mathjax));
        opts.args.push('--variable=mathjax-lazy-src:' + relpath(mathjax_lazy));

        return cb(file, opts);
    };

    //For image assets, etc...
    watch(path.join(src_docs, '**/!(*.md)'))
        .on('error', console.log)
        .pipe(plumb())
        .pipe(ignore({isDirectory:true}))
            .on('data', function(file) {
                file.orig_path = file.path;
            })
	.pipe(gulp.dest(dest_docs))
            .on('data', function(file) {
	//console.log(file);
                if(!file.path)
                    return;
                var
                abs_path_to = path.normalize(__dirname + '/' + file.path),
                to = path.normalize(dest_docs + '/' + path.relative(__dirname + '/' 			+ src_docs, abs_path_to)),
                from = path.relative(__dirname, file.orig_path);

                gutil.log("Deployed asset '" + from + "' to '" + to + "'");

            })
        .pipe(livereload());


    watch(path.join(src_docs, '**/*.md'))
        .on('error', console.log)
        .pipe(plumb())
        .pipe(ignore({isDirectory:true}))
            .on('data', function(file) {
                file.orig_path = file.path;
            })
        .pipe(spawn(opts, magic))
            .on('failure', console.log)
            .on('stderr', console.log)
        .pipe(rename({extname: ".html"}))
       .pipe(gulp.dest(dest_docs))
            .on('data', function(file) {

                if(!file.path)
                    return;
                var
                abs_path_to = path.normalize(__dirname + '/' + file.path),
                to = path.normalize(dest_docs + '/' + path.relative(__dirname + '/' + src_docs, abs_path_to)),
                from = path.relative(__dirname, file.orig_path);

                gutil.log("Compiled '" + from + "' to '" + to + "'");

            })
        .pipe(livereload());





});
