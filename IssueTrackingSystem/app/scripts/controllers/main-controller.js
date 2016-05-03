'use strict';

angular
    .module('IssueTracker')
    .controller('MainController', [
        '$scope','$route', '$location','authenticationService', 'identityService','notifyService',
        function MainController($scope, $route, $location, authenticationService, identityService, notifyService){
            var _reload = function(){
                window.location.reload();
            };

            /*
            * $scope.activeLink - prop. holds the name of li to be shown as active
            * $scope.setActiveLink - func - set the current opened link
            */
            $scope.activeLink = '';
            $scope.setActiveLink=function(link){
                $scope.activeLink = link;
            };

            identityService.getCurrentUser()
                .then(function(user){
                    $scope.currentUser = user;
                    $scope.isAuthenticated = true;
                    $scope.isAdmin = user.isAdmin;
                    $scope.$broadcast('currentUser', $scope.currentUser);
                });

            $scope.isAuthenticated = authenticationService.isAuthenticated();

            $scope.register = function(user){
                authenticationService.registerUser(user)
                    .then(function (registeredUser){
                        notifyService.success('REGISTERED');
                        _reload();
                    });
            };

            $scope.login = function(user){
                console.log(user);
                authenticationService.loginUser(user)
                    .then(function(loggedInUser){
                        notifyService.success('LOGGED IN');
                        _reload();

                    });
            };

            $scope.logout = function(){
                authenticationService.logoutUser();
                notifyService.success('LOGGED OUT');
                _reload();

            };

            $scope.changePass = function(passData){
                identityService.changePassword(passData).then(function(response){
                    notifyService.success('PASSWORD CHANGED');
                    $location.path('/')
                });

            }






        }
    ]);
