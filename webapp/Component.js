sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"router_demo/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("router_demo.controller.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			//初始化router,没有这句话无法将组件初始路由
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});