'use strict';
angular
    .module('IssueTracker')
    .controller('DashboardController', [
        '$scope',
        'issueService',
        'PAGE_SIZE',
        function DashboardController($scope, issueService, PAGE_SIZE){
            var projects = [];
            $scope.itemsPerPage = PAGE_SIZE;
            $scope.currentPage = 1;

            $scope.orderedBy = 'DueDate';
            $scope.reverse = true;
            $scope.order = function(orderedBy){
                $scope.reverse = ($scope.orderedBy === orderedBy) ? !$scope.reverse : false;
                $scope.orderedBy = orderedBy;
            };
            $scope.pageChanged = function(newPage){
                console.log(newPage);
                $scope.currentPage = newPage;
                $scope.getIssues();

            };
            $scope.getIssues = function(){
                issueService.getAssignedIssues($scope.currentPage,  $scope.orderedBy)
                    .then(function(issuesData){
                        $scope.issues = issuesData['Issues'];
                        $scope.issues.forEach(function(issue){
                            projects.push(issue['Project']);
                        });
                        $scope.currentUserProjects = projects;
                        console.log($scope.currentUserProjects);
                        $scope.totalItems = issuesData.TotalPages * PAGE_SIZE;
                        $scope.issuePresence = $scope.issues.length > 0;
                        $scope.loaded = true;
                    })
            };

            $scope.getIssues();

            $scope.viewProject = function (id) {
                $location.path('/projects/' + id);
            };

            $scope.viewIssue = function (id) {
                $location.path('/issues/' + id);
            };
        }
    ]);
