'use strict';

describe('ngInterview.api.students', function() {
    var StudentsService, $q, httpBackend;
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
    beforeEach(module('ngInterview.api.students'));

    beforeEach(inject(function(_StudentsService_, $httpBackend) {
        StudentsService = _StudentsService_;
        httpBackend = $httpBackend;
    }));


    describe('StudentsService', function() {

        it('should be instantiated', inject(function(StudentsService) {
            expect(StudentsService).toBeDefined();
        }));

        it('should expect to call get API', inject(function(_$q_, $httpBackend, $http) {

            $q = _$q_;
            $http = $http;

            $httpBackend.expectGET('api/studentslist.json').respond(200, getMockStudentsService);

            var reponseDashboard = StudentsService.getStudentList();
            //Flush the http service call
            httpBackend.flush();

            expect(reponseDashboard.$$state.value[0].name).toBe('John Bellingham');
        }));

    });

});
