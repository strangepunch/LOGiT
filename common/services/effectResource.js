(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("effectResource", 
			["$resource",
			 effectResource]);

	function effectResource($resource){
		return $resource("/api/effects/:effectId")
	}

}());