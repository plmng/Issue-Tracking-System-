'use strict';

angular
    .module('IssueTracker')
    .controller('UserProjectsController', [
        '$scope',
        'projectService',
        'PAGE_SIZE',
        function UserProjectsController($scope,projectService, PAGE_SIZE) {

            $scope.itemsPerPage = PAGE_SIZE;
            $scope.currentPage = 1;

            var filter = $scope.currentUser.Id;

            $scope.pageChanged = function(newPage){
                console.log(newPage);
                $scope.currentPage = newPage;
                $scope.getCurrentUserRelatedProjects();

            };


            $scope.getCurrentUserRelatedProjects = function(){
                projectService.getProjectByFilter(pageNumber, filter)
                    .then(function(projectsData){
                        console.log(projectsData);
                        $scope.projects =$scope.currentUserProjects.concat(projectsData['Projects']);
                        scope.totalItems = projectsData.TotalPages * PAGE_SIZE;
                        $scope.projectPresence = $scope.projects.length > 0;
                        $scope.loaded = true;

                    })
            };

            $scope.getCurrentUserRelatedProjects();

            $scope.viewProject = function (id) {
                $location.path('/projects/' + id);
            };
        }]);
