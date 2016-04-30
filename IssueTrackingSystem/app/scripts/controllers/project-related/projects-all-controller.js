'use strict';

angular
    .module('IssueTracker')
    .controller('ProjectAllController', [
        '$scope', '$routeParams', '$location','projectService','PAGE_SIZE',
        function ProjectAllController($scope, $routeParams, $location, projectService, PAGE_SIZE ){

            $scope.itemsPerPage = PAGE_SIZE;
            $scope.currentPage = 1;


            $scope.pageChanged = function(newPage){
                console.log(newPage);
                $scope.currentPage = newPage;
                getAllProjects();

            };

            $scope.editProject= function(id){
                $location.path('/projects/' + id + '/edit');
            };


            function getAllProjects(){
                var filter = '';
                projectService.getAllProjectsPaged($scope.currentPage, filter)
                    .then(function(projectsData){
                        console.log('projects-all-controller');
                        console.log(projectsData);
                        $scope.projects = projectsData.Projects;
                        $scope.totalItems = projectsData.TotalPages * PAGE_SIZE;
                        $scope.projectsPresence = $scope.projects.length > 0;
                        $scope.loaded = true;
                    })
            }

            getAllProjects();
        }
    ]);
