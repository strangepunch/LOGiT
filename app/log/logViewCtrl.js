(function () {
	angular
			.module("growOpApp")
			.controller("LogViewCtrl",
						["$scope",
						 "localStorageService",
						 "plantDetSvc",
							LogViewCtrl]);
	
	function LogViewCtrl($scope, localStorageService, plantDetSvc){
		var vm = this;
		/**---time variables--**/
    	//time
		var d = new Date();
		var _hr = d.getHours();
		var _min = d.getMinutes();
		var _sec = d.getSeconds();
		var _mSec = d.getMilliseconds();

    	vm.CurrentTime = _hr + ":" + _min;

    	//date
    	var _MM = d.getMonth() + 1;
    	var _DD = d.getDate() ;
    	var _YYYY = d.getFullYear();

    	//time
    	var _HR = d.getHours();
		var _MIN = d.getMinutes();

    	/**---local variables---**/
    	
    	//set up a place to store the plant objects 
    	vm.currentLogList = [];
    	
    	//temp storage for field placeholder text - placeholders 
    	vm.placeholders = {
		    logMethod: "Today when I...",
		    logStrain: "Some Cannabis called:",
		    logEffect: "I felt...",
		    logFxRequest: "I'd like to feel..." //temporary placeholder for effect selection
	    };

    	//input variables
    	vm.inputData = {
			logMethod: null,
			logStrain: null,
			logEffect: null,
			logDate: {year: _YYYY, month: _MM, day: _DD},
			logTime: {hr: _hr, min: _min, sec: _sec, mSec: _mSec},
			logFxRequest: null //temp placeholder for effect screen selection
	    };
	    
	    //btn variables
	    vm.addButtonStyle = "btn-primary";

	    /**---function declarations---**/
	    //get plant array
	    vm.getFullLogsArray = getFullLogsArray;
	    //add plant button
	    vm.addPlantBTN = addPlantBTN;
	    //clear plant inputs
	    vm.clearFieldsBTN = clearFieldsBTN;
	    //remove plant
	    vm.deletePlantBTN = deletePlantBTN;
	    //refresh screen
	    vm.refreshScreen = refreshScreen;

	    /**---function---**/
	    //get plant array
	    function getFullLogsArray(){
	    	vm.currentLogList.splice(0,vm.currentLogList.length);
	    	for(var obj in plantDetSvc.returnPlantArray()){
	    	 	vm.currentLogList.splice(obj,vm.currentLogList.length, plantDetSvc.returnPlantArray()[obj]);
	    	}
	    	//vm.currentLogList = plantDetSvc.returnPlantArray();
		    console.log("vm.currentLogList ", vm.currentLogList);  	
	    }

	    //add plant button
	    function addPlantBTN(){
	    	//console.log("vm.inputData", vm.inputData);
	    	if(!$scope.addPlantForm.$pristine) {
	    		vm.addButtonStyle = "btn-primary";
	    		if(vm.inputData.logMethod != null && 
	    			vm.inputData.logStrain != null &&
	    			vm.inputData.logEffect != null){
				        plantDetSvc.addPlant(vm.inputData.logMethod, 
				        					 vm.inputData.logStrain, 
				        					 vm.inputData.logEffect, 
				        					 vm.inputData.logDate, 
				        					 vm.inputData.logTime);
				    vm.addButtonStyle = "btn-success";
		        	vm.errorMessage = "Personal tuning complete. ";
		        	refreshScreen();
				}else{
					alert("Missing selection!");
		        	vm.addButtonStyle = "btn-danger";
				}
		    }else{
		        alert("No entry!");
		        vm.addButtonStyle = "btn-danger";
		    }
		    vm.getFullLogsArray();
		    vm.clearFieldsBTN();
	    }

	    //clear plant inputs
	    function clearFieldsBTN(){
	    	vm.inputData = {
				logMethod: null,
				logStrain: null,
				logEffect: null,
				logDate: {year: _YYYY, month: _MM, day: _DD},
				logTime: {hr: _hr, min: _min, sec: _sec, mSec: _mSec}
		    };
	    }

	    //remove plant from array
	    function deletePlantBTN(ID){
	    	console.log("ID: ", ID);
	    	plantDetSvc.removePlant(ID);
	    	vm.getFullLogsArray();
	    }

	    //refresh the screen after adding log
	    function refreshScreen(){
		    setTimeout(function(){
		    	vm.getFullLogsArray(); 
		    	vm.errorMessage = ""; 
		    	vm.addButtonStyle = "btn-primary"; 
		    	$scope.$apply();
		    }, 3000);
	    }

	    /**---Run Function---**/
	    vm.getFullLogsArray();
    	vm.logMethod = "Add a new log"
	}

}());