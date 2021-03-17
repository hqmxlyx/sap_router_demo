sap.ui.define([
	"router_demo/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("router_demo.controller.Home", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf router_demo.view.Home
		 */
		onInit: function() {
			var oModel = new sap.ui.model.json.JSONModel('model/navigation_list.json');
			this.getView().setModel(oModel);
		},
		onNavigation: function(oEvent) {
			var oRouter = this.getRouter();
			//获取路径数据
			//var oPath = oEvent.getSource().getBindingContext().getPath();
			//获取指定属性数据
			var oTarget = oEvent.getSource().getBindingContext().getProperty("target");
			if (oTarget === "notFound") {
				oRouter.getTargets().display(oTarget, {
					fromTarget: "home"
				});
			} else {
				oRouter.navTo(oTarget);
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf router_demo.view.Home
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf router_demo.view.Home
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf router_demo.view.Home
		 */
		//	onExit: function() {
		//
		//	}

	});

});