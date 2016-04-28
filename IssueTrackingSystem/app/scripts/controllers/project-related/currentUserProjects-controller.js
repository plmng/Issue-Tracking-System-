'use strict';

angular
    .module('IssueTracker')
    .controller('CurrentUserProjectsController', [
        '$scope',
        '$location',
        'projectService',
        'PAGE_SIZE',
        function CurrentUserProjectsController($scope, $location, projectService, PAGE_SIZE){

            $scope.itemsPerPage = PAGE_SIZE + 2;
            $scope.projectCurrentPage = 1;


            $scope.projectpageChanged = function(newPage){
                console.log(newPage);
                $scope.projectCurrentPage = newPage;
                $scope.getProjects();

            };

            $scope.getProjects = function(){
                projectService.getProjectsByUserId($scope.projectCurrentPage)
                    .then(function(projectData){
                        console.log(projectData);
                        $scope.projects = projectData['Projects'];
                        $scope.totalItems = projectData.TotalPages * $scope.itemsPerPage;
                        $scope.projectPresence = $scope.projects.length > 0;
                        $scope.loaded = true;
                    })
            };

            $scope.getProjects();

            $scope.viewProject = function (id) {
                $location.path('/projects/' + id);
            };

        }]);
