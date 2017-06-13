/* global process */

// Used for parallel testing with SauceLabs + Mocha + Selenium front end testing
let os = require('os');
let path = require('path');

module.exports = function (grunt) {
    // configure tasks
    grunt.initConfig({
        mocha_parallel: {
            options: {
                args: function(suiteName) {
                    // Remove this when completed
                    console.log('suiteName: ' + suiteName);
                    return [];
                },
                env: function(suiteName) {
                    // Remove this when completed
                    console.log('suiteName: ' + suiteName);
                    process.env.BROWSER = grunt.option('browser');
                    process.env.VERSION = grunt.option('version');
                    process.env.PLATFORM = grunt.option('platform');
                    return process.env;
                },
                report: function(suite, code, stdout, stderr) {
                    // Remove this when completed
                    console.log('suite: ' + suite);
                    console.log('code: ' + code);
                    if (stdout.length) {
                        process.stdout.write(stdout);
                    }
                    if (stderr.length) {
                        process.stderr.write(stderr);
                    }
                },
                done: function(success, results) {
                    // Remove this when completed
                    console.log('success: ' + success);
                    console.log('results: ' + results);
                },
                mocha: path.join('node_modules', '.bin', 'mocha') + (/win32/.test(os.platform()) ? '.cmd' : ''),
                //mocha: path.join('node_modules', '.bin', '_mocha') + (" \"client/test/new_selenium/\""),
                //this is the default concurrency, change as needed.
                concurrency: os.cpus().length * 1.5
            }
        },

        parallel: {
            assets: {
                options: {
                    grunt: true
                },
                tasks: ['run_windows10_edge', 'run_Windows7_ie_10',
                    'run_XP_firefox_37', 'run_Windows8_chrome_40',
                    'run_OSX10.10_safari_8']
            }
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-mocha-parallel');
    grunt.loadNpmTasks('grunt-parallel');

    grunt.registerTask('Windows10_edge', function(n) {
        // Remove this when completed
        console.log(n);
        grunt.option('browser', 'MicrosoftEdge');
        grunt.option('version', '14.14393');
        grunt.option('platform', "Windows 10");
    });

    grunt.registerTask('Windows7_ie_10', function(n) {
        // Remove this when completed
        console.log(n);
        grunt.option('browser', 'internet explorer');
        grunt.option('version', '10');
        grunt.option('platform', "Windows 7");
    });

    grunt.registerTask('XP_firefox_37', function(n) {
        // Remove this when completed
        console.log(n);
        grunt.option('browser', 'firefox');
        grunt.option('version', 37);
        grunt.option('platform', "XP");
    });

    grunt.registerTask('Windows8_chrome_40', function(n) {
        // Remove this when completed
        console.log(n);
        grunt.option('browser', 'chrome');
        grunt.option('version', 40);
        grunt.option('platform', "Windows 8");
    });

    grunt.registerTask('OSX10.10_safari_8', function(n) {
        // Remove this when completed
        console.log(n);
        grunt.option('browser', 'safari');
        grunt.option('version', 8);
        grunt.option('platform', "OS X 10.10");
    });

    // register tasks
    grunt.registerTask('default', ['parallel']);

    grunt.registerTask('run_windows10_edge', ['Windows10_edge', 'mocha_parallel']);
    grunt.registerTask('run_Windows7_ie_10', ['Windows7_ie_10', 'mocha_parallel']);
    grunt.registerTask('run_XP_firefox_37', ['XP_firefox_37', 'mocha_parallel']);
    grunt.registerTask('run_Windows8_chrome_40', ['Windows8_chrome_40', 'mocha_parallel']);
    grunt.registerTask('run_OSX10.10_safari_8', ['OSX10.10_safari_8', 'mocha_parallel']);
};