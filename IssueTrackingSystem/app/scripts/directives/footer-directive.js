'use strict';
angular
    .module('IssueTracker')
    .directive('footer', function(){
            return {
                restrict: 'AE',
                templateUrl: 'app/views/partials/footer-partial.html',
                replace: true
            }
        }
    );
