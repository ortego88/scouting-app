var app = angular.module('scoutingApp', ['ngRoute','ngMap']);

app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/slides.html',
			controller: 'sliderController' 
		})

		.when('/clubs', {
			templateUrl: 'views/allTeams.html',
			controller: 'teams' 
		})

		.when('/clubs/:name', {
        templateUrl: 'views/club.html',
        controller: 'teams'
    	})

		.when('/mapa', {
			templateUrl: 'views/mapa.html',
			controller: 'teams' 
		})

		.when('/jornada', {
			templateUrl: 'views/fixture.html',
			controller: 'teams' 
		})

		.when('/versus/:id', {
			templateUrl: 'views/versus.html',
			controller: 'versusController' 
		})

		.when('/jornada/:fixCategory', {
			templateUrl: 'views/fixture2.html',
			controller: 'fixController' 
		})

		.when('/clubs/:name/:category', {
        templateUrl: 'views/teamcategory.html',
        controller: 'anotherController'
    	})
}]);

app.controller("teams", ["$scope","$http", function($scope, $http){
	
	$http.get("js/footballJson.json").success(function(data){
		$scope.teams = data;
	});

	$scope.showTeam = function(event, team) {
            $scope.selectedTeam = team;
            $scope.map.showInfoWindow('myInfoWindow', this);
        };

angular.element(document).ready(function(){
	$(".dropdown-button").dropdown();
});

	if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
 
	function onPositionUpdate(position) {
	    var lat = position.coords.latitude;
	    var lng = position.coords.longitude;
	    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
	    $http.get(url)
	        .then(function(result) {this
	            var address = result.data.results[0].formatted_address;
	            var lat1 = result.data.results[0].geometry.location.lat;
	            var lon1 = result.data.results[0].geometry.location.lng;
	            $scope.address = address;
	            $scope.lat1 = lat1;
	            $scope.lon1 = lon1;

	        });
	};

	$scope.$on('mapInitialized', function(event, map) {
	    $scope.map = map;
	});

}]);

app.controller('sliderController', ['$scope', function($scope){
angular.element(document).ready(function(){
	$('.slider').slider({full_width: true});
	$(".dropdown-button").dropdown();
});
}]);

app.controller("newController", ["$scope","$http","$routeParams", function($scope, $http, $routeParams) {
    $scope.name = $routeParams.name;}]);

app.controller("anotherController", ["$scope","$http","$routeParams", function($scope, $http, $routeParams) {
    $scope.category = $routeParams.category;}]);

app.controller("fixController", ["$scope","$http","$routeParams", function($scope, $http, $routeParams) {
    $scope.fixCategory = $routeParams.fixCategory;}]);

app.controller("versusController", ["$scope","$http","$routeParams", function($scope, $http, $routeParams) {
    $scope.id = $routeParams.id;}]);

app.directive('estNavbar',[function(){
	return {
		restrict: 'E',
		templateUrl: 'views/navbar.html'
	}
}]);

app.directive('estFooter',[function(){
	return {
		restrict: 'E',
		templateUrl: 'views/footer.html'
	}
}]);