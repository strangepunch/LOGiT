(function(){
	"use strict";

	angular
		.module("growOpApp")
		.directive('timerClock', function () {
			return {
				restrict: 'AE',
		      	scope: {
		      		clock: '=',
		      		action: '&',
		      		passIn: '&'
		        },
		        controller: function ($scope) {
		        	console.log($scope.clock);
		        	
		        	var timer = null;

		            var timerCurrent = 0;

		            var timerSeconds = $scope.clock.time;
		            
		            var timerFinish = 0;
		            
		            var timerRemain = 0;
		            
		            var timerName = $scope.clock.name;
		            
		            var transform_styles = ['-webkit-transform',
		      	  	                         '-ms-transform',
		      	  	                         'transform'];
		            		            
		            function stopWatch(){
		            	
		            	timerCurrent = new Date().getTime();
		            	
		                var seconds = (timerFinish-timerCurrent)/1000;
		                
		                //console.log("seconds: ", seconds);

		                if(seconds <= 0){

		                	displayTime(0);
		                	
		                	//$scope.passIn({percent:100});
		                	
		                    clearInterval(timer);

		                    alert(timerSeconds + " seconds ago, you wanted to remember to " + timerName);
		                    
		                }else{

		                    var percent = 100-((seconds/timerSeconds)*100);
		                    
		                    displayTime(seconds);
		                  
		                    //$scope.passIn({percent:percent});
		                  
		                }
		                
		            }
		            
		            function displayTime(time){
		            	$scope.clock.time = time;
		            	$scope.$apply(); //force display of the changes

		            	//console.log("display time: ", $scope.clock.time);
		            	//console.log("display this clock: ", $scope.clock);
		            	//$scope.$broadcast('clock.time');
		            }
		            
		           
		            
		            $scope.startWatch = function(){
		           		clearInterval(timer);
		           	
		              	timerCurrent = new Date().getTime();

		              	timerFinish = timerCurrent +(timerSeconds*1000);
		              	
		              	//currently the countdown runs off of timerSeconds and NOT $scope.clock.time
		              	//maybe write a check for $scope.clock.time not 0 in the future
		              	timer = setInterval(stopWatch, 50);
		              	
		              	timerRemain = timerFinish - timerCurrent;
		              	
		              	console.log("inside Directive! time remain: " + timerRemain);
		             
		           }
		        	
		            //$scope.startWatch();
		            
		        },
		        template:'<div style="background-color:{{color}}">Do {{clock.name}} in {{clock.time}} countdown: {{count}}</div>' + '<input type="button" class="btn btn-primary btn-md" value="START" ng-click="startWatch()"/>',
		        link: function (scope, elem, attrs) {
		        	var oldTime = scope.clock.time;	        	
		        	elem.css('background-color', 'white');
		        	
		        	scope.$watch('clock.time', function(newValue) {
		        		//console.log("new val: " + newValue);
		        		scope.count = newValue;
		        		
		        		var percentCount = 100-((newValue/oldTime)*100);
		        		scope.passIn({percent:percentCount});
		        		
		        		if(scope.clock.time >= 10){
			        		elem.css('background-color', 'green');
			        	}else if(scope.clock.time < 10 && scope.clock.time != 0){
			        		elem.css('background-color', 'yellow');
			        	}else{
			        		elem.css('background-color', 'red');
			        	}
		        		
		            });
					
		        	
					  
		        	elem.bind('mouseover', function() {
		        		elem.css('cursor', 'pointer');
		        	});
		      }
			};
		});
}());

