'use strict';
angular
    .module('IssueTracker')
    .factory('labelService', [
        '$q','$http','BASE_URL',
        function labelService($q, $http, BASE_URL){

            function getAllLabels() {
                var deferred = $q.defer();
                $http.get(BASE_URL+'labels/?filter=')
                    .then(function(response){
                        deferred.resolve(response.data)
                    });
                return deferred.promise;
            }

            function getByFilter(filter){
                var deferred = $q.defer();
                $http.get(BASE_URL+'labels/?filter='+filter)
                    .then(function(response){
                        deferred.resolve(response.data)
                    });
                return deferred.promise;
            }
            return{
                getAllLabels : getAllLabels,
                getByFilter : getByFilter
            }
        }
    ]);