'use strict';

angular
    .module('IssueTracker', [
        'ngRoute',
        'angular-linq',
        'angular-loading-bar',
        'ui.bootstrap',
        'ngCookies'
    ])

    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('DASHBOARD_ISSUE_PAGE_SIZE', 5)
    .constant('DASHBOARD_PROJECTS_PAGE_SIZE', 7)
    .constant('toastr', toastr)

    //exec before registration of angular modules, controllers, services
    .config([
        '$routeProvider', '$httpProvider',
        function($routeProvider, $httpProvider) {
            $routeProvider.when('/', {
                templateUrl: 'app/views/dashboard.html',
                controller: 'MainController'
            });
            $routeProvider.when('/projects/:id', {
                templateUrl: 'app/views/project-details.html',
                controller: 'ProjectDetailsController'
            });
            $routeProvider.when('/projects/:id/edit', {
                templateUrl: 'app/views/project-edit.html',
                controller: 'ProjectEditController'
            });
            $routeProvider.when('/projects', {
                templateUrl: 'app/views/projects.html',
                controller: 'ProjectAllController'
            });

            $routeProvider.when('/issues/:id', {
                templateUrl: 'app/views/issue-details.html',
                controller: 'IssueDetailsController'
            });
            $routeProvider.when('/issues/:id/edit', {
                templateUrl: 'app/views/issue-edit.html',
                controller: 'IssueEditController'
            });
            $routeProvider.when('/profile/password', {
                templateUrl: 'app/views/user-change-password.html',
                controller: 'MainController'
            });
            $routeProvider.otherwise({redirectTo: '/'});


            /*
            * desc configuring global server error handling via interceptor
            */
            $httpProvider.interceptors.push(['$q', 'toastr', function($q, toastr){
                return {
                    // desc all error response format types
                    'responseError' : function(rejection){
                        toastr.options = {"positionClass": "toast-bottom-right"};
                        // error format with error_description
                        if(rejection.data && rejection.data['error_description']){
                            toastr.error(rejection.data['error_description']);
                        }
                        // error format with ModelsState
                        else if(rejection.data && rejection.data.ModelState && rejection.data.ModelState[""]){
                            var errors = rejection.data.ModelState[""];
                            if(errors.length > 0){
                                toastr.error(errors[0]);
                            }
                        }else if(rejection.data && rejection.data.ModelState){
                            Object.keys(rejection.data.ModelState)
                                .forEach(function (key) {
                                    var val = rejection.data.ModelState[key];
                                    toastr.error(val);
                                })
                        }
                        //catch and add all other types of errors formats that the server returns
                        else {
                            console.log ('there is error type to catch:');
                            console.log(rejection);
                        }




                        return $q.reject(rejection)
                    }
                }
            }]);
}])

    /* exec after registration of angular modules, controllers, services, so they can be injected
        desc: on app refresh if user is logged sets the auth headers */
    .run(['authenticationService', function(authenticationService){
        authenticationService.refreshCookie();
    }]);


