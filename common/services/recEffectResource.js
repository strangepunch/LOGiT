(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("recEffectResource", 
			["$resource",
			 recEffectResource]);

	function recEffectResource($resource){
		return $resource("/api/recEffects/:recEffectId")
	}

}());