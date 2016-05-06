'use strict';

angular
    .module('IssueTracker')
    .controller('IssueEditController', [
        '$scope', '$linq' , '$location', '$routeParams', 'identityService','issueService', 'projectService', 'userService','stringifyService', 'notifyService',

        function IssueEditController($scope, $linq, $location, $routeParams,identityService, issueService, projectService, userService, stringifyService, notifyService){

            var issueId = $routeParams.id;
            var _currentUser = identityService.getCurrentUser();

            var _issue;
            var _project;
            var _users = [];

            issueService.getIssueById(issueId)
                .then(function(issueData){
                    _issue = issueData;
                    var _projectId = _issue.Project.Id;
                    projectService.getProjectById(_projectId)
                        .then(function(projectData){
                            _project = projectData;
                            $scope.isAssignee = _currentUser.Id === _issue.Assignee.Id;
                            $scope.isProjectLeader = _currentUser.Username === _project.Lead.Username || _currentUser.isAdmin;

                            if($scope.isProjectLeader){
                                console.log ('isProjectLeader:');
                                console.log($scope.isProjectLeader);

                                userService.getAllUsers()
                                    .then(function(users){
                                        $scope.users = users.sort(function(userA, userB){
                                            return userA.Username.localeCompare(userB.Username);
                                        });
                                       // $scope.isLoadedData = true;
                                    });
                            }else{
                                _users.push(_currentUser);
                                $scope.users = _users;
                            }
                            $scope.issue = _issue;
                            $scope.priorities = _project.Priorities;
                            $scope.issue.LabelsStr = stringifyService.getCommaSeparatedString($scope.issue.Labels, 'Name');
                            $scope.issue.DueDateDate = new Date (_issue.DueDate);
                        })
                });

                function saveEditedIssue(issueToSave){
                    var editedIssue = {
                        Title:issueToSave.Title,
                        Description : issueToSave.Description,
                        DueDate : issueToSave.DueDateDate,
                        AssigneeId : issueToSave.Assignee.Id,
                        PriorityId : issueToSave.Priority.Id,
                        Labels : stringifyService.getCollection(issueToSave.LabelsStr)
                    };
                    issueService.editIssueById(issueToSave.Id, editedIssue)
                        .then(function(issueData){
                            notifyService.success('issue changes saved');
                            $location.path('/issues/'+issueToSave.Id);
                        })
                }

                $scope.save = function(issueToSave){
                    if(issueToSave.newStatus){
                        issueService.changeIssueStatus(issueToSave.Id, issueToSave.newStatus)
                            .then(function(result){
                                notifyService.success('issue status changed');
                                saveEditedIssue(issueToSave);
                            })
                    }else{
                        saveEditedIssue(issueToSave);
                    }
                }


        }]);

//_issue.DueDate =  $scope.issue.DueDateDate.toISOString()