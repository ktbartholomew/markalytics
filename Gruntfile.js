module.exports = function (grunt) {
    grunt.initConfig({
        umd: {
            all: {
                options: {
                    src: 'src/markalytics.js',
                    dest: 'dist/markalytics.js',
                    amdModuleId: 'markalytics',
                    objectToExport: 'markalytics'
                }
            }
        },
        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['umd:all']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-umd');
};
