(function () {
	"use strict";

	angular
		.module("common.services")
		.factory("vTipResource", 
			["$resource",
			 vTipResource]);

	function vTipResource($resource){
		return $resource("/api/vTips/:VTipId")
	}

}());