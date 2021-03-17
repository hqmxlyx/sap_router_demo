sap.ui.define([
	"router_demo/controller/BaseController",
	"sap/m/MessageBox"
], function(BaseController) {
	"use strict";

	return BaseController.extend("router_demo.controller.List", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf router_demo.controller.controller.view.List
		 */
		onInit: function() {
			var oModel1 = new sap.ui.model.json.JSONModel("model/list.json");
			var oModel2 = new sap.ui.model.json.JSONModel("model/employee_list.json");
			//系统运行有一个默认的模型
			this.getView().setModel(oModel1);
			//其他模型需要加上名称，访问时itmes="{model2>/items} 元素也要{model2>id}"
			this.getView().setModel(oModel2, "model2");
		},
		onPress: function() {
			//返回系统语言
			var language = sap.ui.getCore().getConfiguration().getLanguage();
			sap.m.MessageBox.alert(language);

			//通过加载资源对象来获取对象的国际化文件
			var oResourceModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl: "i18n/i18n.properties"
			});
			sap.ui.getCore().setModel(oResourceModel, "i18n.properties");
			var resourceModel = sap.ui.getCore().getModel("i18n.properties");
			//var resourcebuild = sap.ui.getCore().getLoadedLibraries();
			if (resourceModel !== undefined) {
				var alertText = resourceModel.getProperty("appback");
				alertText = alertText.replace("'", '');
				alertText = alertText.replace("'", '');
				sap.m.MessageBox.alert(alertText);
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf router_demo.controller.controller.view.List
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf router_demo.controller.controller.view.List
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf router_demo.controller.controller.view.List
		 */
		//	onExit: function() {
		//
		//	}

	});

});