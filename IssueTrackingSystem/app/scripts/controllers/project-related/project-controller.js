'use strict';

angular
    .module('IssueTracker')
    .controller('ProjectController', [
        '$scope','projectService',
        function ProjectController($scope, projectService) {

            $scope.getProjectInfo = function(id){
                projectService.getProjectById(id)
                    .then(function(projectInfo){
                        console.log(projectInfo);
                        $scope.project = projectInfo;
                    })
            };

            $scope.getProjectIssues = function(id){
                projectService.getIssuesByProjectId(id)
                    .then(function(projectIssuesInfo){
                        console.log(projectIssuesInfo);
                        $scope.issues = projectIssuesInfo;
                        $scope.issuePresence = $scope.issues.length > 0;
                    })
            };

            $scope.getProjectInfo(1);
            $scope.getProjectIssues(1)



        }]);
