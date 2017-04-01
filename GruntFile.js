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
                src: 'src/app/Client.jsx',
                dest: 'public/js/client-bundle.js'
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
                    'public/js/client-bundle.js': ['public/js/client-bundle.js']
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