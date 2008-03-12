slikcalc.tests = {
	
	initialize : function() {
		var TestRunner = YAHOO.tool.TestRunner;
		
		TestRunner.add(this.columnCalcTest());
		TestRunner.add(this.formulaCalcTest());
        TestRunner.add(this.formulaCalcRowsTest());
		var testLogger = new YAHOO.tool.TestLogger();
        testLogger.hideCategory('info');
		TestRunner.run();
	},
	
	columnCalcTest : function() {
		return new YAHOO.tool.TestCase({
			
			Assert : YAHOO.util.Assert,

		    name: "Simple Column",
		
			calc: slikcalc.examples.columnCalc.calc,
			
			_should: {
	        	ignore: {
	            	testCalculateChecked: false,
				testCalcOnLoad: false
	            }
	        },
			
			tearDown : function() {
				slikcalc.setAmount('ex-1-1', 0.00);
				slikcalc.setAmount('ex-1-2', 0.00);
				YAHOO.util.Dom.get('ex-1-1-c').checked = false;
				YAHOO.util.Dom.get('ex-1-2-c').checked = false;
			},

			testCalcOnLoad : function () {
				this.Assert.areEqual(5.00, slikcalc.getAmount('ex1-total'), 'Total not set on load');
			},
		
			testCalculateNotChecked : function () {
				slikcalc.setAmount('ex-1-1', 25.00);
				this.calc.calculate();
				this.Assert.areEqual(5.00, slikcalc.getAmount('ex1-total'), 'Total not updated');
			},
		
			testCalculateChecked : function() {
				slikcalc.setAmount('ex-1-1', 25.00);
				YAHOO.util.Dom.get('ex-1-1-c').checked = true;
				this.calc.calculate();
				this.Assert.areEqual(30.00, slikcalc.getAmount('ex1-total'), 'Total not updated');
			},
			
			testCalculateInvertNotChecked : function() {
				YAHOO.util.Dom.get('ex-1-2-c').checked = false;
				slikcalc.setAmount('ex-1-2', 25);
				this.calc.calculate();
				this.Assert.areEqual(30.00, slikcalc.getAmount('ex1-total'), 'Total not updated');
			},
			
			testCalculateInvertChecked : function() {
				YAHOO.util.Dom.get('ex-1-2-c').checked = true;
				slikcalc.setAmount('ex-1-2', 25);
				this.calc.calculate();
				this.Assert.areEqual(5.00, slikcalc.getAmount('ex1-total'), 'Total not updated');
			}
			
		});
	},
	
	formulaCalcTest : function() {
		return new YAHOO.tool.TestCase({
			
			Assert : YAHOO.util.Assert,

		    name: "FormulaCalc",
		
			calc: slikcalc.examples.formulaCalc,
			
			tearDown : function() {
				slikcalc.setAmount('formula-2', 0.00);
				slikcalc.setValue('formula-3', '');
				slikcalc.setAmount('formula-4', 0.00);
			},

		    testCalcOnLoad : function () {
				this.Assert.areEqual(5.00, slikcalc.getAmount('formula-4'), 'Total not set on load');
		    },
		
			testCalculate : function() {
				slikcalc.setAmount('formula-2', 25.00);
				slikcalc.setAmount('formula-3', 2);
				this.calc.calculate();
				this.Assert.areEqual(60.00, slikcalc.getAmount('formula-4'), 'Total not updated');
			},
			
			testCalculateDefaultValue : function() {
				slikcalc.setValue('formula-3', '');
				this.calc.calculate();
				this.Assert.areEqual(5.00, slikcalc.getAmount('formula-4'), 'Total not updated');
			}
			
		});
	},
    
    formulaCalcRowsTest : function() {
        return new YAHOO.tool.TestCase({
			
			Assert : YAHOO.util.Assert,

		    name: "FormulaCalcRows",
		
			calc: slikcalc.examples.formulaCalcRows,
			
			tearDown : function() {
				YAHOO.util.Dom.get('formula-rows-1-c').checked = false;
                YAHOO.util.Dom.get('formula-rows-2-c').checked = false;
                slikcalc.setValue('formula-rows-1-2', '');
                slikcalc.setValue('formula-rows-2-2', '');
			},
            
            testCalculateOneRowChecked : function() {
                YAHOO.util.Dom.get('formula-rows-1-c').checked = true;
                slikcalc.setAmount('formula-rows-1-2', 25.00);
                this.calc.calculate();
                this.Assert.areEqual(30, slikcalc.getAmount('formula-rows-1-4'));
                this.Assert.areEqual(30, slikcalc.getAmount('formula-rows-total'));
            },
            
            testCalculateTwoRowsCheck : function() {
                YAHOO.util.Dom.get('formula-rows-1-c').checked = true;
                YAHOO.util.Dom.get('formula-rows-2-c').checked = true;
                slikcalc.setAmount('formula-rows-1-2', 25.75);
                slikcalc.setAmount('formula-rows-2-2', 32.87);
                this.calc.calculate();
                this.Assert.areEqual(30.75, slikcalc.getAmount('formula-rows-1-4'));
                this.Assert.areEqual(37.87, slikcalc.getAmount('formula-rows-2-4'));
                this.Assert.areEqual(68.62, slikcalc.getAmount('formula-rows-total'));
            },
            
            
            testCalculateOneRowNotChecked: function() {
                YAHOO.util.Dom.get('formula-rows-1-c').checked = false;
                YAHOO.util.Dom.get('formula-rows-2-c').checked = true;
                slikcalc.setAmount('formula-rows-1-2', 25.75);
                slikcalc.setAmount('formula-rows-2-2', 32.87);
                this.calc.calculate();
                this.Assert.areEqual(30.75, slikcalc.getAmount('formula-rows-1-4'));
                this.Assert.areEqual(37.87, slikcalc.getAmount('formula-rows-2-4'));
                this.Assert.areEqual(37.87, slikcalc.getAmount('formula-rows-total'));
            },
            
            testCalculateTwoRowsNotChecked: function() {
                YAHOO.util.Dom.get('formula-rows-1-c').checked = false;
                YAHOO.util.Dom.get('formula-rows-2-c').checked = false;
                slikcalc.setAmount('formula-rows-1-2', 25.75);
                slikcalc.setAmount('formula-rows-2-2', 32.87);
                this.calc.calculate();
                this.Assert.areEqual(30.75, slikcalc.getAmount('formula-rows-1-4'));
                this.Assert.areEqual(37.87, slikcalc.getAmount('formula-rows-2-4'));
                this.Assert.areEqual(0.00, slikcalc.getAmount('formula-rows-total'));
            }
        });
    }
	
};
YAHOO.util.Event.addListener(window, 'load', slikcalc.tests.initialize, slikcalc.tests, true);