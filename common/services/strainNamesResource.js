(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("strainNamesResource", 
			["$resource",
			 strainNamesResource]);

	function strainNamesResource($resource){
		return $resource("/api/strainNames/:strainId")
	}

}());