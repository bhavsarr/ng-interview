(function() {
  'use strict';

  angular
    .module('ngInterview.api.students')
    .service('StudentsService', StudentsService);

  StudentsService.$inject = ['$http', '$q'];

  function StudentsService($http, $q) {

    /**
     * Exposed functions
     */

    this.getName = getName; // This function serves no purpose. It's just here as an example.
    this.getStudentList = getStudentList;


    /**
     * Implementations
     */

    function getName() {
        return 'StudentsService';
    }

    function getStudentList() {
      var deferred = $q.defer();
      $http.get("api/studentslist.json").then(function(response) {
          deferred.resolve(response.data);
      }, function() {
          deferred.reject('No student found');
      });
      return deferred.promise;
    }

  }
})();
