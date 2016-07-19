(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("masterPlantLogResource", 
			["$resource",
			 masterPlantLogResource]);

	function masterPlantLogResource($resource){
		return $resource("/api/plantLog")
	}

}());