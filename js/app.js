var app = angular.module('scoutingApp', ['ngRoute','ngMap']);

app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/teams', {
			templateUrl: 'views/allTeams.html',
			controller: 'teams' 
		})

		.when('/once', {
			templateUrl: 'views/team.html',
			controller: 'teams' 
		})

		.when('/mapa', {
			templateUrl: 'views/mapa.html',
			controller: 'teams' 
		})
}]);

app.controller("teams", ["$scope","$http", function($scope, $http){
	$http.get("js/footballJson.json").success(function(data){
		$scope.teams = data;
	});

	if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
 
	function onPositionUpdate(position) {
	    var lat = position.coords.latitude;
	    var lng = position.coords.longitude;
	    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
	    $http.get(url)
	        .then(function(result) {
	            var address = result.data.results[0].formatted_address;
	            var lat1 = result.data.results[0].geometry.location.lat;
	            var lon1 = result.data.results[0].geometry.location.lng;
	            $scope.address = address;
	            $scope.lat1 = lat1;
	            $scope.lon1 = lon1;
	            console.log(position)
	            console.log(position.coords.longitude)

	        });
	};

	$scope.$on('mapInitialized', function(event, map) {
	    $scope.map = map;
	});

}]);



app.directive('estNavbar',[function(){
	return {
		restrict: 'E',
		templateUrl: 'views/navbar.html'
	}
}]);