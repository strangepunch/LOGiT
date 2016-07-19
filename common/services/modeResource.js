(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("modeResource", 
			["$resource",
			 modeResource]);

	function modeResource($resource){
		return $resource("/api/modes")
	}

}());