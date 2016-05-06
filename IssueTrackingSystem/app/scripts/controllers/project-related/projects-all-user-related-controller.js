'use strict';

angular
    .module('IssueTracker')
    .controller('AllUserRelatedProjectsController', [
        '$scope',
        '$location',
        '$linq',
        'projectService',
        'DASHBOARD_PROJECTS_PAGE_SIZE',
        function AllUserRelatedProjectsController($scope, $location, $linq, projectService, DASHBOARD_PROJECTS_PAGE_SIZE){

            $scope.projectsDataLoaded = false;
            var _totalProjects;
            $scope.projectItemsPerPage = DASHBOARD_PROJECTS_PAGE_SIZE;
            $scope.projectCurrentPage = 1;

            function _getProjectPage(projects, page){
                var startIndex = (page-1)*$scope.projectItemsPerPage;
                var endIndex = page*$scope.projectItemsPerPage;
                return projects.slice(startIndex, endIndex);
            }

            $scope.projectpageChanged = function(newPage){
                $scope.projectCurrentPage = newPage;
                $scope.projects = _getProjectPage(_totalProjects,$scope.projectCurrentPage );
            };

            $scope.getProjects = function(){
              projectService.getAllUserRelatedProjects($scope.projectCurrentPage)
                  .then(function(projectData){
                      $scope.totalItems = projectData.length;
                      _totalProjects = projectData;
                      $scope.projects = _getProjectPage(_totalProjects,$scope.projectCurrentPage );
                      $scope.projectPresence = $scope.projects.length > 0;
                      $scope.projectsDataLoaded = true;
                      $scope.loaded = true;
                  })
            };

            $scope.getProjects();
        }]);
