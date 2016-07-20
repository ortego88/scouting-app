var app = angular.module('scoutingApp', [])

app.controller("teams", ["$scope","$http", function($scope, $http){
	$http.get("js/footballJson.json").success(function(data){
		$scope.teams = data;
	});
}]);