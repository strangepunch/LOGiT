(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("detailModeResource", 
			["$resource",
			 detailModeResource]);

	function detailModeResource($resource){
		return $resource("/api/detailModes")
	}

}());