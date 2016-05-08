'use strict';

angular
    .module('IssueTracker')
    .controller('ProjectAllController', [
        '$scope', '$routeParams', '$location','$uibModal','projectService', 'userService', 'DASHBOARD_PROJECTS_PAGE_SIZE','identityService','notifyService',
        function ProjectAllController($scope, $routeParams, $location, $uibModal, projectService, userService, DASHBOARD_PROJECTS_PAGE_SIZE, identityService, notifyService  ){

             var currentUser = identityService.getCurrentUser();
                if(!currentUser.isAdmin){
                    notifyService.error('unauthorized access');
                    $location.path('/');
                }


            $scope.itemsPerPage = DASHBOARD_PROJECTS_PAGE_SIZE;
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
                        $scope.projects = projectsData.Projects;
                        $scope.totalItems = projectsData.TotalPages * DASHBOARD_PROJECTS_PAGE_SIZE;
                        $scope.projectsPresence = $scope.projects.length > 0;
                        $scope.loaded = true;
                    })
            }

            $scope.openAddIssueToProjectModal = function(project){

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/app/views/issue-add.html',
                    controller: 'IssueAddController',
                    resolve:{
                        usersForAssignees: userService.getAllUsers(function(users){
                            console.log('modal add issue - users');
                            console.log(users);
                            return users;
                        }),
                        currentProject:project,
                        allProjects:projectService.getAllProjects()
                    }
                });
            };


            getAllProjects();
        }
    ]);
