sap.ui.define([
	"router_demo/controller/BaseController",
	"sap/m/ViewSettingsDialog",
	"sap/m/ViewSettingsItem"
], function(BaseController, ViewSettingsDialog, ViewSettingsItem) {
	"use strict";
	var aFilters;
	var oModel, sCurrentPath, sCurrentUsr;

	return BaseController.extend("router_demo.controller.oData.EmpList", {

		onInit: function() {
			oModel = this.getOwnerComponent().getModel("zemployee");
			oModel.setUseBatch(false);
			this.getView().setModel(oModel);
			//初始一个值用户判断前两次搜索的数据是否是同一个
			this.isFilter = null;
			this._table = this.byId("table_id");
			this.initViewSettingsDialog();
		},
		initViewSettingsDialog: function() {
			this._oVSD = new ViewSettingsDialog("vsd", {
				confirm: function(oEvent) {
					var oSortItem = oEvent.getParameter("sortItem");
					var fieldname = oSortItem.getKey();
					var issort = oEvent.getParameter("sortDescending");
					var oSorter = new sap.ui.model.Sorter(fieldname, issort);
					var oBinding = this._table.getBinding("items");
					oBinding.sort(oSorter);
				}.bind(this),
				cancel: function(oEvent) {}.bind(this)
			});

			// init sorting (with simple sorters as custom data for all fields)
			this._oVSD.addSortItem(new ViewSettingsItem({
				key: "Empid",
				text: "用户ID",
				selected: true // by default the MockData is sorted by EmployeeID
			}));

			this._oVSD.addSortItem(new ViewSettingsItem({
				key: "Empname",
				text: "姓名",
				selected: false
			}));
		},
		onOpenDialog: function() {
			this._oVSD.open();
		},
		onSort: function(oEvent) {
			//返回按键文本
			oEvent.getSource().getText();
			//第二个参数是是否通过descending降序排序
			var oSorter = new sap.ui.model.Sorter("Empid", false);
			var oSorter2 = new sap.ui.model.Sorter("Empname", true);
			var oBinding = this._table.getBinding("items");
			//oBinding.sort(oSorter);
			oBinding.sort([oSorter, oSorter2]);
		},
		onRead: function() {
			var sInputValue = this.getView().byId("search_input_id").getValue();
			//如果前后两次搜索是同一个数据，就直接返回
			if (this.isFilter === sInputValue) {
				return;
			}
			this.isFilter = sInputValue;

			if (sInputValue === "") {
				aFilters = [new sap.ui.model.Filter("Empid",
					//sap.ui.model.FilterOperator.Contains,
					sap.ui.model.FilterOperator.eq,
					"*")];
			} else {
				aFilters = [
					new sap.ui.model.Filter("Empid", sap.ui.model.FilterOperator.Contains, sInputValue)
				];
				//添加 Empname 字段作为筛选条件
				aFilters.push(new sap.ui.model.Filter("Empname", sap.ui.model.FilterOperator.Contains, sInputValue));
			}

			// get data using filter
			oModel.read("/EmployeeCollection", {
				filters: aFilters,
				success: function(oData, oResponse) {
					window.console.log(oData);
				},
				error: function(oError) {
					window.console.log("Error", oError);
				}
			});
			var oTable = this.getView().byId("table_id");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(aFilters);
		},

		openDialog: function() {
			var oView = this.getView();
			// Open dialog
			var oUsrDialog = oView.byId("UsrDialog");
			if (!oUsrDialog) {
				oUsrDialog = sap.ui.xmlfragment(oView.getId(),
					"router_demo.view.oData.UsrDialog"); //试图位置
				oView.addDependent(oUsrDialog);
			}
			oUsrDialog.open();
			// Attach press event for CancelButton
			var oCancelButton = oView.byId("CancelButton");
			oCancelButton.attachPress(function() {
				oUsrDialog.close();
			});
		},
		// onCreate event
		onCreate: function() {
			sap.m.MessageToast.show("Create starting.");
			var oView = this.getView();
			this.openDialog();
			var oUsrDialog = oView.byId("UsrDialog");
			oUsrDialog.setTitle("Create User");
			oView.byId("Empid").setEditable(true);
			oView.byId("SaveEdit").setVisible(false);
			oView.byId("SaveCreate").setVisible(true);
			// clear
			oView.byId("Empid").setValue("");
			oView.byId("Empname").setValue("");
			oView.byId("Empaddr").setValue("");
			// commit save
			oView.byId("SaveCreate").attachPress(function() {
				var oNewEntry = {
					"Mandt": "400",
					"Empid": "",
					"Empname": "",
					"Empaddr": ""
				};
				// populate value from form
				oNewEntry.Empid = oView.byId("Empid").getValue();
				oNewEntry.Empname = oView.byId("Empname").getValue();
				oNewEntry.Empaddr = oView.byId("Empaddr").getValue();

				if (!oNewEntry.Empid) {
					sap.m.MessageToast.show("Please input the value of Usrid");
					return;
				} else {
					// Commit creation operation
					oModel.create("/EmployeeCollection", oNewEntry, {
						success: function() {
							sap.m.MessageToast.show("Created successfully.");
						},
						error: function(oError) {
							window.console.log("Error", oError);
							sap.m.MessageToast.show("创建失败/r/n" + oError.message + "/r/n" + oError.statusCode + "/r/n" + oError.responseText);
						}
					});
				}

				// close dialog
				if (oUsrDialog) {
					oUsrDialog.close();
				}
			});
		},
		//onEdit event
		onEdit: function() {
			// no Item was selected
			if (!sCurrentUsr) {
				sap.m.MessageToast.show("No Item was selected.");
				return;
			}
			var oView = this.getView();
			this.openDialog();
			var oUsrDialog = oView.byId("UsrDialog");
			oUsrDialog.setTitle("Edit User");
			oView.byId("Empid").setEditable(false);
			oView.byId("SaveEdit").setVisible(true);
			oView.byId("SaveCreate").setVisible(false);
			// populate fields
			oView.byId("Empid").setValue(oModel.getProperty(sCurrentPath + "/Empid"));
			oView.byId("Empname").setValue(oModel.getProperty(sCurrentPath + "/Empname"));
			oView.byId("Empaddr").setValue(oModel.getProperty(sCurrentPath + "/Empaddr"));
			// Attach save event
			oView.byId("SaveEdit").attachPress(function() {
				var oChanges = {
					"Mandt": "400",
					"Empid": "",
					"Empname": "",
					"Empaddr": ""
				};
				// populate value from form
				oChanges.Empid = oView.byId("Empid").getValue();
				oChanges.Empname = oView.byId("Empname").getValue();
				oChanges.Empaddr = oView.byId("Empaddr").getValue();
				// commit creation
				oModel.update(sCurrentPath, oChanges, {
					success: function() {
						sap.m.MessageToast.show("Changes were saved successfully.");
					},
					error: function(oError) {
						window.console.log("Error", oError);
						sap.m.MessageToast.show("数据更新失败" + oError.message + oError.statusCode + oError.responseText);
					}
				});
				// close dialog
				if (oUsrDialog) {
					oUsrDialog.close();
				}
			});
		},
		// onDelete event
		onDelete: function() {
			var that = this;
			// no Item was selected
			if (!sCurrentUsr) {
				sap.m.MessageToast.show("No Item was selected.");
				return;
			}
			var oDeleteDialog = new sap.m.Dialog();
			oDeleteDialog.setTitle("Deletion");
			var oText = new sap.m.Label({
				text: "Are you sure to delete UsrId [" + sCurrentUsr + "]?"
			});
			oDeleteDialog.addContent(oText);
			oDeleteDialog.addButton(
				new sap.m.Button({
					text: "Confirm",
					press: function() {
						that.deleteUsr();
						oDeleteDialog.close();
					}
				})
			);
			oDeleteDialog.open();
		},
		// deletion operation
		deleteUsr: function() {
			oModel.remove(sCurrentPath, {
				success: function() {
					sap.m.MessageToast.show("Deletion successful.");
				},
				error: function(oError) {
					window.console.log("Error", oError);
				}
			});
		},

		onItemPress: function(evt) {
			var oContext = evt.getSource().getBindingContext();
			sCurrentPath = oContext.getPath();
			sCurrentUsr = oContext.getProperty("Empid");
		},

		//Input usrid value help
		handleValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"router_demo.view.oData.InputUsridDialog",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}

			//create a filter for the binding
			this._valueHelpDialog.getBinding("items").filter([new sap.ui.model.Filter(
				"Empid",
				//sap.ui.model.FilterOperator.Contains, sInputValue
				sap.ui.model.FilterOperator.eq, sInputValue
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
		},

		_handleValueHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"Empname",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},

		_handleValueHelpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId),
					//oText = this.byId('selectedKey'),
					sDescription = oSelectedItem.getDescription();

				productInput.setSelectedKey(sDescription);
				//oText.setText(sDescription);
			}
			evt.getSource().getBinding("items").filter([]);
		},

		suggestionItemSelected: function(evt) {
			var oItem = evt.getParameter('selectedItem'),
				oText = this.byId('selectedKey'),
				sKey = oItem ? oItem.getKey() : '';
			oText.setText(sKey);
		}

	});

});