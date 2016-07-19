(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("tempResource", 
			["$resource",
			 tempResource]);

	function tempResource($resource){
		return $resource("/api/temperatures")
	}

}());