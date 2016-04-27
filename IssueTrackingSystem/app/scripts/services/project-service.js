'use strict';
angular
    .module('IssueTracker')
    .factory('projectService', [
        '$http',
        '$q',
        'PAGE_SIZE',
        'BASE_URL',
        function issueService($http, $q,  PAGE_SIZE, BASE_URL){

            function getProjectByFilter(pageNumber, filter){
                var deferred = $q.defer();

                //projects?filter=Description.Contains("bla")&pageSize=4&pageNumber=1
                $http.get(BASE_URL + 'projects?filter=' + filter + '&pageSize=' + PAGE_SIZE + '&pageNumber='+ pageNumber)
                    .then(function(response){
                        deferred.resolve(response.data)
                    });

                return deferred.promise;
            }

            return{
                getProjectByFilter : getProjectByFilter
            }
        }
    ]);

