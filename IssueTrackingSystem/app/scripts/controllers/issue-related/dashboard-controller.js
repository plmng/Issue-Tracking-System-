'use strict';
angular
    .module('IssueTracker')
    .controller('DashboardController', [
        '$scope',
        '$location',
        'issueService',
        'DASHBOARD_ISSUE_PAGE_SIZE',
        function DashboardController($scope, $location, issueService, DASHBOARD_ISSUE_PAGE_SIZE){

            $scope.issueDataLoaded = false;
            var projects = [];
            $scope.itemsPerPage = DASHBOARD_ISSUE_PAGE_SIZE;
            $scope.currentPage = 1;

            $scope.orderedBy = 'DueDate';
            $scope.reverse = true;
          /*
            $scope.order = function(orderedBy){
                $scope.reverse = ($scope.orderedBy === orderedBy) ? !$scope.reverse : false;
                $scope.orderedBy = orderedBy;
            };
*/

            $scope.pageChanged = function(newPage){
                console.log(newPage);
                $scope.currentPage = newPage;
                $scope.getIssues();

            };

            $scope.getIssues = function(){
                issueService.getAssignedIssues($scope.currentPage,  $scope.orderedBy)
                    .then(function(issuesData){
                        $scope.issues = issuesData['Issues'];
                        $scope.totalItems = issuesData.TotalPages * DASHBOARD_ISSUE_PAGE_SIZE;
                        $scope.issuePresence = $scope.issues.length > 0;
                        $scope.issueDataLoaded = true;
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
