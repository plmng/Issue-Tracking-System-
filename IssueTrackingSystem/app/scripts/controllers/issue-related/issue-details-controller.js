'use strict';

angular
    .module('IssueTracker')
    .controller('IssueDetailsController', [
        '$scope','$routeParams', '$location', 'notifyService', 'issueService','$route',
        function IssueDetailsController($scope, $routeParams, $location, notifyService, issueService, $route){
            $scope.$on('currentUser', function(event, currentUser) {
                $scope.currentUser = currentUser;
            });
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
                        $scope.isAssignee = issueDetails.Assignee.Username ===  $scope.currentUser.Username;
                        $scope.isProjectLeader = issueDetails.Author['Username'] ===  $scope.currentUser.Username;
                        $scope.isAdmin =  $scope.currentUser.isAdmin;
                        isAllLoaded = true;

                        //console.log('is assignee: ', $scope.isAssignee);
                        //console.log('is project leader: ', $scope.isProjectLeader);
                        //console.log('is admin: ', $scope.isAdmin);
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
                console.log($scope.commentToAdd);
                var commentToAdd = {
                    Text: $scope.commentToAdd
                };
                $scope.comments = issueService.addComment(issueId, commentToAdd).then(function(){
                    notifyService.success("comment added");
                    $route.reload();
                });

            };


            getAllComments();
            getIssueDetails();
        }
    ]);
