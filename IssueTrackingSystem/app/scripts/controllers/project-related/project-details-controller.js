'use strict';

angular
    .module('IssueTracker')
    .controller('ProjectDetailsController', [
        '$scope','$routeParams', '$location', 'projectService', 'identityService','$uibModal','userService',
        function ProjectDetailsController($scope, $routeParams, $location, projectService, identityService, $uibModal, userService ) {
            var id = $routeParams.id;
            $scope.currentUser = identityService.getCurrentUser();


            $scope.getProjectInfo = function(){
                projectService.getProjectById(id)
                    .then(function(projectInfo){
                        /*
                        console.log(projectInfo);
                        console.log($scope.currentUser);
                        */
                        $scope.project = projectInfo;
                        $scope.isProjectLeader = $scope.project.Lead.Username === $scope.currentUser.Username;
                        $scope.isPrLAdmin = $scope.project.Lead.Username === $scope.currentUser.Username || $scope.currentUser.isAdmin;
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

            /*
            * button EDIT PROJECT click function
            */
            $scope.editProject = function(){
                $location.path("projects/" + id + '/edit');
            };

            /*
            * button ADD Issue click function -> open modal
            */
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

            $scope.getProjectInfo();
            $scope.getProjectIssues();



        }]);
