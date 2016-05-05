'use strict';
angular
    .module('IssueTracker')
    .factory('authenticationService', [
        '$http',
        '$cookies',
        '$q',
        '$location',
        'identityService',
        'BASE_URL',
        function authenticationService($http, $cookies, $q, $location, identityService, BASE_URL){
            var AUTHENTICATION_COOKIE_KEY = '_IssueTracker_Authentication_Cookie_Key';


            /*
            * @name preserveUserData
            * @desc save the access token in cookie
            *       set the default Authorization headers /header will be used for all requests/
            */
            function preserveUserData(data){
                var accessToken = data.access_token;
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken)
            }

            /*
            * @name registerUser
            * @desc execute request for user registration and on success calls loginUser function
            */
            function registerUser(user){
                console.log(user);
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function(response){
                        console.log(response);
                        var loginData = {
                            Username : user.Email,
                            Password : user.Password
                        };
                        console.log(loginData);
                        loginUser(loginData)
                            .then(function(response){
                                deferred.resolve(response.data)
                            });
                    });
                return deferred.promise;
            }

            /*
            * @name loginUser
            * @desc execute login request, on success receive access token
            *       calls preserveUserData to save the access token and to set default auth headers
            *       calls identityService.requestUserProfile to load current user data
            */
            function loginUser(loginData){
                var data = 'grant_type=password&Username=' + loginData.Username +'&Password=' + loginData.Password;

                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Token', data)
                    .then(
                        function(response){
                            preserveUserData(response.data);
                            identityService.loadCurrentUserData()
                                .then(function(){
                                    deferred.resolve(response.data);
                                });
                        });
                return deferred.promise;
            }

            /*
            * @name logoutUser
            * @desc remove cookie with saved access token
            *       deletes the default authorization header
            *       deletes the currentUser data
            *       redirect to / page;
            */
            function logoutUser(){
                $cookies.remove(AUTHENTICATION_COOKIE_KEY);
                $http.defaults.headers.common.Authorization = undefined;
                identityService.removeCurrentUserData();
            }

            /*
            * @name isAuthenticated
            * @desc check if there is authentication cookie which is created on login
            *       returns boolean
            */
            function isAuthenticated(){
                return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
            }

            /*
            * @name refreshCookie
            * @desc on browser refresh sets the defaults authorization headers again and load current user data;
            */
            function refreshCookie(){
                if (isAuthenticated()){
                    $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
                    identityService.loadCurrentUserData();
                }
            }

            return {
                registerUser : registerUser,
                loginUser : loginUser,
                logoutUser : logoutUser,
                isAuthenticated : isAuthenticated,
                refreshCookie : refreshCookie
            }
        }]);