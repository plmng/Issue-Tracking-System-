'use strict';
angular
    .module('IssueTracker')
    .directive('userProjects', function(){
            return {
                restrict: 'AE',
                templateUrl: 'app/views/partials/currentUserProjects-partial.html',
                replace: true,
                controller : 'CurrentUserProjectsController'
            }
        }
    );
