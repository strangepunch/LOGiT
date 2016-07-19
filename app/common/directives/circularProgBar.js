(function(){
	"use strict";

	angular
		.module("growOpApp")
		.directive('circularProg', function () {
			return {
				restrict: 'AE',
				controller: function ($scope) {
		        	
		        	var transform_styles = ['-webkit-transform',
		      	  	                         '-ms-transform',
		      	  	                         'transform'];
		        	
		        	$scope.displayProgCircle = function(percent) {
		    	   	  	 var fill_rotation = percent * 1.8;
		    	   	  	 var fix_rotation = percent * 2 * 1.8;
		    	   	  		    	   	  
		    	   	  	 console.log(percent);
	    	   	  	  	 for(var i in transform_styles) {
		    	  			 $('.circle .fill, .circle .mask.full').css(transform_styles[i], 'rotate(' + fill_rotation + 'deg)');
		    	  			 $('.circle .fill.fix').css(transform_styles[i], 'rotate(' + fix_rotation + 'deg)');
		    	  			 //$scope.$apply();
		    	  		 } 
	    	   	  	  	 
		        	}
		        	
		        },
		        template:'<div class="circle"><div class="mask full"><div class="fill"></div></div><div class="mask half"><div class="fill"></div><div class="fill fix"></div></div><div class="shadow"></div></div><div class="inset"></div>',
		        link: function (scope, elem, attrs) {
		        	
		        	console.log("attrs watch:", attrs.id);
		        	console.log("scope watch:", scope.id);
		        	console.log("elem watch:", elem.id);
		        	
		        	elem.bind('mouseover', function() {
		        		elem.css('cursor', 'pointer');
		        	});
		        	
		        }
			};
		});
}());

