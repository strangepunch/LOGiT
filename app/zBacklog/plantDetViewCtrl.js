(function () {
	angular
			.module("growOpApp")
			.controller("PlantDetViewCtrl",
						["$scope",
						 "$stateParams",
						 "localStorageService",
							PlantDetViewCtrl]);
	
	function PlantDetViewCtrl($scope, $stateParams, localStorageService){
		var vm = this;
    	
		var d = new Date();
		var hr = d.getHours();
		var min = d.getMinutes();
		var sec = d.getSeconds();
		var mSec = d.getMilliseconds();

    	vm.CurrentTime = hr + ":" + min + ":" + sec + ":" + mSec;

    	vm.PlantNameTest = $stateParams.plantName;

	}

}());