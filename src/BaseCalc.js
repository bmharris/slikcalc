/**
 * @class slikcalc.BaseCalc
 * Base Calculator class.  Defines base utility methods for Calculator objects along with a common interface for extending.
 */
 
/**
 * @constructor
 */
slikcalc.BaseCalc = function() {
	this.calculationComplete = slikcalc.createCustomEvent('calculationComplete');
};

slikcalc.BaseCalc.prototype = {

	calculationComplete : null,
	
	lastKeyUp : null,
	
	calculations : 0,
	
	totalOperator : null,
	
	/**
	 * Sets up event chaining for BaseCalc objects.  The object passed in is returned to allow for a fluent interface
	 * this.calculate will be called after dependCalc.calculate
	 */
	dependsOn : function(dependCalc) {
		slikcalc.bindEvent(dependCalc.calculationComplete, this.calculate, this);
		return dependCalc;
	},
	
	/**
	 * Sets up event chaining for BaseCalc objects.  The object passed in is returned to allow for a fluent interface
	 * this.calculate will be called before triggeredCalc.calculate
	 */
	triggers : function(triggeredCalc) {
		slikcalc.bindEvent(this.calculationComplete, triggeredCalc.calculate, triggeredCalc);
		return triggeredCalc;
	},
	
	calculateCheck : function() {
		this.lastKeyup = new Date().getTime();
		var that = this;
		this.calculations = this.calculations + 1;
		var calculation = this.calculations;
		setTimeout(function() {
			var currentTime = new Date().getTime();
			var difference = currentTime - that.lastKeyup;
			if(calculation == that.calculations && difference > 600) {
				that.calculate();
			}
		}, 700);
	},
	
	/**
	 * Calculates the total amount, dependant upon the totalOperator value.  Seperated into conditional statements for better performance that using 'eval()'
	 */
	calculateTotal : function(total, amount) {
		if(this.totalOperator === '+') {
			total = total === null ? 0.00 : total;
            total = total + amount;
        }else if(this.totalOperator === '-') {
			if(total === null) {
				total = amount;
			}else {
				total = total - amount;
			}
		}else if(this.totalOperator === '*' || this.totalOperator === 'x') {
			total = total === null ? 1 : total;
			total = total * amount;
		}else if(this.totalOperator === '/') {
			if(total === null) {
				total = amount;
			}else {
				total = total / amount;
			}
		}
		return total;
	},
	
	/**
	 * Abstract method to be implemented in sub-classes.
	 */
	calculate : function() {
		throw new Error('Must implement calculate method in sub-class of BaseCalc');
	}
};