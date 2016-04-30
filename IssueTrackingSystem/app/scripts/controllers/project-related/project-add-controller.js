'use strict';

angular
    .module('IssueTracker')
    .controller('ProjectAddController', [
        '$scope', '$routeParams', '$location', 'projectService','stringifyService','userService',
        function ProjectAddController($scope, $routeParams, $location, projectService, stringifyService, userService) {
            console.log('projects add controller loaded');
         //   $scope.formType = 'Add project';
           // $scope.isDisabled = true;
           // $scope.isLoadedData = true;
        //    console.log('Project Add Controller is loaded');


/*
            userService.getAllUsers()

                .then(function(users){
                    $scope.users = users.sort(function(userA, userB){
                        return userA.Username.localeCompare(userB.Username);
                    });
                    $scope.isLoadedData = true;
                });

            function _generateKey(){
                if($scope.project.Name){
                    $scope.project.ProjectKey = $scope.project.Name.split(' ').map(function(item){return item[0]}).join('')
                }
            }

            $scope.saveChanges = function(project){
                console.log(project);
                project.LeadId = project.Lead.Id;
                project.Labels = [];
                project.Priorities = [];
                if (project.LabelsStr){
                    project.Labels = stringifyService.getCollection(project.LabelsStr);
                }
                if (project.PrioritiesStr){
                    project.Priorities = stringifyService.getCollection(project.PrioritiesStr);
                }
                console.log(project);
                projectService.putEditedProject(id, project)
                    .then(function(){
                        $location.path("projects/" + id);
                    })

            };
*/
        }]);