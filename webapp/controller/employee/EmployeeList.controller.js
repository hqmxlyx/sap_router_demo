sap.ui.define([
	"router_demo/controller/BaseController",
	"sap/ui/core/Core"
], function(BaseController) {
	"use strict";

	return BaseController.extend("router_demo.controller.employee.EmployeeList", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf router_demo.controller.controller.view.EmployeeList
		 */
		onInit: function() {
			var oModel = new sap.ui.model.json.JSONModel("model/employee_list.json");
			
			//组件级别数据共享
			this.getOwnerComponent().setModel(oModel, "emplist");
			this.getView().setModel(oModel);
		},
		onItemClick: function(oEvent) {
			var oRouter = this.getRouter();

			//获取点击行的路径，在detial页面要通过路径绑定数据
			// var oPath = oEvent.getSource().getBindingContext().getPath();
			// oRouter.navTo("detial", {
			// 	path: encodeURIComponent(oPath)
			// });

			var oId = oEvent.getSource().getBindingContext().getProperty("id");
			oRouter.navTo("employee", {
				id: oId
			});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf router_demo.controller.controller.view.EmployeeList
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf router_demo.controller.controller.view.EmployeeList
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf router_demo.controller.controller.view.EmployeeList
		 */
		//	onExit: function() {
		//
		//	}

	});

});