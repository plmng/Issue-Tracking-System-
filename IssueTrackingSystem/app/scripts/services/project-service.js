'use strict';
angular
    .module('IssueTracker')
    .factory('projectService', [
        '$http',
        '$q',
        '$linq',
        'identityService',
        'DASHBOARD_PROJECTS_PAGE_SIZE',
        'BASE_URL',
        function projectService($http, $q, $linq, identityService, DASHBOARD_PROJECTS_PAGE_SIZE, BASE_URL){
            var currentUser = identityService.getCurrentUser();

            function getProjectsByUserId(pageNumber){
                var deferred = $q.defer();
                var idFilter = 'Lead.Id="'+currentUser.Id+'"';
                getProjectByFilter(pageNumber, idFilter)
                    .then(function (response){
                        deferred.resolve(response);
                    });

                return deferred.promise;
            }

            function getProjectByFilter(pageNumber, filter, fixedPageSize){
                var deferred = $q.defer();
                var itemsPerPage;
                if(fixedPageSize == undefined){
                    itemsPerPage = DASHBOARD_PROJECTS_PAGE_SIZE
                }else{
                    itemsPerPage = fixedPageSize;
                }

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


            function getAllUserRelatedProjects(pageNumber){
                var deferred = $q.defer();
                var maxPageSize = 2147483646;

                    _getAllProjectsOfAssignedIssues(maxPageSize, 1)
                        .then(function(projectsFromAssignedIssues){
                            var idFilter = 'Lead.Id="'+currentUser.Id+'"';
                            getProjectByFilter(1, idFilter, maxPageSize)
                                .then(function (response){
                                    var leadedProjects = response.Projects;

                                    var allUserRelatedProjects = $linq.Enumerable()
                                        .From(leadedProjects)
                                        .Union(projectsFromAssignedIssues)
                                        .Distinct(function (x) {
                                            return x.Id;
                                        })
                                        .ToArray();
                                    allUserRelatedProjects.sort(function(a,b){
                                        var nameA = a.Name.toLowerCase();
                                        var nameB = b.Name.toLowerCase();
                                        if (nameA < nameB)
                                            return -1;
                                        if (nameA > nameB)
                                            return 1;
                                        return 0
                                    });

                                    deferred.resolve(allUserRelatedProjects);
                                });
                        });
                    return deferred.promise;
            }

            function _getAllProjectsOfAssignedIssues(pageSize,pageNumber){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'issues/me?orderBy=DueDate desc, IssueKey&pageSize='+pageSize+'&pageNumber='+pageNumber)
                    .then(function(response){
                        var assignedIssues = response.data.Issues;

                        var projectsOfAssignedIssues = $linq.Enumerable()
                            .From(assignedIssues)
                            .Select(function (x) {
                                return {
                                    Id: x.Project.Id,
                                    Name: x.Project.Name
                                };
                            })
                            .Distinct(function (x) {
                                return x.Id;
                            })
                            .ToArray();

                        deferred.resolve(projectsOfAssignedIssues)
                    });
                return deferred.promise;
            }

            function addNewProject(project, succes, error) {
                return $http.post(BASE_URL + 'projects',project,{
                        headers: {'Content-Type': 'application/json'}
                    })
                    .then(succes, error);
            }

            function getAllProjects() {
                var deferred = $q.defer();
                $http.get(BASE_URL + 'projects')
                    .then(function(response){
                        deferred.resolve(response.data)
                    });
                return deferred.promise;
            }
            return{
                getProjectByFilter : getProjectByFilter,
                getProjectsByUserId : getProjectsByUserId,
                getProjectById : getProjectById,
                getIssuesByProjectId : getIssuesByProjectId,
                putEditedProject : putEditedProject,
                getAllProjectsPaged : getAllProjectsPaged,
                getAllUserRelatedProjects : getAllUserRelatedProjects,
                addNewProject : addNewProject,
                getAllProjects : getAllProjects
            }
        }
    ]);

