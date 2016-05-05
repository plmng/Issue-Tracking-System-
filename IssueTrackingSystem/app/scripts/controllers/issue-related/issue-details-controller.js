'use strict';

angular
    .module('IssueTracker')
    .controller('IssueDetailsController', [
        '$scope','$routeParams', '$location','$route', 'notifyService', 'issueService','identityService',
        function IssueDetailsController($scope, $routeParams, $location,$route, notifyService, issueService,identityService ){
            var currentUser = identityService.getCurrentUser();
            var issueId = $routeParams.id;
            var isAllLoaded = false;

            function getAllComments(){
                issueService.getAllComments(issueId)
                    .then(function(comments){
                        $scope.comments = comments;
                        console.log($scope.comments);
                    })
            }

            function getIssueDetails(){
                issueService.getIssueById(issueId)
                    .then(function(issueDetails){
                        $scope.issue = issueDetails;
                        console.log($scope.issue);
                        $scope.isAssignee = issueDetails.Assignee.Username ===  currentUser.Username;
                        $scope.isProjectLeader = issueDetails.Author['Username'] ===  currentUser.Username;
                        $scope.isAdmin =  currentUser.isAdmin;
                        isAllLoaded = true;
                    })
            }

            $scope.changeStatus = function(statusId){
                console.log(statusId);
                //TODO : call the service to change status and reload the page;
                notifyService.success('status changed');
            };

            $scope.editIssue = function(){
                console.log('edit issue button is clicked')

            };

            $scope.addComment = function(){
                var commentToAdd = {
                    Text: $scope.commentToAdd
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
