module.exports = grunt => {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            client: {
                options: {
                    transform: [['babelify', {presets: ['es2015', 'react']}]]
                },
                src: 'src/app/Client.jsx',
                dest: 'public/js/client-bundle.js'
            }
        },
        watch: {
            files: 'src/**',
            tasks: ['default']
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
    grunt.registerTask('default', ['browserify', 'uglify', 'watch']);
    grunt.registerTask('debug', ['browserify', 'watch']);
};