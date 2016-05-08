'use strict';

angular
    .module('IssueTracker')
    .controller('ProjectEditController', [
        '$scope','$routeParams', '$location', 'projectService','stringifyService','userService','identityService','notifyService',
        function ProjectEditController($scope, $routeParams, $location, projectService, stringifyService, userService, identityService, notifyService) {

            $scope.currentUser = identityService.getCurrentUser();
            console.log($scope.currentUser);
            $scope.isDisabled = true;
            $scope.isLoadedData = false;


            var id = $routeParams.id;
            /*
            * @desc gets all project data and load it in the form;
            */
            $scope.getProjectInfo = function(){
                projectService.getProjectById(id)
                    .then(function(projectInfo){
                        $scope.project = projectInfo;
                        $scope.isProjectLeader = $scope.project.Lead.Username === $scope.currentUser.Username;
                        $scope.isAdmin = $scope.currentUser.isAdmin;

                        if(!$scope.isProjectLeader && !$scope.isAdmin){
                            notifyService.error('unauthorized access');
                            $location.path('/');
                        }
                        $scope.project.LabelsStr = stringifyService.getCommaSeparatedString($scope.project.Labels, 'Name');
                        $scope.project.PrioritiesStr = stringifyService.getCommaSeparatedString($scope.project.Priorities, 'Name');

                        if($scope.isAdmin){
                            userService.getAllUsers()
                                .then(function(users){
                                    $scope.users = users.sort(function(userA, userB){
                                        return userA.Username.localeCompare(userB.Username);
                                    });
                                    $scope.isLoadedData = true;
                                })
                        }else{
                            $scope.users = [];
                            $scope.users.push($scope.currentUser);
                            $scope.isLoadedData = true;
                        }

                    })
            };

            $scope.saveChanges = function(editedUser){
                console.log(editedUser);
                editedUser.LeadId = editedUser.Lead.Id;
                editedUser.Labels = [];
                editedUser.Priorities = [];
                if (editedUser.LabelsStr){
                    editedUser.Labels = stringifyService.getCollection(editedUser.LabelsStr);
                }
                if (editedUser.PrioritiesStr){
                    editedUser.Priorities = stringifyService.getCollection(editedUser.PrioritiesStr);
                }
                console.log(editedUser);
               projectService.putEditedProject(id, editedUser)
                   .then(function(){
                       $location.path("projects/" + id);
                   })

            };

            // call service to save data


            $scope.getProjectInfo();



        }]);