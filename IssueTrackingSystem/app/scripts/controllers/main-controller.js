'use strict';

angular
    .module('IssueTracker')
    .controller('MainController', [
        '$scope','$route', '$location','$uibModal','authenticationService', 'identityService','notifyService','userService','labelService',
        function MainController( $scope, $route, $location,$uibModal, authenticationService, identityService, notifyService, userService, labelService){
            var _reload = function(){
                window.location.reload();
            };

           var currentUser = identityService.getCurrentUser();
            $scope.isAuthenticated = authenticationService.isAuthenticated();
            if(currentUser){
                $scope.isAdmin = currentUser.isAdmin;
                $scope.currentUser = currentUser;
            }


            $scope.register = function(user){
                authenticationService.registerUser(user)
                    .then(function (registeredUser){
                        notifyService.success('REGISTERED');
                        _reload();
                    });
            };

            $scope.login = function(user){
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

            $scope.openAddProjectModal = function(){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/app/views/project-add.html',
                    controller: 'ProjectAddController',
                    resolve: {
                        usersForLeads: userService.getAllUsers(function(users){
                            return users.data.filter(function (usr) {
                                return usr.Username !== currentUser.Username
                            });
                        }),
                        labels:labelService.getAllLabels(function(succes){
                            return succes.data;
                        })
                    }
                });
            };



        }
    ]);
