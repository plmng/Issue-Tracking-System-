'use strict';
angular
    .module('IssueTracker')
    .directive('issueForm', function(){
            return {
                restrict: 'AE',
                templateUrl: 'app/views/partials/issue-form-partial.html',
                replace: true
            }
        }
    );
