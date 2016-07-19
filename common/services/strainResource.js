(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("strainResource", 
			["$resource",
			 strainResource]);

	function strainResource($resource){
		return $resource("/api/strains/:strainId")
	}

}());