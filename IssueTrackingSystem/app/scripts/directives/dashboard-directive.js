'use strict';
angular
    .module('IssueTracker')
    .directive('dashboardDirective', function(){
            return {
                restrict: 'AE',
                templateUrl: 'app/views/partials/dashboard-issues-partial.html',
                replace: true,
                controller : 'DashboardController'
            }
        }
    );