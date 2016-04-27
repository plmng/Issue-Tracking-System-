'use strict';
angular
    .module('IssueTracker')
    .directive('authenticationForms', function(){
            return {
                restrict: 'AE',
                templateUrl: 'app/views/partials/authenticationForms.html',
                replace: true
            }
        }
    );