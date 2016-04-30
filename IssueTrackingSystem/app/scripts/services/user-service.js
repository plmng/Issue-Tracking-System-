'use strict';
angular
    .module('IssueTracker')
    .factory('userService', [
        '$http',
        '$q',
        'BASE_URL',
        function userService ($http, $q, BASE_URL){

            /* get all registered users in the system
            * uri: users/
            */
            function getAllUsers(){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'users')
                    .then(function(response){
                      //  console.log(response.data);
                        deferred.resolve(response.data);
                    });

                return deferred.promise;
            }

            return {
                getAllUsers : getAllUsers
            }
    }]);