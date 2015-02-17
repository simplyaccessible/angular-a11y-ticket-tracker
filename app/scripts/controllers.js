'use strict';

// Create controllers for application
angular.module('a11yTicketApp')


    // =================================
    // Navigation Controller
    // =================================

    .controller('HeaderController', function ($scope, $location) {
        // Checks the links to see if the supplied path matches the
        // current path and returns true or false
        // This is used to show class on true through ng-class
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    })



    // =================================
    // Main View Controller
    // =================================

    .controller('MainCtrl', function ($scope, $rootScope, Tickets, Flash, $timeout) {
        $scope.flash = Flash;
        $scope.tickets = Tickets;
        $scope.search = $rootScope.search;


        // track toggle state of record details - sets scope index to current index
        // uses ng-class to display table row indexes
        $scope.toggleTicketDetails = function (e, index) {
            if ($scope.index == index) {
                delete $scope.index;
            } else {
                $scope.index = index;
            }
            e.preventDefault();

            // Add delay to allow time for element to render then set focus to header
            $timeout(function() {
                $('#ticket-'+ index + " h2").first().attr("tabIndex",-1).focus()
            }, 0);
        };

        // Delete record from database
        $scope.remove = function (id) {
            Flash.setMessage("Record Deleted!");
            Tickets.$remove(id);
        };

        // Watch when search field is updated and update global search variable
        $scope.$watch("search", function(newValue, oldValue) {
            $rootScope.search = $scope.search;
        });

    })




    // =================================
    // Edit Ticket View Controller
    // =================================

    .controller('EditCtrl', function ($scope, $rootScope ,$location, $routeParams, $firebase, fbURL, WcagscService, SeverityLevelService, Flash) {
        // Create new connection to firebase and pass id of record
        var ticketURL = new Firebase(fbURL + $routeParams.id);
        // Retrieve current record as object
        var ticketsObject = $firebase(ticketURL).$asObject();
        // Add record to scope
        $scope.tickets = ticketsObject;

        // track record id so that we can set focus back to edit button if user hits cancel
        $rootScope.lastTicketID = $scope.tickets.$id;

        // Once the firebase record has loaded Update page title to include summary title
        ticketsObject.$loaded().then(function(object) {
            $rootScope.title = $rootScope.title + " - " + object.summary;
            $rootScope.lastTicketID = object.$id;
        });

        //Load success criterion into template to use in select menus
        $scope.wcagSCList = WcagscService.wcagSCList;
        $scope.severityList = SeverityLevelService.severityList;

        // Clear any flash variables we have stored
        Flash.setMessage("");

        // Handle form submits (with errors)
        $scope.edit = function (inValid) { // invalid is passed from angulars form processing
            if (inValid) {
                // if there are errors
                // Set focus to the form level error warning
                $('#error-bucket').show().attr("tabIndex", -1).focus();
                // track that the form was submitted and that field level errors can now be shown
                $scope.submitted = true;
            } else {
                // If form has no errors - save results to database
                var edit = $scope.tickets.$save();

                // check that submit was successful
                if (edit) {
                    // if submit was successful
                    // set flash message to be displayed
                    Flash.setMessage("Record saved!");
                    // send user to main screen
                    $location.path("main");
                } else {
                    // if not successful warn user
                    alert('something went wrong');
                }
            }
        };

        // Cancel button function
        $scope.go = function (path) {
            // indicate last form viewed
            $rootScope.lastForm = "edit";
            // send user to path provided in ng-click
            $location.path(path);
        };
    })




    // =================================
    // Create A Ticket View Controller
    // =================================

    .controller('CreateCtrl', function ($scope, $rootScope, Tickets, $location, $routeParams, $firebase, fbURL, WcagscService, SeverityLevelService, Flash) {

        //Load success criterion into template to use in select menus
        $scope.wcagSCList = WcagscService.wcagSCList;
        $scope.severityList = SeverityLevelService.severityList;

        // Clear any flash variables we have stored
        Flash.setMessage("");

        // Handle form submits (with errors)
        $scope.add = function (inValid) {

            // Need to check if a check box has a value if not assign
            // it a value of false or will not get submitted
            if(!$scope.resolved){
                $scope.resolved = false;
            }

            // Check if angular error check marked for as invalid
            if (inValid) {
                // if there are errors
                // Set focus to the form level error warning
                $('#error-bucket').show().attr("tabIndex", -1).focus();
                // track that the form was submitted and that field level errors can now be shown
                $scope.submitted = true;

            } else {
                // If form has no errors - save results to database;
                var save = Tickets.$add({
                    summary: $scope.summary,
                    description: $scope.description,
                    wcagSC: $scope.wcagSC,
                    severity: $scope.severity,
                    fix: $scope.fix,
                    resolved: $scope.resolved
                });

                if (save) {
                    // if save into database was successful
                    // Clear any search the user had so they can see the new record
                    $rootScope.search = "";
                    // set flash message to be displayed
                    Flash.setMessage("Ticket Created!");
                    // send user to main screen
                    $location.path("main");
                } else {
                    // if not successful warn user
                    alert('something went wrong');
                }
            }
        };


        // Cancel button function
        $scope.go = function (path) {
            // indicate last form viewed
            $rootScope.lastForm = "create";
            // send user to path provided in ng-click
            $location.path(path);
        };

    })




    // =================================
    // About View Controller
    // =================================

    .controller('AboutCtrl', function ($scope, $rootScope) {
        // clear the search field
        $rootScope.search = "";
        // simple HTML view
    });