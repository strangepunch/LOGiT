(function(){
	"use strict";

	angular
		.module("growOpApp")
		.directive("onlyDigits", function () {
			return {
		        restrict: 'EA',
		        require: '?ngModel',
		        scope:{
		            allowDecimal: '@',
		            allowNegative: '@',
		            minNum: '@',
		            maxNum: '@'
		        },

		        link: function (scope, element, attrs, ngModel)
		        {
		            if (!ngModel) return;
		            ngModel.$parsers.unshift(function (inputValue)
		            {
		                var decimalFound = false;
		                var digits = inputValue.split('').filter(function (s,i)
		                {
		                    var b = (!isNaN(s) && s != ' ');
		                    if (!b && attrs.allowDecimal && attrs.allowDecimal == "true")
		                    {
		                        if (s == "." && decimalFound == false)
		                        {
		                            decimalFound = true;
		                            b = true;
		                        }
		                    }
		                    if (!b && attrs.allowNegative && attrs.allowNegative == "true")
		                    {
		                        b = (s == '-' && i == 0);
		                    }

		                    return b;
		                }).join('');
		                if (attrs.maxNum && !isNaN(attrs.maxNum) && parseFloat(digits) > parseFloat(attrs.maxNum))
		                {
		                    digits = attrs.maxNum;
		                }
		                if (attrs.minNum && !isNaN(attrs.minNum) && parseFloat(digits) < parseFloat(attrs.minNum))
		                {
		                    digits = attrs.minNum;
		                }
		                ngModel.$viewValue = digits;
		                ngModel.$render();

		                return digits;
		            });
		        }
			}
		});
	
}());