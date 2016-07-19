(function(){
	"use strict";

	angular
		.module("growOpApp")
		.directive('betterButton', function () {
			return {
		      restrict: 'AE',
		      scope: {
		    	  entryStatus: '@',
		          action: '&'
		        },
		      template: '<div class="betterbutton"><div class="innerName" style="color:{{btnColor}}; opacity:{{btnOpacity}};" ng-click="action()"><span class={{DisplayShape}} aria-hidden="true"></span></div>',
		      link: function (scope, elem, attrs) {
		    	  
		    	  	scope.DisplayShape = 'glyphicon glyphicon-option-vertical';
		    	  	scope.checkButton = 'glyphicon glyphicon-ok';
		    	  	scope.emailed = ''
		    	  	scope.removeButton = 'glyphicon glyphicon-option-vertical';
		    	  	scope.btnColor = '#ffffff';
		    	  	scope.btnOpacity = 0.5;
  	  	
		    	  	
	    		  	scope.$watch('entryStatus', function(newValue) {
			      		if(attrs.entryStatus == 'saved'){
			    		  	scope.DisplayShape = scope.checkButton;
			    		  	scope.btnColor = '#ffffff';
			    		  	scope.btnOpacity = 0.8;
		    		  	}
			    	  
			    	  	if(attrs.entryStatus == 'done'){
			    		  	scope.DisplayShape = scope.checkButton;
			    		  	scope.btnColor = '#66ff33';
			    		  	scope.btnOpacity = 0.8;
		    		  	}
			    	  
			    	  	if(attrs.entryStatus == 'new'){
						  	scope.DisplayShape = scope.removeButton;
						  	scope.btnColor = '#ffffff';
		    	  			scope.btnOpacity = 0.5;
		    		  	}	
			        });

		    	  	elem.bind('mouseover', function() {
	    	        	elem.css('cursor', 'pointer');
	    	        	elem.css('opacity', 1);
	    	      	});

	    	      	elem.bind('mouseout', function() {
	    	        	elem.css('cursor', 'pointer');
	    	        	elem.css('opacity', 0.5);
	    	      	});
		    	  
		 		
		    	  /*function setToAdd(){
		    		  scope.$apply(function() {
		    			  scope.btnColor = 'orange';
		    			  scope.DisplayShape = scope.addButton;
		    		  });
		    	  }*/
		    	  
		      	}
			};
		});
	
}());

