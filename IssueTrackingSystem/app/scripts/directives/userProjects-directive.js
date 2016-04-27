'use strict';
angular
    .module('IssueTracker')
    .directive('userProjects', function(){
            return {
                restrict: 'AE',
                templateUrl: 'app/views/partials/userProjects-directive.html',
                replace: true,
                controller : 'UserProjectsController',
                scope: {
                    currentUser : "="
                }
            }
        }
    );
