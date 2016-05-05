'use strict';

angular
    .module('IssueTracker')
    .controller('IssueEditController', [
        '$scope', '$linq' , '$routeParams', 'identityService','issueService', 'projectService', 'userService','stringifyService',
        function IssueEditController($scope, $linq, $routeParams,identityService, issueService, projectService, userService, stringifyService){
            var _currentUser = identityService.getCurrentUser();
            if (_currentUser == undefined){
                console.log('dannite na usera gi nqma trqbwa da redirectne');
                //da redirectne za login
            }
            var _issue;
            var _users;
            var _project;
            var issueId = $routeParams.id;

            issueService.getIssueById(issueId)
                .then(function(issueData){
                    console.log(issueData);
                    _issue = issueData;
                    console.log(_currentUser);
                    var _projectId = _issue.Project.Id;
                    projectService.getProjectById(_projectId)
                        .then(function(projectData){
                            console.log(projectData);
                            _project = projectData;
                            userService.getAllUsers()
                                .then(function (usersData){
                           //         console.log(usersData);
                                    _users = usersData;
                                    $scope.users = _users;
                                    $scope.priorities = _project.Priorities;
                                    console.log($scope.priorities);
                                    $scope.isAssignee = _currentUser.Id === _issue.Assignee.Id;
                                    $scope.isProjectLeader = _currentUser.Username === _project.Lead.Username;
                                    $scope.issue = _issue;
                                    $scope.issue.DueDateDate = new Date (_issue.DueDate);
                                    $scope.AssigneeId = $scope.issue.Assignee.Id;
                                    $scope.PriorityId = $scope.issue.Priority.Id;
                                    $scope.issue.LabelsStr = stringifyService.getCommaSeparatedString($scope.issue.Labels, 'Name');
                                });







                        });

                });
        //    console.log($scope.issue);

//_issue.DueDate =  $scope.issue.DueDateDate.toISOString()

        }
    ]);
