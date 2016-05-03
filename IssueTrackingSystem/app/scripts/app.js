'use strict';

angular
    .module('IssueTracker', [
        'ngRoute',
        'angular-loading-bar',
        'ui.bootstrap',
        'ngCookies'
    ])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('PAGE_SIZE', 5)
    .constant('toastr', toastr)
    //exec before registration of angular modules, controllers, services
    .config([
        '$routeProvider', '$httpProvider',
        function($routeProvider, $httpProvider) {
            $routeProvider.when('/', {
                templateUrl: 'app/views/dashboard.html',
                controller: 'MainController'
                //TODO:only for authorised
            });
            $routeProvider.when('/projects/:id', {
                templateUrl: 'app/views/project.html',
                controller: 'ProjectController'
                //TODO:only for authorised and check for all restrictions
            });
            $routeProvider.when('/projects/:id/edit', {
                templateUrl: 'app/views/project-form.html',
                controller: 'ProjectEditController'
                //TODO only for projectLeader and Admin
            });
            $routeProvider.when('/projects', {
                templateUrl: 'app/views/projects.html',
                controller: 'ProjectAllController'
                //TODO only for Admin
            });
            $routeProvider.when('/projects/add', {
                templateUrl: 'app/views/project-form.html',
                controller: 'ProjectAddController'
                //TODO only for Admin
            });
            $routeProvider.when('/profile/password', {
                templateUrl: 'app/views/user-change-password.html',
                controller: 'MainController'
                //TODO only for Admin
            });
            $routeProvider.when('/issues/:id', {
                templateUrl: 'app/views/issue-view.html',
                controller: 'IssueDetailsController'
            });
            $routeProvider.when('/projects/:id/add-issue', {
                templateUrl: 'app/views/issue-form.html',
                controller: 'MainController'
            });

            $routeProvider.when('/issues/:id/edit', {
                templateUrl: 'app/views/issue-form.html',
                controller: 'MainController'
            });

            /*
            $routeProvider.when('/projects/:id/add-issue', {
                templateUrl: 'app/views/',
                controller: ''
            });

            $routeProvider.when('/issues/:id/edit', {
                templateUrl: 'app/views/',
                controller: ''
            });
            $routeProvider.when('/profile', {
                templateUrl: 'app/views/',
                controller: ''
            });
            $routeProvider.when('/profile/password', {
                templateUrl: 'app/views/',
                controller: ''
            });
            $routeProvider.when('/logout', {
                templateUrl: 'app/views/',
                controller: ''
            });

            //to add admin rouths

            //from beckend endpoints
            $routeProvider.when('/projects', {
                templateUrl: 'app/views/',
                controller: ''
            });
            $routeProvider.when('/projects/:id/issues', {
                templateUrl: 'app/views/',
                controller: ''
            });
            $routeProvider.when('/issues', {
                templateUrl: 'app/views/',
                controller: ''
            });
            $routeProvider.when('/issues/me', {
                templateUrl: 'app/views/',
                controller: ''
            });
            $routeProvider.when('/issues/:id/changestatus', {
                templateUrl: 'app/views/',
                controller: ''
            });
            $routeProvider.when('/issues/:id/comments', {
                templateUrl: 'app/views/',
                controller: ''
            });
            */
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


