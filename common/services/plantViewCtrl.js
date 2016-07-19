(function () {
	angular
			.module("growOpApp")
			.controller("PlantViewCtrl",
						["$scope",
						 "localStorageService",
						 "$cookies",
						 "modeResource",
						 "tasteResource",
						 "recEffectResource",
						 "strainNamesResource",
						 "productResource",
						 "strainResource",
						 "plantDetSvc",
							PlantViewCtrl]);
	
	function PlantViewCtrl($scope, localStorageService, plantDetSvc){
		var vm = this;
		/**---time variables--**/
    	//time
		var d = new Date();
		var hr = d.getHours();
		var min = d.getMinutes();
		var sec = d.getSeconds();
		var mSec = d.getMilliseconds();

    	vm.CurrentTime = hr + ":" + min;

    	//date
    	var _MM = d.getMonth() + 1;
    	var _DD = d.getDate() ;
    	var _YYYY = d.getFullYear();

    	//time
    	var _HR = d.getHours();
		var _MIN = d.getMinutes();

    	/**---local variables---**/
		
    	//set up a place to store the plant objects 
    	vm.currentPlantsList = [];
    	
    	// temp storage for field placeholder text - placeholders 
    	vm.placeholders = {
		    plantName: "how you consumed cannabis..",
		    plantCompany: "choose the strain",
		    plantStage: "How did you feel?"
	    };

	    //plant status variable
	    vm.plantStatusData = {
	    	plantName: null,
	    	plantHealth: "Euphoric" //insert function to get actual plant stage here
	    };

    	//input variables
    	vm.inputData = {
			plantName: null,
			plantCompany: null,
			plantDate: {year: _YYYY, month: _MM, day: _DD},
			plantStage: "My Strain"
	    };
	    
	    //btn variables
	    vm.addButtonStyle = "btn-primary";

	    /**---function declarations---**/
	    //get plant array
	    vm.getFullPlantsArray = getFullPlantsArray;
	    //add plant button
	    vm.addPlantBTN = addPlantBTN;
	    //clear plant inputs
	    vm.clearFieldsBTN = clearFieldsBTN;
	    //remove plant
	    vm.deletePlantBTN = deletePlantBTN;

	    /**---function---**/
	    //get plant array
	    function getFullPlantsArray(){
	    	vm.currentPlantsList.splice(0,vm.currentPlantsList.length);
	    	for(var obj in plantDetSvc.returnPlantArray()){
	    	 	vm.currentPlantsList.splice(obj,vm.currentPlantsList.length, plantDetSvc.returnPlantArray()[obj]);
	    	}
	    	//vm.currentPlantsList = plantDetSvc.returnPlantArray();
		    console.log("vm.currentPlantsList ", vm.currentPlantsList);  	
	    }

	    //add plant button
	    function addPlantBTN(){
	    	console.log("vm.inputData", vm.inputData);
	    	if(!$scope.addPlantForm.$invalid) {
	    		vm.addButtonStyle = "btn-primary";
		        if(vm.inputData.plantCompany == null){
		        	vm.inputData.plantCompany = "(N.A.)"
		        }
		        plantDetSvc.addPlant(vm.inputData.plantName, vm.inputData.plantCompany, vm.inputData.plantStage, vm.inputData.plantDate);
		        vm.addButtonStyle = "btn-success";
		        vm.errorMessage = "Plant Added. refreshing screen...";
		    }else{
		        alert("No entry!");
		        vm.addButtonStyle = "btn-danger";
		    }
		    vm.getFullPlantsArray();
		    //vm.clearFieldsBTN();
	    }

	    //clear plant inputs
	    function clearFieldsBTN(){
	    	vm.inputData = {
				plantName: null,
				plantCompany: null,
				plantDate: {year: _YYYY, month: _MM, day: _DD},
				plantStage: "Seedling"
		    };
	    }

	    //remove plant from array
	    function deletePlantBTN(ID){
	    	console.log("ID: ", ID);
	    	plantDetSvc.removePlant(ID);
	    	vm.getFullPlantsArray();
	    }

	    /**---Run Function---**/
	    vm.getFullPlantsArray();

	    //temporary solution. refresh screen to see updated array
    	vm.PlantName = "Add a new log"

    	//code from Tempz
    	//Store which page your where on, before going to details mode, in Local Storage/Cookie
		if(localStorageService.isSupported) {
	    	localStorageService.set('whereAmIFrom', "Rec");
	    	localStorageService.set('setDetail', "Flavor");
	    }else{
	    	$cookies.whereAmIFrom = "Rec";
			$cookies.setDetail = "Flavor";
	    }
	    
		//set the ng-style of the mode selection
		vm.styleMed={"font-size": "0.8em"};
		vm.styleRec={"color":"Red","font-size": "1.1em"};

		//initiate center image for first time entry
		vm.centerImage = "images/rec/1.png";
		vm.modeName = "Flavor";
		vm.discMode = "Taste";
		vm.taste = true;
		vm.strain = false;
		vm.effect = false;
		/**------maybe write a function to check if it's coming back from detail screen
			and populating these above with previous info---------------------------**/

		//Storage space for goEasy seach
		//vm.userSelect = [{"condName":"", "strnName":""}];

		//setup display of questions
    	$scope.showQuestion1 = true;
    	$scope.showQuestion2 = false;
    	$scope.showQuestion3 = false;
    	$scope.showAnswer1 = false;
    	$scope.showAnswer2 = false;
    	$scope.showAnswer3 = false;
    	
    	//make sure they select something
    	vm.selectedSomething = 0;

    	//initial display of strains limited to 3
    	vm.MoreStrains = 3;
    	vm.thereIsMore = false;

		//Populate modes
		modeResource.query(function(data){
			vm.Modes = data;
			vm.ModeT = [data[3],data[4],data[5]];

			vm.ModeS = [data[6],data[7],data[8]];
			vm.ModeE = [data[9],data[10],data[11]];
			vm.currentMode = vm.Modes[0]; //initiate mode
		});

		//select a mode
		$scope.selectMode = function(mode){
			vm.currentMode = mode;
			switch(mode) {
			    case 1:
			    	vm.modeName = "Flavor";
			    	vm.centerImage = "images/rec/1.png";
			    	vm.discMode = "Taste";
			    	vm.taste = true;
					vm.strain = false;
					vm.effect = false;
			    	$scope.showQuestion1 = true;
    				$scope.showQuestion2 = false;
    				$scope.showQuestion3 = false;
    				$scope.showAnswer1 = false;
    				$scope.showAnswer2 = false;
    				$scope.showAnswer3 = false;
    				vm.thereIsMore = false;
    				vm.MoreOrLess = false;
    				vm.selectedSomething = 0;
    				vm.selectedTaste = null;
    				vm.strainSuggestions=[];
    				vm.tasteTemp = -1;
    				vm.strainT = "";
					vm.effectT="";
					if(localStorageService.isSupported) {
				    	localStorageService.set('setDetail', "Flavor");
				    }else{
						$cookies.setDetail = "Flavor";
				    }
			        break;
			    case 2:
			    	vm.modeName = "Effect";
			    	vm.centerImage = "images/rec/2.png";
			    	vm.discMode = "Feel";
			    	vm.taste = false;
					vm.strain = false;
					vm.effect = true;
			    	$scope.showQuestion1 = false;
    				$scope.showQuestion2 = true;
    				$scope.showQuestion3 = false;
    				$scope.showAnswer1 = false;
    				$scope.showAnswer2 = false;
    				$scope.showAnswer3 = false;
    				vm.thereIsMore = false;
    				vm.MoreOrLess = false;
    				vm.selectedSomething = 0;
    				vm.selectedEffect = null;
    				vm.strainSuggestions=[];
    				vm.tasteTemp = -1;
    				vm.strainT = "";
					vm.effectT="";
					if(localStorageService.isSupported) {
				    	localStorageService.set('setDetail', "Effect");
				    }else{
						$cookies.setDetail = "Effect";
				    }
			        break;
			    case 3:
			    	vm.modeName = "Buds";
			    	vm.centerImage = "images/rec/3.png";
			    	vm.discMode = "Strain";
			    	vm.taste = false;
					vm.strain = true;
					vm.effect = false;
			    	$scope.showQuestion1 = false;
    				$scope.showQuestion2 = false;
    				$scope.showQuestion3 = true;
    				$scope.showAnswer1 = false;
    				$scope.showAnswer2 = false;
    				$scope.showAnswer3 = false;
    				vm.thereIsMore = false;
    				vm.MoreOrLess = false;
    				vm.selectedSomething = 0;
    				vm.selectedStrain = null;
    				vm.strainSuggestions=[];
    				vm.tasteTemp = -1;
    				vm.strainT = "";
					vm.effectT="";
					if(localStorageService.isSupported) {
				    	localStorageService.set('setDetail', "Effect");
				    }else{
						$cookies.setDetail = "Effect";
				    }
			        break;
			    default:
			        vm.modeName = "Select Mode";
			        vm.centerImage = "images/rec/1.png";
			        vm.discMode = "Select Mode";
			        vm.thereIsMore = false;
			        vm.MoreOrLess = false;
			}

		};


/**---------Selecting answers in Flavor, Effect, Strain mode-------------**/
/**---------Flavor Mode-------------**/
		//Populate FLAVOR selection display
		tasteResource.query(function(data){
			vm.tasteList = data;
		});
		//select a taste
		$scope.selectTaste = function(name){
			vm.showQ1 = !vm.showQ1; //toggle the questions display off
			vm.selectedTaste = name;
			for (var i = 0; i<vm.tasteList.length; i++){
				if(vm.tasteList[i].taste === name){
					vm.centerImage = vm.tasteList[i].imageUrl;
					vm.modeName = vm.tasteList[i].taste;
					vm.tasteTemp = vm.tasteList[i].tempF;
				}
			};
			vm.selectedSomething = 1;
		};
/**---------Effect Mode-------------**/
		//Populate EFFECT selection display
		recEffectResource.query(function(data){
			var num = 0;
			vm.recEffectList = [];
			for(var i=0; i<data.length; i++){
				if(data[i].recEffectType === 'P'){
					vm.recEffectList[num] = data[i];
					num++;
					vm.postiveStyle = {"color":"green"};
				}
			}
		});
		//select an effect 
		$scope.selectEffect = function(name){
			vm.showQ2 = !vm.showQ2; //toggle the questions display off
			vm.selectedEffect = name;
			for (var i = 0; i<vm.recEffectList.length; i++){
				if(vm.recEffectList[i].recEffectName === name){
					vm.centerImage = vm.recEffectList[i].imageUrl;
					vm.modeName = vm.recEffectList[i].recEffectName;
					vm.effectT = vm.recEffectList[i].recEffectTempRange;
					vm.selectedEffectType = vm.recEffectList[i].recEffectType;
					//console.log("vm.effectT", vm.effectT)
					console.log("vm.modeName", vm.modeName)
					console.log("vm.effectT", vm.effectT)
					console.log("vm.selectedEffectType", vm.selectedEffectType)
				}
			};
			vm.selectedSomething = 1;
		};
		//search and filter effects
	    vm.searchAll = "";
    	$scope.searchEffect = function(name){
    		vm.searchAll = name;
    	 	switch(name){
    	 		case 'All':
    	 			vm.searchAll = "";
    	 			recEffectResource.query(function(data){
						vm.recEffectList = data;
					});
					vm.postiveStyle = "";
					break;	
    	 		case 'Positive':
    	 			vm.searchAll = "";
    	 			recEffectResource.query(function(data){
    	 				var num = 0;
						vm.recEffectList = [];
						for(var i=0; i<data.length; i++){
    	 					if(data[i].recEffectType === 'P'){
    	 						vm.recEffectList[num] = data[i];
    	 						num++;
    	 					}
    	 				}
					});
					vm.postiveStyle = {"color":"green"};
					break;	   
				case 'Negative':
					vm.searchAll = "";
    	 			recEffectResource.query(function(data){
    	 				var num = 0;
						vm.recEffectList = [];
						for(var i=0; i<data.length; i++){
    	 					if(data[i].recEffectType === 'N'){
    	 						vm.recEffectList[num] = data[i];
    	 						num++;
    	 					}
    	 				}
					});
					break;	
    	 	} 
    	};
/**---------Strain Mode-------------**/
		//inititial list of STRAIN names for selecting
	    strainNamesResource.query(function(data){
			vm.strainNames = data;
		});
		//display and store the user selected strain name
		$scope.selectStrain = function(name){
	     	vm.showQ3 = !vm.showQ3; //toggle the questions display off
	     	vm.selectedStrain = name;
	     	vm.selectedSomething = 1;
	     	for(var i=0; i<vm.strainNames.length; i++){
	     		if(vm.strainNames[i].strainName === name){
	     			vm.strainT = vm.strainNames[i].strainType;
	     			vm.centerImage = vm.strainNames[i].imageUrl;
	     		}
	     	}
	    };
	    //search and filter strains
	    vm.searchAll = "";
    	$scope.searchStrain = function(name){
    		vm.searchAll = name;
    	 	//console.log("search", name);
    	 	switch(name){
    	 		case 'All':
    	 			vm.searchAll = "";
    	 			strainNamesResource.query(function(data){
						vm.strainNames = data;
						//console.log("list of strains", vm.strainNames);
					});
					break;	
    	 		case 'Sativa':
    	 			vm.searchAll = "";
    	 			strainNamesResource.query(function(data){
    	 				var num = 0;
    	 				vm.strainNames = [];
    	 				for(var i=0; i<data.length; i++){
    	 					if(data[i].strainType === 'Sativa'){
    	 						vm.strainNames[num] = data[i];
    	 						num++;
    	 					}
    	 				}
						//console.log("list of Sativa", vm.strainNames);
					});
					break;	   
				case 'Indica':
					vm.searchAll = ""; 
					strainNamesResource.query(function(data){
    	 				var num = 0;
    	 				vm.strainNames = [];
    	 				for(var i=0; i<data.length; i++){
    	 					if(data[i].strainType === 'Indica'){
    	 						vm.strainNames[num] = data[i];
    	 						num++;
    	 					}
    	 				}
						//console.log("list of Indica", vm.strainNames);
					});
					break;	
				case 'Hybrid':
					vm.searchAll = "";
					strainNamesResource.query(function(data){
    	 				var num = 0;
    	 				vm.strainNames = [];
    	 				for(var i=0; i<data.length; i++){
    	 					if(data[i].strainType === 'Hybrid'){
    	 						vm.strainNames[num] = data[i];
    	 						num++;
    	 					}
    	 				}
						//console.log("list of Hybrid", vm.strainNames);
					});
					break;	
				default:
        			strainNamesResource.query(function(data){
        				var num = 0;
    	 				vm.strainNames = [];
    	 				for(var i=0; i<data.length; i++){
    	 					if(data[i].strainName == name){
    	 						vm.strainNames[num] = data[i];
    	 						num++;
    	 					}
    	 				}
						//console.log("list of Seached", vm.strainNames);
					});
					break;
    	 	} 
    	};
    	//search button --- clear Search
	    $scope.clearSearch = function () {
	        vm.searchAll = "";
	    };
/**---------Selecting answers in Flavor, Effect, Strain mode END------------**/

/**---------SEARCH FUNCTION for Flavor, Effect, Strain mode------------**/
		//Flavor
		$scope.searchForTaste = function (Flavor){
			NProgress.start();
			NProgress.set(0.4);
			strainResource.query(function(data){
				NProgress.done();
				var num = 0;
 				vm.strainSuggestions = [];
 				for(var i=0; i<data.length; i++){
 					for(var x=0; x<data[i].taste.length; x++){
 						if(data[i].taste[x] === Flavor){
 							vm.strainSuggestions[num] = data[i];
 							num++;
 						}
 					}
 				}
 				
 				if(vm.strainSuggestions.length > 3){
	    			vm.thereIsMore = true;
	    		}else{
	    			vm.thereIsMore = false;	
	    		}
				//console.log("list of Seached", vm.strainSuggestions);
				vm.originalData = vm.strainSuggestions;
			});

		};
		//Effect
		$scope.searchForFeel = function (Effect,Type){
			NProgress.start();
			NProgress.set(0.4);
			strainResource.query(function(data){
				NProgress.done();
				var num = 0;
 				vm.strainSuggestions = [];
 				if(Type === "N"){
 					for(var i=0; i<data.length; i++){
	 					for(var x=0; x<data[i].negativeEffects.length; x++){
	 						if(data[i].negativeEffects[x] === Effect){
	 							vm.strainSuggestions[num] = data[i];
	 							num++;
	 						}
	 					}
	 				}
 				}else{
 					for(var i=0; i<data.length; i++){
	 					for(var x=0; x<data[i].positiveEffects.length; x++){
	 						if(data[i].positiveEffects[x] === Effect){
	 							vm.strainSuggestions[num] = data[i];
	 							num++;
	 						}
	 					}
	 				}
 				}
 				if(vm.strainSuggestions.length > 3){
	    			vm.thereIsMore = true;
	    		}else{
	    			vm.thereIsMore = false;	
	    		}
				//console.log("list of Seached", vm.strainSuggestions);
				vm.originalData = vm.strainSuggestions;
			});

		};
		//Strain
		$scope.searchForBud = function (Strain){
			NProgress.start();
			NProgress.set(0.4);
			strainResource.query(function(data){
				NProgress.done();
				var num = 0;
 				vm.strainSuggestions = [];
 				for(var i=0; i<data.length; i++){
					if(data[i].strainName === Strain){
						vm.strainSuggestions[num] = data[i];
						num++;
					}
 				}

 				if(vm.strainSuggestions.length > 3){
	    			vm.thereIsMore = true;
	    		}else{
	    			vm.thereIsMore = false;	
	    		}
			});

		};
/**---------SEARCH FUNCTION for Flavor, Effect, Strain mode END------------**/

		//this sets the ng-class to active
		$scope.active = function(item){

    		switch(item) {
			    case vm.currentMode:
				    if(item < 4){
				    	return "active";
				    }else{
				    	return "active2";
				    }
			        break;
			    case 'Lo':
			    	if(vm.tasteTemp != -1 && vm.tasteTemp <= 365){
			    		return "active2";
			    	}
			    	else if(vm.effectT === 'Lo'){
			    		return "active2";
			    	}
			    	break;
			    case 'Md':
			    	if(365 < vm.tasteTemp && vm.tasteTemp < 392){
			    		return "active2";
			    	}
			    	else if(vm.effectT === 'Md'){
			    		return "active2";
			    	}
			    	break;
			    case 'Hi':
			    	if(vm.tasteTemp >= 392){
			    		return "active2";
			    	}
			    	else if(vm.effectT === 'Hi'){
			    		return "active2";
			    	}
			    	break;
			    case 'i':
			    	if(vm.strainT === 'Indica'){
			    		return "active2";
			    	}
			    	break;
			    case 's':
			    	if(vm.strainT === 'Sativa'){
			    		return "active2";
			    	}
			    	break;
			    case 'h':
			    	if(vm.strainT === 'Hybrid'){
			    		return "active2";
			    	}
			    	break;
			    default:
			        return "!active";
			}
			
    	};
    	
    	//go back a step by hiding the solution screen and displaying question screen
    	$scope.goBack = function(mode){

    		switch (mode){
    			case 'A1':
    				$scope.showAnswer1 = false;
					$scope.showQuestion1 = true;
					vm.selectedSomething = 0;
    				vm.selectedTaste = null;
    				vm.strainSuggestions=[];
    				vm.MoreOrLess = false;
    				vm.thereIsMore = false;
    				vm.centerImage = "images/rec/1.png";
					break;
				case 'A2':
					$scope.showAnswer2 = false;
					$scope.showQuestion2 = true;
					vm.selectedSomething = 0;
    				vm.selectedEffect = null;
    				vm.strainSuggestions=[];
    				vm.MoreOrLess = false;
    				vm.thereIsMore = false;
    				vm.centerImage = "images/rec/2.png";
					break;
				case 'A3':
					$scope.showAnswer3 = false;
					$scope.showQuestion3 = true;
					vm.selectedSomething = 0;
    				vm.selectedStrain = null;
    				vm.strainSuggestions=[];
    				vm.MoreOrLess = false;
    				vm.thereIsMore = false;
    				vm.centerImage = "images/rec/3.png";
					break;
    		}
   
    	};

    	//display more
    	$scope.goMore = function(mode){
    		switch (mode){
    			case 'A1':
    				vm.MoreStrains = vm.originalData.length;
    				vm.MoreOrLess = true;
					break;
				case 'A2':
					vm.MoreStrains = vm.originalData.length;
					vm.MoreOrLess = true;
					break;
				case 'A3':
					vm.MoreStrains = vm.originalData.length;
					vm.MoreOrLess = true;
					break;
				default:
					vm.MoreStrains = 3;
					vm.MoreOrLess = false;
					break;
    		}
   
    	};

    	//the GO button
    	$scope.goEasy = function(mode){

    		//set the color of which filter is selected first
    		vm.active1 = {"font-weight": "bold", "color":"#009900"};
    		vm.active2 = '';
    		vm.active3 = '';
    		vm.active4 = '';
    		vm.active5 = '';
    		vm.active6 = '';

    		vm.orderByValue = 'strainName';

    		//make sure user input a medical condition
    		if(vm.selectedSomething === 0){
    			//alart message
    			vm.alertMsg = "Please select something."
    			vm.alert = {"color":"red"};
    			return vm.alertMsg;
    		};

    		switch (mode){
    			case 'Q1':
    				vm.MoreStrains = 3;
    				$scope.showAnswer1 = true;
					$scope.showQuestion1 = false;
					$scope.searchForTaste(vm.selectedTaste);
					break;
				case 'Q2':
					vm.MoreStrains = 3;
					$scope.showAnswer2 = true;
					$scope.showQuestion2 = false;
					$scope.searchForFeel(vm.selectedEffect,vm.selectedEffectType);
					break;
				case 'Q3':
					vm.MoreStrains = 3;
					$scope.showAnswer3 = true;
					$scope.showQuestion3 = false;
					$scope.searchForBud(vm.selectedStrain);
					break;
    		}

    	};

    	//filter the suggested strains
    	$scope.filterSuggestedStrains = function(choice){
    		var sortedData = [];
    		var num = 0;
    		switch (choice){
    			case 's':
    				//console.log('s');
    				for(var i=0;i<vm.originalData.length;i++){
    					if(vm.originalData[i].strainType === 'Sativa'){
    						sortedData[num] = vm.originalData[i];
    						num++;
    					}
    				}
    				vm.strainSuggestions = sortedData;
    				vm.orderByValue = 'strainName';
    				//console.log('sortedData', sortedData);
    				vm.active1 = '';
		    		vm.active2 = {"font-weight": "bold", "color":"#009900"};
		    		vm.active3 = '';
		    		vm.active4 = '';
		    		vm.active5 = '';
		    		vm.active6 = '';
					break;
				case 'i':
					//console.log('i');
					for(var i=0;i<vm.originalData.length;i++){
    					if(vm.originalData[i].strainType === 'Indica'){
    						sortedData[num] = vm.originalData[i];
    						num++;
    					}
    				}
    				vm.strainSuggestions = sortedData;
    				vm.orderByValue = 'strainName';
    				//console.log('sortedData', sortedData);
    				vm.active1 = '';
		    		vm.active2 = '';
		    		vm.active3 = {"font-weight": "bold", "color":"#009900"};
		    		vm.active4 = '';
		    		vm.active5 = '';
		    		vm.active6 = '';
					break;
				case 'h':
					//console.log('h');
					for(var i=0;i<vm.originalData.length;i++){
    					if(vm.originalData[i].strainType === 'Hybrid'){
    						sortedData[num] = vm.originalData[i];
    						num++;
    					}
    				}
    				vm.strainSuggestions = sortedData;
    				vm.orderByValue = 'strainName';
    				//console.log('sortedData', sortedData);
    				vm.active1 = '';
		    		vm.active2 = '';
		    		vm.active3 = '';
		    		vm.active4 = {"font-weight": "bold", "color":"#009900"};
		    		vm.active5 = '';
		    		vm.active6 = '';
					break;
				case 'cbd':
					//console.log('cbd');
					for(var i=0;i<vm.originalData.length;i++){
    					if(vm.originalData[i].components[1].name === 'CBD' && vm.originalData[i].components[1].value > 0){
    						sortedData[num] = vm.originalData[i];
    						num++;
    					}
    				}
    				vm.strainSuggestions = sortedData;
    				vm.orderByValue = '-components[1].value';
    				//console.log('sortedData', sortedData);
    				vm.active1 = '';
		    		vm.active2 = '';
		    		vm.active3 = '';
		    		vm.active4 = '';
		    		vm.active5 = {"font-weight": "bold", "color":"#009900"};
		    		vm.active6 = '';
					break;
				case 'thc':
					//console.log('thc');
					for(var i=0;i<vm.originalData.length;i++){
    					if(vm.originalData[i].components[0].name === 'THC9' && vm.originalData[i].components[0].value > 0){
    						sortedData[num] = vm.originalData[i];
    						num++;
    					}
    				}
    				vm.strainSuggestions = sortedData;
    				vm.orderByValue = '-components[0].value';
    				//console.log('sortedData', sortedData);
    				vm.active1 = '';
		    		vm.active2 = '';
		    		vm.active3 = '';
		    		vm.active4 = '';
		    		vm.active5 = '';
		    		vm.active6 = {"font-weight": "bold", "color":"#009900"};
					break;
				case 'all':
					//console.log('all', vm.originalData);
					vm.strainSuggestions = vm.originalData;
					vm.orderByValue = 'strainName';
					vm.active1 = {"font-weight": "bold", "color":"#009900"};
		    		vm.active2 = '';
		    		vm.active3 = '';
		    		vm.active4 = '';
		    		vm.active5 = '';
		    		vm.active6 = '';
					break;
				default:
					//console.log('def', vm.finalSuggestedStrains);
					vm.strainSuggestions = vm.originalData;
					vm.orderByValue = 'strainName';
					vm.active1 = {"font-weight": "bold", "color":"#009900"};
		    		vm.active2 = '';
		    		vm.active3 = '';
		    		vm.active4 = '';
		    		vm.active5 = '';
		    		vm.active6 = '';
					break;
    		}

    	};

    	//toggle the questions display on/off
    	vm.toggleQuestion = function(choice){
    		switch (choice){
    			case 'Q1':
    				//console.log("Q1");
					vm.showQ1 = !vm.showQ1;
					vm.alert = "";
					vm.alertMsg = "";
					break;
				case 'Q2':
					//console.log("Q2");
					vm.showQ2 = !vm.showQ2;
					vm.alert = "";
					vm.alertMsg = "";
					break;
				case 'Q3':
					//console.log("Q2");
					vm.showQ3 = !vm.showQ3;
					vm.alert = "";
					vm.alertMsg = "";
					break;
    		}
		};

		//researched javascript codes in dealing with arrays
    	//make array unique
    	Array.prototype.contains = function(v) {
		    for(var i = 0; i < this.length; i++) {
		        if(this[i] === v) return true;
		    }
		    return false;
		};
		Array.prototype.unique = function() {
		    var arr = [];
		    for(var i = 0; i < this.length; i++) {
		        if(!arr.contains(this[i])) {
		            arr.push(this[i]);
		        }
		    }
		    return arr; 
		};

		//find lowest value
		Array.min = function( array ){
    		return Math.min.apply( Math, array );
		};
	    
	}

}());