(function() {
	'use strict';

	angular
		.module('ngInterview.students')
		.controller('StudentsController', StudentsController);

	StudentsController.$inject = ['$scope','StudentsService'];
	function StudentsController($scope, StudentsService) {
		//Initialization 
		$scope.flagStudentList = false;
		var vm = this;

		$scope.activate = function() {
			// Initialization code goes here
			StudentsService.getStudentList().then(function(data){
		        $scope.students = data;	
		        $scope.flagStudentList = true;	
		    }, function(error){
		    	$scope.error = error;
		    });
		}

		$scope.activate();
	}
})();
