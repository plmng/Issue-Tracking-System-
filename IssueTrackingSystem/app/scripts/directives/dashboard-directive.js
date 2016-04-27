'use strict';
angular
    .module('IssueTracker')
    .directive('dashboardDirective', function(){
            return {
                restrict: 'AE',
                templateUrl: 'app/views/partials/dashboard-directive.html',
                replace: true,
                controller : 'DashboardController',
                scope: {
                    currentUser : "="
                }
            }
        }
    );