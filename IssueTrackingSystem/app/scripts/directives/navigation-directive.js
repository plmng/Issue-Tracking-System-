'use strict';
angular
    .module('IssueTracker')
    .directive('navigation', function(){
            return {
                restrict: 'AE',
                templateUrl: 'app/views/partials/navigation.html',
                replace: true
            }
        }
    );

