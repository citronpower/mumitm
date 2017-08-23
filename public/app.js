var app = angular.module('app', ['ngRoute', 'ngStorage','ngAnimate', 'ngSanitize', 'ngFileUpload']);


app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
		.when("/home", {
			templateUrl : "templates/home.html"
		})
		.when("/login", {
			templateUrl : "templates/login.html"
		})
		.when("/logout", {
			templateUrl : "templates/login.html"
		})
		.when("/ips", {
			templateUrl : "templates/ip.html"
		})
		.otherwise({redirectTo:'/home'});
}]);
