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

            return{
                getAssignedIssues : getAssignedIssues
            }
        }
    ]);
