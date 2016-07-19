(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("tasteResource", 
			["$resource",
			 tasteResource]);

	function tasteResource($resource){
		return $resource("/api/tastes/:tasteId")
	}

}());