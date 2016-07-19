(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("tipResource", 
			["$resource",
			 tipResource]);

	function tipResource($resource){
		return $resource("/api/tips/:tipId")
	}

}());