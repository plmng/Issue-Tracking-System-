'use strict';
angular
    .module('IssueTracker')
    .factory('issueService', [
        '$http',
        '$q',
        'PAGE_SIZE',
        'BASE_URL',
        function issueService($http, $q, PAGE_SIZE, BASE_URL){
            function getAssignedIssues(pageNumber, order){
                var deferred = $q.defer();

                //issues/me?orderBy=Project.Name desc, IssueKey&pageSize=2&pageNumber=1
                $http.get(BASE_URL + 'issues/me?orderBy=' + order + '&pageSize=' + PAGE_SIZE + '&pageNumber='+ pageNumber)
                    .then(function(response){
                        deferred.resolve(response.data)
                    });

                return deferred.promise;
            }

            /*
            * endpoint: GET Issues/{id}
            * returns issue details
            */
            function getIssueById(id){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'issues/' + id)
                    .then(function(response){
                        deferred.resolve(response.data);
                    });

                return deferred.promise;
            }

            /*
            * endpoint: [PUT] Issues/{id}
            * returns: edited issue
            */
            function editIssueById(id, issueToEdit){
                var deferred = $q.defer();

                $http.put(BASE_URL + 'issues/' + id, issueToEdit)
                    .then(function(response){
                        console.log(response);
                        deferred.resolve(response.data)
                    });

                return deferred.promise;
            }

            /*
            * endpoint: [POST] Issues/
            * returns: created issue
            */
            function createIssue(issueToCreate){
                var deferred = $q.defer();

                $http.post(BASE_URL + 'issues/', issueToCreate)
                    .then(function(response){
                        console.log(response);
                        deferred.resolve(response.data)
                    });

                return deferred.promise;
            }

            /*
            * endpoint: [PUT] Issues/{id}/changestatus?statusid={statusId}
            * returns: The new available statuses;
            */
            function changeIssueStatus(issueId, statusId){
                var deferred = $q.defer();

                $http.put(BASE_URL + 'issues/'+ issueId + '/changestatus?statusid='+ statusId)
                    .then(function(response){
                        console.log(response);
                        deferred.resolve(response.data);
                    });

                return deferred.promise;
            }
            /*
            * endpoint: [GET] Issues/{id}/comments
            * returns: collection ot comments for issueId
            */
            function getAllComments(id){
                var deferred = $q.defer();
                $http.get(BASE_URL + 'issues/'+ id + '/comments')
                    .then(function(response){
                       console.log(response);
                        deferred.resolve(response.data);
                    });
                return deferred.promise;
            }

            /*
            * endpoint:  [PUT] Issues/{id}/comments
            * returns: list of all the issue’s comments
            */
            function addComment(id, comment){
                var deferred = $q.defer();
                $http.post(BASE_URL + 'issues/'+ id + '/comments', comment)
                    .then(function(response){
                        console.log(response);
                        deferred.resolve(response.data);
                    });
                return deferred.promise;
            }

            return{
                getAssignedIssues : getAssignedIssues,
                getIssueById : getIssueById,
                editIssueById : editIssueById,
                createIssue : createIssue,
                changeIssueStatus : changeIssueStatus,
                getAllComments : getAllComments,
                addComment : addComment
            }
        }
    ]);
