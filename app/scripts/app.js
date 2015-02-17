'use strict';

// Initialize Angular Application
var myApp = angular

    // Create module and load dependencies
    .module('a11yTicketApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'firebase'
    ])

    // URL to connect to Firebase backend
    .value('fbURL', 'https://yourFireBaseDB.firebaseio.com/')

    // Configure routing for application pages
    .config(function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                title: 'Accessibility Ticket Tracker'
            })
            .when('/edit/:id', {
                templateUrl: 'views/edit.html',
                controller: 'EditCtrl',
                title: 'Edit Ticket'
            })
            .when('/create', {
                templateUrl: 'views/create.html',
                controller: 'CreateCtrl',
                title: 'Create a ticket'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                title: 'About Simply Accessible'
            })
            .otherwise({
                redirectTo: '/main'
            });
    })


    // Provide custom page titles on route change
    // Set focus on view update
    .run(['$location', '$rootScope', function($location, $rootScope) {

        // Create some global variables to share data between controllers
        // Not best practice but will do for this quick app
        $rootScope.lastTicketID = "";
        $rootScope.lastForm = "";
        $rootScope.search = "";


        var history; // stores uri of last page viewed - Used to track if we should set focus to main H1
        var currentURL; // store uri of current page viewed - Used to track if we should set focus to main H1

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

            // Test for current route
            if(current.$$route) {
                // set page title to current route record
                currentURL = current.$$route.originalPath;
                $rootScope.title = current.$$route.title;
            }

            // If we are not on the main ticket list clear latest ticket id
            if(currentURL != "/main"){
                $rootScope.lastTicketID = "";
            }

            // When navigating between pages track the last page we were on
            // to know if we should be setting focus on the h1 on view update
            if(previous) {
                if(previous.$$route){
                    history = previous.$$route.originalPath;
                }
            }

        });

        $rootScope.$on('$viewContentLoaded', function () {

            // Once the template loads set focus to the H1 to manage focus
            // if there is no history do not adjust focus this is the first page the user is seeing
            if(history) {
                // Default - set page focus to H1
                $('h1').attr("tabIndex", -1).focus();

                // when we cancel on the create form
                if ($rootScope.lastForm == "create" && currentURL == "/main"){
                    $('#add-new-ticket').attr("tabIndex", 0).focus();
                    $rootScope.lastForm = "";
                }
            }

            // If there is a flash message set focus to it - trumps all focus
            if($rootScope.flashMsg != ""){
                $('div#flash-message a').attr("tabIndex", 0).focus();
            }

        });
    }]
);