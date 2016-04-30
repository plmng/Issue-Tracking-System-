'use strict';
angular
    .module('IssueTracker')

    /*
    * @name identityService
    * @desc responsible for current user data -  load, delete, return;
    */
    .factory('identityService',[
        '$http',
        '$q',
        '$location',
        'BASE_URL',
        function identityService($http, $q, $location, BASE_URL){
            var deferred = $q.defer();
            var currentUser = undefined;

            /*
            * @name getCurrentUser
            * @desc returns current user data if it is set
            */
            // TODO: current user data can be stored in localStorage and to read them from there
            function getCurrentUser(){
                if (currentUser) {
                    return $q.when(currentUser);
                }
                else {
                    return deferred.promise;
                }
            }

            /*
            * @name removeCurrentUserData
            * @desc removes currentUser data
            */
            function removeCurrentUserData(){
                currentUser = undefined;
            }

            /*
            * @name loadCurrentUserData
            * @desc exec request to receive logged in user data
            */
            function loadCurrentUserData(){
                var currentUserDataDeferred = $q.defer();

                $http.get(BASE_URL + 'Users/me')
                    .then(function(response) {
                        currentUser = response.data;
                        console.log(currentUser);
                        deferred.resolve(currentUser);
                        currentUserDataDeferred.resolve();
                    });

                return currentUserDataDeferred.promise;
            }

            function changePassword(passData){
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/ChangePassword', passData)
                    .then(function(response){
                        response['customMsg'] = "successfully changed password";
                        deferred.resolve(response);
                    });

                return deferred.promise;
            }


            function isAdmin(){
                //TODO: write function
                return false;
            }

            return {
                getCurrentUser : getCurrentUser,
                loadCurrentUserData : loadCurrentUserData,
                removeCurrentUserData : removeCurrentUserData,
                isAdmin : isAdmin,
                changePassword : changePassword
            }
        }
    ]);