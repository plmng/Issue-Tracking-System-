'use strict';

angular
    .module('IssueTracker')
    .controller('IssueAddController', [
        '$scope',
        '$location',
        '$route',
        '$uibModalInstance',
        'identityService',
        'issueService',
        'notifyService',
        'usersForAssignees',
        'currentProject',
        'allProjects',
        function IssueAddController($scope,$location,$route,$uibModalInstance,identityService,issueService,notifyService,
                                    usersForAssignees,currentProject,allProjects){

            $scope.allProjects = [];
            $scope.currentProject = currentProject;
            $scope.usersForAssignees = usersForAssignees;
            $scope.allLabels = currentProject.Labels;
            $scope.issuePriorities = $scope.currentProject.Priorities;
            if(identityService.getCurrentUser().isAdmin) {
                $scope.allProjects = allProjects;
            }else{
                $scope.allProjects.push(currentProject);
            }
            $scope.currentLabels = [];

            $scope.$watch('currentProject', function (newProject){
                $scope.issuePriorities = newProject.Priorities;
                $scope.allLabels = newProject.Labels;

            });

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

            $scope.addNewIssue = function(issueData){
                var issue = {
                    Title:issueData.Title,
                    Description:issueData.Description,
                    DueDate:issueData.DueDate,
                    ProjectId:currentProject.Id,
                    AssigneeId:issueData.Assignee.Id,
                    Labels:$scope.currentLabels
                };

                if(issueData.Priority){
                    issue.PriorityId = issueData.Priority.Id;
                }

                issueService.addNewIssue(JSON.stringify(issue),function(){
                    $uibModalInstance.close();
                    $route.reload();
                    notifyService.success('issue created');

                },function(){
                    $uibModalInstance.close();
                    $location.path('/');
                    notifyService.error('issue not created during some problems');
                })

            }

        }
    ]);