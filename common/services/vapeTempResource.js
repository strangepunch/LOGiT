(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("vapeTempResource", 
			["$resource",
			 vapeTempResource]);

	function vapeTempResource($resource){
		return $resource("/api/vapeTemps/:VId")
	}

}());