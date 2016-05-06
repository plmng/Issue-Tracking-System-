'use strict';

angular
    .module('IssueTracker')
    .controller('IssueDetailsController', [
        '$scope','$routeParams', '$location','$route', 'notifyService', 'issueService','identityService','projectService',
        function IssueDetailsController($scope, $routeParams, $location,$route, notifyService, issueService,identityService, projectService ){
            var currentUser = identityService.getCurrentUser();

            var issueId = $routeParams.id;
            var isAllLoaded = false;



            function getAllComments(){
                issueService.getAllComments(issueId)
                    .then(function(comments){
                        $scope.comments = comments;
                      //  console.log($scope.comments);
                    })
            }
            function getIssueProject(projectId){
                projectService.getProjectById(projectId)
                    .then(function(projectData){
                        //console.log(projectData);
                        $scope.isProjectLeader = projectData.Lead.Username == currentUser.Username;
                        console.log($scope.isProjectLeader);
                        isAllLoaded = true;
                    })
            }

            function getIssueDetails(){
                issueService.getIssueById(issueId)
                    .then(function(issueDetails){
                        $scope.issue = issueDetails;
                     //   console.log($scope.issue);
                        $scope.isAssignee = issueDetails.Assignee.Username ===  currentUser.Username;
                        $scope.isAdmin =  currentUser.isAdmin;
                      //  $scope.isProjectLeader = issueDetails.Author['Username'] ===  currentUser.Username;
                        getIssueProject(issueDetails.Project.Id);
                    })
            }

            $scope.changeStatus = function(statusId){
                console.log(statusId);
                issueService.changeIssueStatus(issueId,statusId)
                    .then(function(){
                        notifyService.success('status changed');
                     //   $location.path('/issues/'+issueId);
                        $route.reload();
                    });
                //TODO : call the service to change status and reload the page;

            };

            $scope.editIssue = function(){
                $location.path('/issues/'+issueId+'/edit');
               // console.log('edit issue button is clicked')

            };

            $scope.addComment = function(comment){
                console.log('new comment');
                console.log(comment);
                var commentToAdd = {
                    Text: comment
                };
                $scope.comments = issueService.addComment(issueId, commentToAdd)
                    .then(function(){
                        notifyService.success("comment added");
                        $route.reload();
                    });
            };

            getAllComments();
            getIssueDetails();
        }
    ]);
