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
        //    var currentUser = undefined;

            /*
            * @name getCurrentUser
            * @desc returns current user data if it is set
            */
            // TODO: current user data can be stored in localStorage and to read them from there
            function getCurrentUser(){
                var currentUser = sessionStorage['currentUser'];
                if (currentUser) {
                    return JSON.parse(sessionStorage['currentUser']);
                }
            }

            /*
            * @name removeCurrentUserData
            * @desc removes currentUser data
            */
            function removeCurrentUserData(){
                delete sessionStorage['currentUser'];
            }

            /*
            * @name loadCurrentUserData
            * @desc exec request to receive logged in user data
            */
            function loadCurrentUserData(){
                var currentUserDataDeferred = $q.defer();

                $http.get(BASE_URL + 'Users/me')
                    .then(function(response) {
                        sessionStorage['currentUser'] = JSON.stringify(response.data);
                        deferred.resolve(response.data);
                        currentUserDataDeferred.resolve();
                    });

                return currentUserDataDeferred.promise;
            }

            function changePassword(passData){
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/ChangePassword', passData)
                    .then(function(response){
                        deferred.resolve(response);
                    });

                return deferred.promise;
            }




            return {
                getCurrentUser : getCurrentUser,
                loadCurrentUserData : loadCurrentUserData,
                removeCurrentUserData : removeCurrentUserData,
                changePassword : changePassword
            }
        }
    ]);