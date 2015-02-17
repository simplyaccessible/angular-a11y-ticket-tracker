'use strict';

// Create controllers for application
angular.module('a11yTicketApp')

    // retrieve tickets from Firebase database
    .factory('Tickets', function (fbURL, $firebase) {
        return $firebase(new Firebase(fbURL)).$asArray();
    })

    // Store and and queue flash messages used on save and create
    .factory("Flash", function($rootScope) {
        var queue = [];
        var currentMessage = "";
        $rootScope.flashMsg = currentMessage;

        $rootScope.$on("$viewContentLoaded", function() {
            currentMessage = queue.shift() || "";
        });

        return {
            setMessage: function(message) {
                queue.push(message);
                $rootScope.flashMsg = message
            },
            getMessage: function() {
                return currentMessage;
            },
            clearMessage: function($event) {
                currentMessage = "";
                $rootScope.flashMsg = "";
                $event.preventDefault();
                $('h1').attr("tabIndex",-1).focus();
            }
        };
    })

    // Values used in forms for severity levels
    .factory('SeverityLevelService', function() {
        return {"severityList": [
            {'value':'Stop'     ,'level':'Stop'},
            {'value':'High'     ,'level':'High'},
            {'value':'Medium'   ,'level':'Medium'},
            {'value':'Low'      ,'level':'Low'}
        ]};
    })

    // Values used in forms for WCAG Success Criteria
    .factory('WcagscService', function() {
        return {"wcagSCList": [
            {'value':'1.1'    , 'criterion':'1.1   Provide text alternatives for any non-text content'},
            {'value':'1.1.1'  , 'criterion':'1.1.1 Non-text Content Level A'},
            {'value':'1.2'    , 'criterion':'1.2   Provide alternatives for time-based media'},
            {'value':'1.2.1'  , 'criterion':'1.2.1 Audio-only and Video-only (Prerecorded) Level A'},
            {'value':'1.2.2'  , 'criterion':'1.2.2 Captions (Prerecorded) Level A'},
            {'value':'1.2.3'  , 'criterion':'1.2.3 Audio Description or Media Alternative (Prerecorded) Level A'},
            {'value':'1.2.4'  , 'criterion':'1.2.4 Captions (Live) Level AA'},
            {'value':'1.2.5'  , 'criterion':'1.2.5 Audio Description (Prerecorded) Level A'},
            {'value':'1.2.6'  , 'criterion':'1.2.6 Sign Language (Prerecorded) Level AAA'},
            {'value':'1.2.7'  , 'criterion':'1.2.7 Extended Audio Description (Prerecorded)  Level AAA'},
            {'value':'1.2.8'  , 'criterion':'1.2.8 Media Alternative (Prerecorded)  Level AAA'},
            {'value':'1.2.9'  , 'criterion':'1.2.9 Audio-only (Live)  Level AAA'},
            {'value':'1.3'    , 'criterion':'1.3   Create content that can be presented in different ways (for example simpler layout) without losing information or structure'},
            {'value':'1.3.1'  , 'criterion':'1.3.1 Info and Relationships  Level A'},
            {'value':'1.3.2'  , 'criterion':'1.3.2 Meaningful Sequence  Level A'},
            {'value':'1.3.3'  , 'criterion':'1.3.3 Sensory Characteristics  Level A'},
            {'value':'1.4'    , 'criterion':'1.4   Make it easier for users to see and hear content including separating foreground from background'},
            {'value':'1.4.1'  , 'criterion':'1.4.1 Use of Color  Level A'},
            {'value':'1.4.2'  , 'criterion':'1.4.2 Audio Control  Level A'},
            {'value':'1.4.3'  , 'criterion':'1.4.3 Contrast (Minimum)  Level AA'},
            {'value':'1.4.4'  , 'criterion':'1.4.4 Resize text  Level AA'},
            {'value':'1.4.5'  , 'criterion':'1.4.5 Images of text  Level AA'},
            {'value':'1.4.6'  , 'criterion':'1.4.6 Contrast (Enhanced)  Level AAA'},
            {'value':'1.4.7'  , 'criterion':'1.4.7 Low or No Background Audio  Level AAA'},
            {'value':'1.4.8'  , 'criterion':'1.4.8 Visual Presentation  Level AAA'},
            {'value':'1.4.9'  , 'criterion':'1.4.9 Images of Text (No Exception)  Level AAA'},
            {'value':'2.1'    , 'criterion':'2.1   Make all functionality available from a keyboard'},
            {'value':'2.1.1'  , 'criterion':'2.1.1 Keyboard  Level A'},
            {'value':'2.1.2'  , 'criterion':'2.1.2 No Keyboard Trap  Level A'},
            {'value':'2.1.3'  , 'criterion':'2.1.3 Keyboard (No Exception)  Level AAA'},
            {'value':'2.2'    , 'criterion':'2.2   Provide users enough time to read and use content'},
            {'value':'2.2.1'  , 'criterion':'2.2.1 Timing Adjustable  Level A'},
            {'value':'2.2.2'  , 'criterion':'2.2.2 Pause, Stop, Hide  Level A'},
            {'value':'2.2.3'  , 'criterion':'2.2.3 No Timing  Level AAA'},
            {'value':'2.2.4'  , 'criterion':'2.2.4 Interruptions  Level AAA'},
            {'value':'2.2.5'  , 'criterion':'2.2.5 Re-authenticating  Level AAA'},
            {'value':'2.3'    , 'criterion':'2.3   Do not design content in a way that is known to cause seizures'},
            {'value':'2.3.1'  , 'criterion':'2.3.1 Three Flashes or Below Threshold (Seizures)  Level A'},
            {'value':'2.3.2'  , 'criterion':'2.3.2 Three Flashes (Seizures)  Level AAA'},
            {'value':'2.4'    , 'criterion':'2.4   Provide ways to help users navigate, find content, and determine where they are'},
            {'value':'2.4.1'  , 'criterion':'2.4.1 Bypass Blocks  Level A'},
            {'value':'2.4.2'  , 'criterion':'2.4.2 Page Titled  Level A'},
            {'value':'2.4.3'  , 'criterion':'2.4.3 Focus Order  Level A'},
            {'value':'2.4.4'  , 'criterion':'2.4.4 Link Purpose (In Context)  Level A'},
            {'value':'2.4.5'  , 'criterion':'2.4.5 Multiple Ways  Level AA'},
            {'value':'2.4.6'  , 'criterion':'2.4.6 Headings or Labels  Level AA'},
            {'value':'2.4.7'  , 'criterion':'2.4.7 Focus Visible  Level AA'},
            {'value':'2.4.8'  , 'criterion':'2.4.8 Location  Level AAA'},
            {'value':'2.4.9'  , 'criterion':'2.4.9 Link Purpose (Link Only) Level AAA'},
            {'value':'2.4.10' , 'criterion':'2.4.10 Section Headings  Level AAA'},
            {'value':'3.1'    , 'criterion':'3.1   Make text content readable and understandable'},
            {'value':'3.1.1'  , 'criterion':'3.1.1 Language of Page  Level A'},
            {'value':'3.1.2'  , 'criterion':'3.1.2 Language of Parts  Level AA'},
            {'value':'3.1.3'  , 'criterion':'3.1.3 Unusual Words  Level AAA'},
            {'value':'3.1.4'  , 'criterion':'3.1.4 Abbreviations  Level AAA'},
            {'value':'3.1.5'  , 'criterion':'3.1.5 Reading Level  Level AAA'},
            {'value':'3.1.6'  , 'criterion':'3.1.6 Pronunciation  Level AAA'},
            {'value':'3.2'    , 'criterion':'3.2   Make Web pages appear and operate in predictable ways'},
            {'value':'3.2.1'  , 'criterion':'3.2.1 On Focus  Level A'},
            {'value':'3.2.2'  , 'criterion':'3.2.2 On Input  Level A'},
            {'value':'3.2.3'  , 'criterion':'3.2.3 Consistent Navigation  Level AA'},
            {'value':'3.2.4'  , 'criterion':'3.2.4 Consistent Identification  Level AA'},
            {'value':'3.2.5'  , 'criterion':'3.2.5 Change on Request  Level AAA'},
            {'value':'3.3'    , 'criterion':'3.3   Help users avoid and correct mistakes'},
            {'value':'3.3.1'  , 'criterion':'3.3.1 Error Identification  Level A'},
            {'value':'3.3.2'  , 'criterion':'3.3.2 Labels or Instructions  Level A'},
            {'value':'3.3.3'  , 'criterion':'3.3.3 Error Suggestion  Level AA'},
            {'value':'3.3.4'  , 'criterion':'3.3.4 Error Prevention (Legal, Financial, Data)  Level AA'},
            {'value':'3.3.5'  , 'criterion':'3.3.5 Help  Level AAA'},
            {'value':'3.3.6'  , 'criterion':'3.3.6 Error Prevention (All)  Level AAA'},
            {'value':'4.1'    , 'criterion':'4.1   Maximize compatibility with current and future user agents, including assistive technologies'},
            {'value':'4.1.1'  , 'criterion':'4.1.1 Parsing  Level A'},
            {'value':'4.1.2'  , 'criterion':'4.1.2 Name, Role, Value  Level A'}
        ]};
    });