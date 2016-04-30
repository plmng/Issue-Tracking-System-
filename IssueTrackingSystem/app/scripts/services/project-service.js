'use strict';
angular
    .module('IssueTracker')
    .factory('projectService', [
        '$http',
        '$q',
        'identityService',
        'PAGE_SIZE',
        'BASE_URL',
        function projectService($http, $q, identityService, PAGE_SIZE, BASE_URL){

            function getProjectsByUserId(pageNumber){
                var deferred = $q.defer();

                identityService.getCurrentUser()
                    .then(function(user){
                        var idFilter = 'Lead.Id="'+user.Id+'"';
                        getProjectByFilter(pageNumber, idFilter)
                            .then(function (response){
                               deferred.resolve(response);
                            })
                    });
                return deferred.promise;
            }

            function getProjectByFilter(pageNumber, filter){

                var deferred = $q.defer();
                var itemsPerPage = PAGE_SIZE + 2;

                $http.get(BASE_URL + 'projects?filter=' + filter + '&pageSize=' + itemsPerPage + '&pageNumber='+ pageNumber)
                    .then(function(response){
                        deferred.resolve(response.data);
                    });

                return deferred.promise;
            }

            /*
            * gets all project data by Id
            * http://softuni-issue-tracker.azurewebsites.net/projects/2
            */
            function getProjectById(id){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + id)
                    .then(function(response){
                       deferred.resolve(response.data);
                    });
                return deferred.promise;
            }

            /*
            * gets all projects issues by given project id
            * //projects/1/issues
            */
            function getIssuesByProjectId(id){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + id + '/issues')
                    .then(function(response){
                       deferred.resolve(response.data);
                    });

                return deferred.promise;
            }

            /*
            * edit project
            * [PUT] Projects/{id}
            * •	Purpose: Edits a project by a given id
            * •	Security: Admin, Lead of project
            * •	Body parameters:
            * •	Same as [POST] Projects/, except for ProjectKey which cannot be edited
            * •	Returns: The edited project
            */

            function putEditedProject(id, projectToEdit){
                var deferred = $q.defer();

                $http.put(BASE_URL + 'projects/' + id, projectToEdit)
                    .then(function(response){
                        console.log('edit project from service - response received');
                        console.log(response);
                        deferred.resolve(response.data);
                    });
                return deferred.promise;
            }

            function getAllProjectsPaged(pageNumber, filter){
                var deferred = $q.defer();
                getProjectByFilter(pageNumber, filter)
                    .then(function (response){
                        deferred.resolve(response);
                    });
                return deferred.promise;
            }

            return{
                getProjectByFilter : getProjectByFilter,
                getProjectsByUserId : getProjectsByUserId,
                getProjectById : getProjectById,
                getIssuesByProjectId : getIssuesByProjectId,
                putEditedProject : putEditedProject,
                getAllProjectsPaged : getAllProjectsPaged
            }
        }
    ]);

