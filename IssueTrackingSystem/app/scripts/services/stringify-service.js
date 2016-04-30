'use strict';
angular
    .module('IssueTracker')
    .factory('stringifyService', function(){
        /*
        * from collection:
        * create array all onj.property of values
        * returns joined values to string
        */
         function getCommaSeparatedString(collection, property){
             var arr = [];
             collection.map(function(obj){
                    arr.push(obj[property]);
                 });
             return arr.join();
         }

        /*
         * from string of values separated by comma:
         * for evry value creates object with property and sets it's value
         * return array of created objects
         * */
        function getCollection(str){
            var arr = [];
            str.split(',').forEach(function(element){
                if(element.trim()){
                    arr.push({
                            Name : element.trim()
                    });
                }
            });
            return arr;
        }

        return {
            getCommaSeparatedString : getCommaSeparatedString,
            getCollection : getCollection
        }
    });