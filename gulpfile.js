// Import task modules and setting up variables.
var gulp = require('gulp'),
    hb = require('gulp-hb'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    bless = require('gulp-bless'),
    babel = require('gulp-babel'),
    map = require('map-stream'),
    handlebars = require('gulp-handlebars');
    wrap = require('gulp-wrap');
    declare = require('gulp-declare');
    access = require('gulp-accessibility'),
    // Set base directories
    bases = {
        src: 'src/',
        dist: 'dist/'
    },
    // Set paths
    paths = {
        libs: {
            worldjs: [ 
                'src/nexaworld/js/libs/jquery.min.js',
                'src/nexaworld/js/libs/popper.min.js',
                'src/nexaworld/js/libs/jquery.validate.js',
                'src/nexaworld/js/libs/jquery-ui.js',
                'src/nexaworld/js/libs/select2.js',
                'src/nexaworld/js/libs/bootstrap.min.js',
                'src/nexaworld/js/libs/bootstrap-select.min.js',
                'src/nexaworld/js/libs/jquery.fancybox.js',
                'src/nexaworld/js/libs/jquery.fancybox-buttons.js',
                'src/nexaworld/js/libs/owl.carousel.min.js',
                'src/nexaworld/js/libs/jquery.mCustomScrollbar.concat.min.js',
                'src/nexaworld/js/libs/slick-slide.js',
                'src/nexaworld/js/libs/jquery.counterup.min.js',
                'src/nexaworld/js/libs/waypoints.min.js'
            ],
            js: [
                'src/assets/js/libs/jquery.min.js',
                'src/assets/js/libs/popper.min.js',
                'src/assets/js/libs/jquery.validate.js',
                'src/assets/js/libs/jquery-ui.js',
                'src/assets/js/libs/select2.js',
                'src/assets/js/libs/bootstrap.min.js',
                'src/assets/js/libs/bootstrap-select.min.js',
                'src/assets/js/libs/jquery.fancybox.js',
                'src/assets/js/libs/jquery.fancybox-buttons.js',
                'src/assets/js/libs/owl.carousel.min.js',
                'src/assets/js/libs/jquery.mCustomScrollbar.concat.min.js',
                'src/assets/js/libs/jquery.bxslider.min.js',
                'src/assets/js/libs/jquery.threesixty.js',
                'src/assets/js/libs/ion.rangeSlider.js',
            ]
        },
        dist: {
            css: bases.dist + 'assets/css',
            js: bases.dist + 'assets/js',
            nexaworldjs: bases.dist + 'assets/js',
            nexaworldjslibs: bases.dist + 'assets/js/libs',
            jslibs: bases.dist + 'assets/js/libs',
            html: bases.dist + '/*.html',
            imgs: bases.dist + 'assets/images',
            fonts: bases.dist + 'assets/fonts',
            distPhp: bases.dist + 'assets/php'
        },
        src: {
            json: bases.src + 'asstes/js/data/**/*.{js,json}',
            sass: bases.src + 'assets/**/**/*.scss',
            js: bases.src + 'assets/js/**/*.js',
            worldjs: bases.src + 'nexaworld/js/**/*.js',
            mainStyle: bases.src + 'assets/sass/style.scss',
            nexaworldStyle: bases.src + 'assets/sass/nexaworld.scss',
            hbs: bases.src + '**/*.hbs',
            partialsHBS: bases.src + 'templates/partials/**/*.hbs',
            pagesHBS: bases.src + 'templates/pages/**/*.hbs',
            partialsHtml: bases.src + 'voicetotext/**/**.*',
            partialsEE: bases.src + 'ee/**/**.*'
        },
        modules: ['src/assets/js/config.js',
            'src/assets/js/utils/*.js',
            'src/assets/js/component/*.js'
        ],
        worldmodule: ['src/nexaworld/js/config.js','src/nexaworld/js/utils/*.js','src/nexaworld/js/component/*.js'],
        imgs: ['src/assets/images/**/**.*', 'src/assets/images/**.*'],
        fonts: ['src/assets/fonts/**/**.*', 'src/assets/fonts/**.*'],
        accessibilityReports: 'reports/txt',
    };

//***************** BUILD TASKS*********************
gulp.task('templates', function() {
    gulp.src(paths.src.partialsHBS)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'genric.templates',
            noRedeclare: true, // Avoid duplicate declarations 
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist/assets/js/'));
});

// CSS tasks
gulp.task('css', function() {
    return gulp.src(paths.src.mainStyle)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(sourcemaps.write())
        /* Note:- If IE9 supported then use bless for the splitting of large CSS files */
        //.pipe(bless())
        .pipe(gulp.dest(paths.dist.css))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.css));
});

// CSS tasks
gulp.task('nexaworldcss', function() {
    return gulp.src(paths.src.nexaworldStyle)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(sourcemaps.write())
        /* Note:- If IE9 supported then use bless for the splitting of large CSS files */
        //.pipe(bless())
        .pipe(gulp.dest(paths.dist.css))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.css));
});

//JS Tasks
gulp.task('nexaworldjs', function() {
    gulp.src(paths.libs.worldjs)
        .pipe(concat('nexaworldlibs.js'))
        .pipe(gulp.dest(paths.dist.jslibs))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.jslibs));

    gulp.src(paths.worldmodule)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))

    /* Use below command to fail the build if errors occur in js files. */
    //.pipe(jshint.reporter('fail'))  

    .pipe(concat('nexaworldmain.js'))
        .pipe(gulp.dest(paths.dist.js))

    /* if developer is writing code in ES6 then use babel. need and TESTTTTT*/
    //.pipe(babel())

    .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.js));
});


//JS Tasks
gulp.task('js', function() {
    gulp.src(paths.libs.js)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(paths.dist.jslibs))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.jslibs));

    gulp.src(paths.modules)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))

    /* Use below command to fail the build if errors occur in js files. */
    //.pipe(jshint.reporter('fail'))  

    .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.dist.js))

    /* if developer is writing code in ES6 then use babel. need and TESTTTTT*/
    //.pipe(babel())

    .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('accessibility', function() {
    return gulp.src(paths.dist.html)
        .pipe(access({
            force: true,
            accessibilityLevel: 'WCAG2A',
            ignore: [
                'WCAG2A.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl',
                'WCAG2A.Principle3.Guideline3_1.3_1_1.H57.2'
            ]
        }))
        .on('error', console.log)
        .pipe(access.report({
            reportType: 'txt'
        }))
        .pipe(rename({
            extname: '.txt'
        }))
        .pipe(gulp.dest(paths.accessibilityReports));
});

// Accessibility Tasks
gulp.task('markup', function() {
    return gulp.src([paths.src.pagesHBS], {})
        .pipe(hb({
            partials: paths.src.partialsHBS,
            data: paths.json
        }))
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(gulp.dest(bases.dist));
});

// clean up
gulp.task('clean', function() {
    gulp.src(bases.dist, {
            read: false
        })
        .pipe(clean({
            force: true
        }));
});

// Copy images
gulp.task('copy:imgs', function() {

    // images
    gulp.src(paths.imgs)
        .pipe(gulp.dest(paths.dist.imgs));

});

// Copy fonts
gulp.task('copy:fonts', function() {

    // fonts
    gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.dist.fonts));

});
//Copy voice to search files
gulp.task('copy:html', function() {

    // html
    gulp.src(paths.src.partialsHtml)
        .pipe(gulp.dest(bases.dist + '/assets/vtt'));

});
//Copy EE files

gulp.task('copy:eeCanvas', function() {

    // html
    gulp.src(paths.src.partialsEE)
        .pipe(gulp.dest(bases.dist));

});
// Copy all
gulp.task('copy:all', ['copy:imgs', 'copy:fonts', 'copy:html', 'copy:eeCanvas']);

gulp.task('js-watch', ['js', 'nexaworldjs'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('css-watch', ['css', 'nexaworldcss'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('json-watch', ['json'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('markup-watch', ['markup'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('default', ['copy:all', 'css', 'nexaworldcss', 'js', 'nexaworldjs', 'markup', 'accessibility'], function() {

    browserSync.init(null, {
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch(paths.src.sass, ['css-watch']);
    gulp.watch(paths.src.js, ['js-watch']);
    gulp.watch(paths.src.worldjs, ['js-watch']);
    gulp.watch(paths.src.json, ['json-watch']);
    gulp.watch(paths.src.hbs, ['markup-watch']);
});

gulp.task('build:prod', ['copy:all', 'css', 'nexaworldcss', 'js', 'nexaworldjs']);
gulp.task('build:dev', ['default']);