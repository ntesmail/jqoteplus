/*
 * jqoteplus-build
 * https://github.com/ntesmail/jqoteplus-build
 *
 * Copyright (c) 2014 ntesmail
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>',
            ],
            options: {
                jshintrc: '.jshintrc',
            }
        },

        concat: {
            browser: {
                src: ['src/brsintro.js', 'src/jqoteplus-light.js', 'src/brsoutro.js'],
                dest: 'dist/jqoteplus-browser.js'
            },

            rmd: {
                src: ['src/intro.js', 'src/jqoteplus-light.js', 'src/outro.js'],
                dest: 'dist/jqoteplus-rmd.js'
            },
            node: {
                src: ['src/nodeintro.js', 'src/jqoteplus-light.js', 'src/nodeoutro.js'],
                dest: 'dist/jqoteplus-node.js'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['dist'],
        },

        // jqoteplus_build: {
        //     build: {
        //         src: ['test/jqote/**/*.ftl'],
        //         options: {
        //             exclude: ['read/print'],
        //             // root: '',
        //             deployPath: 'test/build/',
        //             deployName: 'template.js'
        //         }
        //     }
        // },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },

    });

    // Actually load this plugin's task(s).
    // grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    // grunt.registerTask('test', ['clean', 'jqoteplus_build', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['concat']);

};