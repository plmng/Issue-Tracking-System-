'use strict';

angular
    .module('IssueTracker')
    .controller('ProjectEditController', [
        '$scope','$routeParams', '$location', 'projectService','stringifyService','userService',
        function ProjectEditController($scope, $routeParams, $location, projectService, stringifyService, userService) {
            $scope.formType = 'Edit project';
            $scope.isDisabled = true;
            $scope.isLoadedData = false;

            /*
            * get project details by id and display them on form
            * Object {Id: 86, Name: "sdxxc cx", ProjectKey: "sc", Description: "sd", Lead: Object…}
             Description : "sd"
             Id :  86
             Labels :  Array[1]
                                 Id : 526
                                 Name : "pesho"
             Lead : Object
                                 Id : "e0e672ee-9382-4860-98be-cfa68743a20a"
                                 Username : "admin@softuni.bg"
                                 isAdmin  :       true
             Name :  "sdxxc cx"
             Priorities :  Array[1]
                                 Id : 1
                                 Name : "Low"
            ProjectKey : "sc"
             TransitionSchemeId : 1
            */

            var id = $routeParams.id;
            /*
            * @desc gets all project data and load it in the form;
            */
            $scope.getProjectInfo = function(){
                projectService.getProjectById(id)
                    .then(function(projectInfo){
                        $scope.project = projectInfo;
                        $scope.project.LabelsStr = stringifyService.getCommaSeparatedString($scope.project.Labels, 'Name');
                        $scope.project.PrioritiesStr = stringifyService.getCommaSeparatedString($scope.project.Priorities, 'Name');
                        $scope.isAuthor = $scope.project.Lead.Username === $scope.currentUser.Username;
                        userService.getAllUsers()
                            .then(function(users){
                                $scope.users = users.sort(function(userA, userB){
                                    return userA.Username.localeCompare(userB.Username);
                                });
                                $scope.isLoadedData = true;
                            })
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