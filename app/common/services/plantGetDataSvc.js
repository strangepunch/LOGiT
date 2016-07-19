(function(){
	"use strict";

	angular
		.module("growOpApp")

		.service('plantGetDataSvc', function($http, $q, masterPlantLogResource) {
			/**---time variables--**/
			var d = new Date();
			//time
    		var _hr = d.getHours();
    		var _min = d.getMinutes();
    		var _sec = d.getSeconds();
    		var _mSec = d.getMilliseconds();
    		//date
    		var _MM = d.getMonth() + 1;
    		var _DD = d.getDate();
    		var _YYYY = d.getFullYear();
    		//combination
    		var _currentTimestamp = _hr + ":" + _min + ":" + _sec + ":" + _mSec;
    		//var _currentDate = YYYY + "/" + MM + "/" + DD;
    		var _currentDate = {year: _YYYY, month: _MM, day: _DD};

      		/**---local variables---**/
      		var vm = this;

      		/**---Get Data FROM: masterPlantLogResource---**/
      		//local variables
      		var _FULLDATA_ = [];
      		//var _WEEKDATA_ = [];
      		var _WEEKDATAPERPLANT_ = [];
      		//var _DAYDATA_ = [];       	

      		/**---function declarations---**/
      
      		//build and return the whole array
      		vm.buildFullArray = buildFullArray;
      		//build and return a week's array for all plants
      		vm.getWeekArrayForAllPlants = getWeekArrayForAllPlants;
      		//build and return a week's array for each plant
      		vm.getWeekArrayForEachPlant = getWeekArrayForEachPlant;
      		//build and return an array of daily entrie for each/all plants
      		vm.getDailyPlantEntries = getDailyPlantEntries;
      		//build and return a plant's full entry array
      		//build and return a plant's week entry array
      		//build and return 

			/**---function---**/
			//build and return the whole array
			function buildFullArray(){
				return new Promise(function(resolve,reject){
					masterPlantLogResource.query(function(data){
						if(data != null){
							_FULLDATA_ = data;
							console.log("build_FULLDATA_: ", _FULLDATA_);
							resolve(_FULLDATA_);
						}else{
							reject("empty array...");
						}
						
					});
				});
			}
      		//build and return a week's array for all plants
      		function getWeekArrayForAllPlants(weekNum){
      			return new Promise(function(resolve,reject){
					masterPlantLogResource.query(function(data){
						var _WEEKDATA_ = []; //_WEEKDATA_.splice(0, _WEEKDATAPERPLANT_.length);
						if(data != null){
							var plantsArray = data[0].plants;

							for(var i = 0; i < plantsArray.length; i++){

								for(var x = 0; x < plantsArray[i].plant_measurements.length; x++){

									if(plantsArray[i].plant_measurements[x].week == weekNum){

										_WEEKDATA_.push({"pID":plantsArray[i].plantID, "data":plantsArray[i].plant_measurements[x].entries});
									}
								}
							}
							console.log("build_WEEKDATA_: ", _WEEKDATA_);
							resolve(_WEEKDATA_);
						}else{
							reject("empty array...");
						}
					});
				});
      		}
      		//build and return a week's array for each plant
      		function getWeekArrayForEachPlant(ID, weekNum){
      			_WEEKDATAPERPLANT_.splice(0, _WEEKDATAPERPLANT_.length);
      			return new Promise(function(resolve,reject){
					masterPlantLogResource.query(function(data){
						if(data != null){
							var plantsArray = data[0].plants;

							for(var i = 0; i < plantsArray.length; i++){

								if(plantsArray[i].plantID == ID){
									console.log("ID: ", ID);

									for(var x = 0; x < plantsArray[i].plant_measurements.length; x++){

										if(plantsArray[i].plant_measurements[x].week == weekNum){

											_WEEKDATAPERPLANT_.push({"pID":plantsArray[i].plantID, "data":plantsArray[i].plant_measurements[x].entries});
										}
									}
								}
							}
							console.log("build_WEEKDATAPERPLANT_: ", _WEEKDATAPERPLANT_);
							resolve(_WEEKDATAPERPLANT_);
						}else{
							reject("empty array...");
						}
					});
				});
      		}
      		//build and return an array of daily entrie for each/all plants
      		//leaving ID of the plant empty(null) gets all plants
      		function getDailyPlantEntries(weekNum, dayNum, ID){
      			return new Promise(function(resolve, reject){
      				masterPlantLogResource.query(function(data){
      					var _DAYDATA_ = []; //_DAYDATA_.splice(0, _DAYDATA_.length);
						if(data != null){
							var plantsArray = data[0].plants;

							for(var i = 0; i < plantsArray.length; i++){

								if(ID != null && ID != ""){
									console.log("ID: ", ID);
									if(plantsArray[i].plantID == ID){

										for(var x = 0; x < plantsArray[i].plant_measurements.length; x++){

											if(plantsArray[i].plant_measurements[x].week == weekNum){

												for(var y = 0; y < plantsArray[i].plant_measurements[x].entries.length; y++){

													if(plantsArray[i].plant_measurements[x].entries[y].day == dayNum){

														_DAYDATA_.push({"pID":plantsArray[i].plantID, "data":plantsArray[i].plant_measurements[x].entries[y].data});
														console.log("build_DAYDATA_: ", _DAYDATA_);
														resolve(_DAYDATA_);
													}
												}
											}
										}
									}
								} else {

									for(var x = 0; x < plantsArray[i].plant_measurements.length; x++){

										if(plantsArray[i].plant_measurements[x].week == weekNum){

											for(var y = 0; y < plantsArray[i].plant_measurements[x].entries.length; y++){

												if(plantsArray[i].plant_measurements[x].entries[y].day == dayNum){

													_DAYDATA_.push({"pID":plantsArray[i].plantID, "data":plantsArray[i].plant_measurements[x].entries[y].data});
													console.log("build_DAYDATA_: ", _DAYDATA_);
													resolve(_DAYDATA_);
												}
											}
										}
									}
								}
							}
						}else{
							reject("empty array...");
						}
					});
      			});
      		}
			
			
		})
}());