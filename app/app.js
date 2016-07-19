(function () {
	"use strict";
	var app = angular.module("growOpApp",
							["common.services",
							 "ui.router",
							 "ui.mask",
							 "ui.bootstrap",
							 "ui.unique",
							 "LocalStorageModule",
							 "productResourceMock"]);
	//error handling
	app.config(function($provide){
		$provide.decorator("$exceptionHandler",
			["$delegate",
				function ($delegate) {
					return function (exception, cause) {
						exception.message = "Please contact the help desk (and pray)! \n Message: " + exception.message;

						$delegate(exception, cause);
						alert(exception.message);
					};
				}]);
	});

	app.config(["$stateProvider", "$urlRouterProvider",
				
				function ($stateProvider, $urlRouterProvider) {
					
					//default route provider
					$urlRouterProvider.when("/", "/log");
					$urlRouterProvider.otherwise("/");

					$stateProvider
						//Entry View
						.state("/", {
							url: "/",
							templateUrl: "app/log/logAddView.html",
							controller: "LogViewCtrl",
							controllerAs: "vm"
						})

						//main log add view
						.state("log", {
							url: "/log",
							templateUrl: "app/log/logAddView.html",
							controller: "LogViewCtrl",
							controllerAs: "vm"
						})

						//Plant Progress View
						.state("plant", {
							url: "/plants",
							templateUrl: "app/logView/plantView.html",
							controller: "LogViewCtrl",
							controllerAs: "vm"
						})

				}]

	);

}());