sap.ui.define([
	"router_demo/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("router_demo.controller.NotFound", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf router_demo.controller.view.NotFound
		 */
		onInit: function() {
			var oRouter, oTarget;

			oRouter = this.getRouter();
			oTarget = oRouter.getTarget("notFound");
			oTarget.attachDisplay(function(oEvent) {
				this._oData = oEvent.getParameter("data"); // store the data
			}, this);
		},

		onClickBack: function() {
			if (this._oData && this._oData.fromTarget) {
				this.getRouter().getTargets().display(this._oData.fromTarget);
				delete this._oData.fromTarget;
				return;
			}
			BaseController.prototype.onNavBack.apply(this, arguments);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf router_demo.controller.view.NotFound
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf router_demo.controller.view.NotFound
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf router_demo.controller.view.NotFound
		 */
		//	onExit: function() {
		//
		//	}

	});

});