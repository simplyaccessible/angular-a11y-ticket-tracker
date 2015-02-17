'use strict';

// Create controllers for application
angular.module('a11yTicketApp')

    // Provides a confirmation message on click events (Delete Records)
    .directive('ngConfirmClick',[
        function(){
            return {
                priority: -1,
                restrict: 'A',
                link: function(scope, element, attrs){
                    element.bind('click', function(e){
                        var message = attrs.ngConfirmClick;
                        if(message && !confirm(message)){
                            e.stopImmediatePropagation();
                            e.preventDefault();
                        }
                    });
                }
            }
        }
    ])


    // Sets focus to the last edit button clicked if the users hits cancel in the edit form
    // $timeout used because we need to wait until the ticket list has rendered
    .directive('setLastTicketIdFocus', function($timeout, $rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true && $rootScope.lastTicketID != "") {
                    $timeout(function () {
                        if($rootScope.flashMsg == "" && $rootScope.lastForm == "edit"){
                            // First need to check if the edit button we clicked on still exists.
                            // In 2-way binding someone could delete record before you come back to main screen.
                            // By default focus will be set to H1
                            if($("#" + $rootScope.lastTicketID + " .edit-btn").length){
                                // Set focus to edit button of record we are editing.
                                $("#" + $rootScope.lastTicketID + " .edit-btn").focus();
                            }
                            $rootScope.lastTicketID = "";
                            $rootScope.lastForm = "";
                        }
                    });
                }
            }
        }
    });
