'use strict';

angular
    .module('IssueTracker')
    .controller('ProjectController', [
        '$scope','$routeParams', '$location', 'projectService',
        function ProjectController($scope, $routeParams, $location, projectService) {
            var id = $routeParams.id;

            $scope.getProjectInfo = function(){
                projectService.getProjectById(id)
                    .then(function(projectInfo){
                        console.log(projectInfo);
                      //  console.log($scope.currentUser);
                        $scope.project = projectInfo;
                        $scope.isAuthor = $scope.project.Lead.Username === $scope.currentUser.Username;
                    })
            };

            $scope.getProjectIssues = function(){
                projectService.getIssuesByProjectId(id)
                    .then(function(projectIssuesInfo){
                      //  console.log(projectIssuesInfo);
                        $scope.issues = projectIssuesInfo;
                        $scope.issuePresence = $scope.issues.length > 0;
                    })
            };


            $scope.editProject = function(){
             //   $location.path("projects/" + id + '/edit');
                $location.path("projects/add");
            };
            $scope.getProjectInfo();
            $scope.getProjectIssues();



        }]);
