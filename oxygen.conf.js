var Utility = require('./utility');
var util = new Utility();
module.exports = {

    // ============
    // Suites
    // ============
    //
    // For example, here we have two suites defined, with first suite having two cases
    // and second suite having only a single case.
    //
    suites: [
        {
            name: 'Widgets', // suite name
            cases: [ // cases inside this suite
                // {
                //     name : 'Traffic Conversion Ration',
                //     path: './widgets/traffic_conversion_ratio.js'
                // },
                {
                    name : 'Store Ranking',
                    path: './widgets/store_ranking.js'
                },
                // {
                //     name: 'Visitors',
                //     path: './widgets/visitors.js'
                // }
            ]
        },
        // {
        //     name : 'LHS menu',
        //     cases : [
        //         {
        //             path : './src/navigation/LHS_menu.js'
        //         }
        //     ]
        // },
        // {
        //     name: 'Benchmarking',
        //     cases: [{
        //         name : 'Benchmarking',
        //         path: './src/benchmarking/benchmarking'
        //     }]
        // }
    ],

    // ============
    // Capabilities
    // ============
    //
    // If "concurrency" value is greater than 1, 
    // tests with different capabilities will be executed in parallel.
    //
    concurrency: 1,
    capabilities: [{
            browserName: 'chrome', // execute on Chrome
        },
        // {
        //     browserName: 'ie',    // execute on internet explorer
        // },
        // {
        //     browserName: 'firefox',   // execute on Firefox
        // }
    ],

    // ============
    // Parameters
    // ============
    //
    parameters: {
        // file: './mall_airport.csv',
        // mode: 'seq', // can be 'random' or 'all' as well

        // file: './src/navigation/lhs_data.csv',
        // mode: 'seq',

        file: './src/benchmarking/NMM_benchmarking.csv',
        mode: 'seq',
        // file : './src/benchmarking/NMM_benchmarking_widgets_to_compare.csv',
        // mode: 'seq',
    },

    // ============
    // Iterations
    // ============
    //
    // Tests will run only once if iterations number is not explicitly specified.
    //
    iterations: 1,

    // ============
    // Selenium & Appium server URLs
    // ============
    //
    // If not specified, the default URLs will be used
    //
    seleniumUrl: 'http://localhost:4444/wd/hub',
    appiumUrl: 'http://localhost:4723/wd/hub',

    // ============
    // Services
    // ============
    //
    // List services you want to enable during the test execution.
    // Available services: selenium-standalone | devtools
    // selenium-standalone needs to be installed with `npm i @wdio/selenium-standalone-service` first. 
    //
    services: ['selenium-standalone', 'devtools'],

    // ============
    // Modules
    // ============
    // List modules you want to enable during the test execution.
    // Loading unnecessary modules might slow down your test execution, 
    // so only load modules that are used in the test.
    // See here https://docs.oxygenhq.org for a list of available modules.
    //
    // modules: ['web'],
    modules: ['web', 'log', 'assert', 'pdf', 'http', 'email'],

    // ============
    // Framework
    // ============
    // Define a testing framework for this project. 
    // Available frameworks: oxygen | cucumber
    //
    framework: 'oxygen',

    // ============
    // Reporting
    // ============
    // Define test reporter format and corresponding options. 
    // Multiple reporter formats can be specified.
    // Available reporters: json | html | junit | excel | pdf | xml
    //
    reporting: {
        reporters: ['html'],
    },

    // ==========
    // Applitools
    // ==========
    // Define your Applitools service API key.
    // This is only for when using the `eyes` module.
    //
    // applitoolsOpts: {
    //     key: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    // },

    // ==========
    // Hooks
    // ==========
    // Oxygen provides several hooks that can be used to interfere with the test
    // execution process. 
    //
    hooks: {
        //
        // Hook that gets executed before the test starts.
        // At this point, Oxygen has been already initialized, so you
        // can access Oxygen functionality via relevant modules. 
        //
        beforeTest: function (runId, options, caps) {
            util.clear_dir();
        },
        beforeSuite: function (runId, suiteDef) {},
        beforeCase: function (runId, caseDef) {
            log.info('Hey there! Case is about to start.');
        },
        afterCase: function (runId, caseResult, error) {
            web.dispose()
        },
        afterSuite: function (runId, suiteResult, error) {},
        afterTest: function (runId, testResult, error) {
            setTimeout(()=>{
                util.move_reports();
            }, 5000)
        }
    }
};