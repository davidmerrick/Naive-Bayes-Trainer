module.exports = grunt => {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            client: {
                options: {
                    transform: [['babelify', {
                        presets: ['es2015', 'react'],
                        plugins: ['transform-decorators-legacy', 'transform-object-rest-spread']
                    }]]
                },
                src: 'src/app/Root.jsx',
                dest: 'public/js/bundle.js'
            }
        },
        watch: {
            default: {
                files: 'src/**',
                tasks: ['default']
            },
            debug: {
                files: 'src/**',
                tasks: ['debug']
            }
        },
        uglify: {
            client: {
                files: {
                    'public/js/bundle.js': ['public/js/bundle.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('default', ['browserify', 'uglify', 'watch:default']);
    grunt.registerTask('debug', ['browserify', 'watch:debug']);
};