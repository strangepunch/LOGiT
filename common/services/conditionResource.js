(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("conditionResource", 
			["$resource",
			 conditionResource]);

	function conditionResource($resource){
		return $resource("/api/conditions/:conditionId")
	}

}());