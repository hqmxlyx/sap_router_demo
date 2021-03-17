sap.ui.define([
	"router_demo/controller/BaseController",
	"sap/m/MessageBox",
	"sap/ui/core/Core"
], function(BaseController) {
	"use strict";

	return BaseController.extend("router_demo.controller.employee.employee", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf router_demo.controller.controller.employee.view.employee
		 */
		onInit: function() {
			var oRouter = this.getRouter();
			//附加一个监听程序_onObjectMatched（因为OnInit只会初始化一次，再次点击的时候不会执行这个方法）
			oRouter.getRoute("employee")
				.attachPatternMatched(this._onObjectMatched, this);

			// var oModel = new sap.ui.model.json.JSONModel("model/employee_list.json");
			// this.getView().setModel(oModel);
			var oModel = this.getOwnerComponent().getModel("emplist");
			this.getView().setModel(oModel);
		},
		_onObjectMatched: function(oEvent) {
			//path 对应的是master中传递过来的参数名称，那个参数名称对应的是router pattern（）中的参数
			var oId = oEvent.getParameter("arguments").id;
			//var label = this.byId("__label1");
			// this.getView().bindElement({
			// 	path: "/items/(" + oId + ")"
			// });
			// "/items/"是JSON中的行，也是table 试图items="{}"中括号中的属性
			this.getView().bindElement("/items/" + (oId - 1));
			//label.bindElement("/items/0");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf router_demo.controller.controller.employee.view.employee
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf router_demo.controller.controller.employee.view.employee
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf router_demo.controller.controller.employee.view.employee
		 */
		//	onExit: function() {
		//
		//	}

	});

});