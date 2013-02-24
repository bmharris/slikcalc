var slikcalc;
(function () {
	"use strict";

	/**
	 * @class ColumnCalc
	 * @description Calculator ojbect for performing column-based calculations
	 * @constructor
	 * @param {Object} config (Required) Configuration object, see slikcalc.BaseCalc for options
	 */
	slikcalc.ColumnCalc = function (config) {
		this.parent.constructor.call(this, config);
		this.rows = [];
	};
	slikcalc.extend(slikcalc.ColumnCalc, slikcalc.BaseCalc);

	/**
	 * @description {Array} Array of row objects to use in calculator
	 */
	slikcalc.ColumnCalc.prototype.rows = null;

	/**
	 * @description Runs on page load.  Sets up event listeners if registerEventListeners is set to true.
	 */
	slikcalc.ColumnCalc.prototype.initialize = function () {
		if (this.registerListeners === true) {
			this.setupEventListeners();
		}
	};

	/**
	 * @description Processes the rows and applies the totalOperator upon each value, placing the total in the totalId element
	 */
	slikcalc.ColumnCalc.prototype.calculate = function () {
		var idx,
			checkbox,
			includeRow = false,
			total = null;
		for (idx in this.rows) {
			if (this.rows.hasOwnProperty(idx)) {
				includeRow = true;
				if (this.rows[idx].checkbox !== undefined) {
					checkbox = this.rows[idx].checkbox;
					includeRow = (checkbox.invert !== slikcalc.get(checkbox.id).checked);
				}
				if (includeRow === true) {
					total = this.calculateTotal(total, slikcalc.getAmount(this.rows[idx].id));
				}
			}
		}
		slikcalc.setAmount(this.totalId, total);
	};

	/**
	 * @description Adds event listeners for row checkboxes and inputs
	 */
	slikcalc.ColumnCalc.prototype.setupEventListeners = function () {
		var idx,
			rowConfig;
		for (idx in this.rows) {
			if (this.rows.hasOwnProperty(idx)) {
				rowConfig = this.rows[idx];
				if (rowConfig.checkbox !== undefined) {
					slikcalc.addListener(rowConfig.checkbox.id, 'click', this.processCalculation, this);
				}
				slikcalc.addListener(rowConfig.id, 'keyup', this.change, this);
				slikcalc.addListener(rowConfig.id, 'change', this.change, this);
			}
		}
	};

	/**
	 * @description Adds a row to the calculator to be included with calculations.
	 * @param {Object} config Configuration object for row definitions, with the following options:
	 * <ul>
	 *	<li>id : Element id that holds the value to calculate</li>
	 *  <li>checkbox.id : (Optional) Element id of checkbox</li>
	 *  <li>checkbox.invert : Defaults to false. If true, row is included in total calculcation when un-checked, and omitted when checked</li>
	 * </ul>
	 */
	slikcalc.ColumnCalc.prototype.addRow = function (rowConfig) {
		rowConfig = rowConfig || {};
		if (rowConfig.checkbox !== undefined) {
			rowConfig.checkbox.invert = rowConfig.checkbox.invert || false;
		}
		this.rows.push(rowConfig);
	};

}());
