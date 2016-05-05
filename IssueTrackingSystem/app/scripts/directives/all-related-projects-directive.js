'use strict';
angular
    .module('IssueTracker')
    .directive('allUserRelatedProjects', function(){
            return {
                restrict: 'AE',
                templateUrl: 'app/views/partials/dashboard-user-related-projects-partial.html',
                replace: true,
                controller : 'AllUserRelatedProjectsController'
            }
        }
    );
