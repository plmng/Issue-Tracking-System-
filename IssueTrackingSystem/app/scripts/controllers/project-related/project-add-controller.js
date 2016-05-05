'use strict';

angular
    .module('IssueTracker')
    .controller('ProjectAddController', [
        '$scope',
        '$location',
        '$uibModalInstance',
        'notifyService',
        'projectService',
        'usersForLeads',
        'labels',
        function ProjectAddController($scope,$location,$uibModalInstance,notifyService,projectService,usersForLeads,labels) {
            console.log('projects add controller loaded');
            $scope.usersForLeads = usersForLeads;
            $scope.allLabels = labels;

            $scope.currentLabels = [];

            $scope.cancel = function(){
                $uibModalInstance.dismiss('cancel');
            };

            $scope.addLabel = function(label){
                if(label!== undefined && label!='') {

                    $scope.currentLabels.push({
                        Name: label
                    });
                    $scope.label = '';
                }
            };

            $scope.addNewProject = function(projectData){

                var project = {
                    Name:projectData.Name,
                    Description:projectData.Description,
                    ProjectKey:projectData.ProjectKey,
                    LeadId:projectData.Lead.Id,
                    Labels:$scope.currentLabels
                };

                if(projectData.Priorities){
                    project.Priorities =projectData.Priorities.split(',').map(function(pr){
                        return{
                            Name: pr.trim()
                        }
                    })
                }else{
                    project.Priorities = [];
                }
                projectService.addNewProject(JSON.stringify(project),function(){
                    $uibModalInstance.close();
                    $location.path('/projects');
                    notifyService.success('project created');

                },function(){
                    $uibModalInstance.close();
                    $location.path('/projects');
                    notifyService.error('project not created');
                })
            };




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