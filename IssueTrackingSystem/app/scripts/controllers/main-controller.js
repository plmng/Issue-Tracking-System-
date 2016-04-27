'use strict';

angular
    .module('IssueTracker')
    .controller('MainController', [
        '$scope','$route', '$location','authenticationService', 'identityService',
        function MainController($scope, $route, $location, authenticationService, identityService){
            var _reload = function(){
                window.location.reload();
            };

            $scope.panel = 'dashboard';
            identityService.getCurrentUser()
                .then(function(user){
                    $scope.currentUser = user;
                    $scope.isAuthenticated = true;
                    $scope.isAdmin = user.isAdmin;
                });

            $scope.isAuthenticated = authenticationService.isAuthenticated();

            $scope.register = function(user){
                authenticationService.registerUser(user)
                    .then(function (registeredUser){
                        _reload();
                    });
            };

            $scope.login = function(user){
                console.log(user);
                authenticationService.loginUser(user)
                    .then(function(loggedInUser){
                        _reload();
                    });
            };

            $scope.logout = function(){
                authenticationService.logoutUser();
                _reload();

            };

            $scope.setPanel=function(panel){
                $scope.panel = panel;
            }




        }
    ]);
