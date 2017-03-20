'use strict';

describe('ngInterview.students module', function() {

  var $controller, scope, studentsCtrl, $q, deferred;
  var getMockStudentsService = [{
    "id": "1",
    "name": "John Bellingham",
    "city": "New York"
  },
  {
    "id": "2",
    "name": "Alice Backus",
    "city": "New York"
  },
  {
    "id": "3",
    "name": "Bob Mary",
    "city": "New York"
  }];
  var StudentsService = {
    getStudentList: function() {
        return getMockStudentsService;
    }
  };
  beforeEach(function() {
    module('ngInterview.students');
    inject(function(_$controller_) {
        $controller = _$controller_;
    });
  });

  describe('StudentsController', function() {

    beforeEach(inject(function($controller, $rootScope, _$q_) {

      $q = _$q_;

      // We use the $q service to create a mock instance of defer
      deferred = _$q_.defer();

      // Use a Jasmine Spy to return the deferred promise
      spyOn(StudentsService, 'getStudentList').and.returnValue(deferred.promise);

      scope = $rootScope.$new();
      studentsCtrl = $controller('StudentsController', {
          $scope: scope,
          StudentsService: StudentsService
      });
    }));

    it('should instantiate', inject(function() {
      expect(studentsCtrl).toBeDefined();
    }));

    it('should instantiate', function() {
      scope.activate();
      
      deferred.resolve(getMockStudentsService);

      // We have to call apply for this to work
      scope.$apply();
      //console.log("scope.students", scope.students)
      expect(scope.students.length).toBe(3);
      expect(scope.students[0].name).toBe("John Bellingham");
		  expect(scope.error).toBe(undefined);
    });

    it('should reject promise', function() {
      // This will call the .catch function in the controller
      deferred.reject("No student found");

      // We have to call apply for this to work
      scope.$apply();

      // Since we called apply, not we can perform our assertions
      expect(scope.students).toBe(undefined);
      expect(scope.error).toBe('No student found');
    });

  });

});
