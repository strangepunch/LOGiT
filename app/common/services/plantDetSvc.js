(function(){
	"use strict";

	angular
		.module("growOpApp")

		.service('plantDetSvc', function($http, $q, localStorageService) {
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
    		var _currentTimestamp = {hr: _hr, min: _min, sec: _sec, mSec: _mSec};
    		//var _currentDate = YYYY + "/" + MM + "/" + DD;
    		var _currentDate = {year: _YYYY, month: _MM, day: _DD};

      		/**---local variables---**/
      		var vm = this;

      		//basic plant info from input variables
      		var _name = "";
      		var _company = "";
      		var _stage = "";
      		var _start = "";
      		var _end = "";
      		var _currentTime = "";
      		var _image = "images/strains/acapulco-gold_100x100.jpg";

      		//array variables
      		var _itemArray = [];
      		//permanent set of pruning info
      		vm.Pruning =[{
			    "name": "FIM",
			    "tier": 0,
			    "times": 0,
			    "checked": false
		    }, 
		    {	"name": "Top",
		      	"tier": 0,
		      	"times": 0,
		      	"checked": false
		    }, 
		    {	"name": "sCrop",
		      	"tier": 0,
		      	"times": 0,
		      	"checked": false
		    }, 
		    {	"name": "LST",
		      	"tier": 0,
		      	"times": 0,
		      	"checked": false
		    }];
      		var _tempPlantArray = { plant: 0, 
							     	name: 'Empty',
							    	desc: '(company name)',
							     	stage: 'Seedling',
							     	start: _currentDate,
							     	end: 'N.A.',
							     	time: _currentTimestamp,
							     	img:'images/strains/acapulco-gold_100x100.jpg',  
							     	plantData: {plantType: 'search value',
												plantWater: 0,
												plantPPM: 0,
												plantPH: 0,
												plantHeight: 0,
												plantCond: 'good',
												lightType: 'CFL',
												lightHt:0,
												pruning: vm.Pruning,
												plantMsg: '',
												entryTime: _currentTimestamp,
						      					entryDate: _currentDate}
								  };

			//_itemArray.push(_tempPlantArray);
			//console.log("initial: ", _itemArray);
			//localStorageService.set('localPlantStorage', _itemArray);

      		/**---function declarations---**/
      		//add a new plant
      		vm.addPlant = addPlant;
      		//remove a plant
      		vm.removePlant = removePlant;
      		//get one plant's info by name
      		//vm.getAPlant = getPlant;
      		//edit one plant's name and info (image, phase, etc)
      		//vm.editPlant = editPlant;
      		//update one plant's records (pH, PPM, height, etc)
      		//vm.updatePlant = updatePlant;

      		//sort array of inputs in to each plant's local storage space by plant name
      		//save changes to localstorage
      		
      		//save full plants structure array to local storage
      		vm.storePlantInLocal = storePlantInLocal;
      		//get full plants structure array from local storage
      		vm.getPlantInLocal = getPlantInLocal;
      		//return current array of plants
      		vm.returnPlantArray = returnPlantArray;

      		//check if ID of plant exist already
      		vm.Exist = Exist;
			/**---function---**/
			//add a new plant
      		function addPlant(name, company, stage, start, ctime){

      			console.log("name: " + name + ", company: " + company + ", stage: " + stage + ", start: " + start);

      			_name = name;
      			_company = company;
      			_stage = stage;
      			_start = start;
      			_end = _currentDate; //need to calculate
      			_currentTime = ctime;

      			//eventually need to code find image link from name
   				var nameNoSpace = _name
      			_image = "images/strains/" + nameNoSpace + ".jpg";

      			_tempPlantArray = { plant: 0, 
							     	name: _name,
							    	desc: _company,
							     	stage: _stage,
							     	start: _start,
							     	end: _end,
							     	time: _currentTime,
							     	img: _image,
							     	plantType: 'search value',  
							     	plantData: {
												plantWater: 0,
												plantPPM: 0,
												plantPH: 0,
												plantHeight: 0,
												plantCond: 'good',
												lightType: 'CFL',
												lightHt:0,
												pruning: vm.Pruning,
												plantMsg: '',
												entryTime: _currentTimestamp,
						      					entryDate: _currentDate}
								  };

				//get plant array from local storage					  
				vm.getPlantInLocal();
				//make changes to the array
				if(_itemArray.length == 0){
					_itemArray.push(_tempPlantArray);
  				}else{
  					var idCounter = 0;
  					while (vm.Exist(idCounter) == true) {
			        	idCounter = idCounter + 1;
			        }
					_tempPlantArray.plant = idCounter;
					_itemArray.splice(idCounter, 0, _tempPlantArray);
  				}
  				//store array back to local storage
  				vm.storePlantInLocal();
      		}

      		//remove a plant
      		function removePlant(ID){
      			vm.getPlantInLocal();
      			for(var obj in _itemArray){
      				if(_itemArray[obj].plant == ID){
      					_itemArray.splice(obj, 1);
      				}
      			}
      			vm.storePlantInLocal();
      		}

			//save full plants structure array to local storage
		    function storePlantInLocal(){
				if(localStorageService.isSupported) {
					console.log("SVC storePlantInLocal, _itemArray:", _itemArray)
					localStorageService.set('localPlantStorage', _itemArray);
				}else{
					alert("Sorry, local storage not supported!");
				}
		    }

		    //get full plants structure array from local storage
		    function getPlantInLocal(){
	    		if(localStorageService.isSupported) {
		        	if(localStorageService.get('localPlantStorage') != null){
		        		console.log("SVC getPlantInLocal: ", localStorageService.get('localPlantStorage'));
			        	_itemArray = localStorageService.get('localPlantStorage');
			        }else{
			        	_itemArray = [];
			        }
		        }else{
		          	alert("Sorry, local storage not supported!");
		        }
		    }

		    //return current array of plants
      		function returnPlantArray(){
      			console.log("returnPlantArray pulling data...");
      			vm.getPlantInLocal();
      			return _itemArray;
      		}

		    //check if ID of plant exist already
		    function Exist(num) {
			    for (var i = 0; i < _itemArray.length; i++) {
			        if (_itemArray[i].plant === num) {
			          	return true;
			        }
			    }
			    return false;
		    }
			
		})
}());