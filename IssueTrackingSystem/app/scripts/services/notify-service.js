'use strict';
angular
    .module('IssueTracker')
    .factory('notifyService', [
        'toastr',
        function notifyService (toastr){
            toastr.options = {"positionClass": "toast-bottom-right"};
            function success(msg, customTitle){
                var title = customTitle ? customTitle : 'Successfully';
                toastr.success(msg, title);
            }

            function info(msg, title){
                toastr.info(msg, title)
            }

            function warning(msg, title){
                toastr.warning(msg, title)
            }

            function error(msg, title){
                toastr.error(msg, title)
            }

            return {
                success : success,
                info : info,
                warning : warning,
                error : error
            }
        }]);
