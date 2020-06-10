sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/UploadCollectionParameter"
], function (Controller,MessageToast,UploadCollectionParameter) {
	"use strict";

	return Controller.extend("zcreate_request.zcreate_request", {
		onInit: function () {
		  var link = window.location.origin + '/sap/opu/odata/sap/ZCREATE_REQUEST_GW_SRV/';
		  requestAbsenceCollection =[];
		  changeModeWorkCollection=[];
		  var oView = this.getView();
		  var listTypeRequest = oView.byId("typeRequest");
		  var inputClock=oView.byId("inputClock");
		  var inputClockChangeWork=oView.byId("inputClockChangeWork");
		  var oModel =  new sap.ui.model.odata.ODataModel(link,false);
			  oModel.read("/TypesRequestSet", null, null, false, function(oData, oResponse) {
					parseListModel = oData.results;
			  });
			  oModel.read("/FullNameSet", null, null, false, function(oData, oResponse) {
				  FullName = oData.results;
			  });
			  FullName=FullName[0].NachnVorna;
		  if (parseListModel.length>0){
		    	parseListModel.forEach(function(item, j, parseListModel){
		    		if (item.CatDesc == 2){
		    			var timeObj={};
		    			timeObj.TypeCode=item.TypeCode;
		    			timeObj.Desc=item.Desc;
		    			requestAbsenceCollection.push(timeObj);
		    		}
		    		else if (item.CatDesc == 3){
		    			var timeObj={};
		    			timeObj.TypeCode=item.TypeCode;
		    			timeObj.Desc=item.Desc;
		    			changeModeWorkCollection.push(timeObj);
		    		}
				 });
		    }
		 this.getView().setModel(oModel);
		 var typeRequestModel = new sap.ui.model.json.JSONModel(requestAbsenceCollection);
		  var itemTypeRequest = new sap.ui.core.Item({
		        key:"{TypeCode}",
		        text:"{Desc}",
		      })
		  listTypeRequest.setModel(typeRequestModel);
		  listTypeRequest.bindItems({
		        path:'/',
		        template: itemTypeRequest,
		        templateShareable: true
		      });
		},
////////////////////////////////////////////////////////////////////Функция для определения Формы данных о заявке НАЧАЛО(измен)
		categoryDefinitionApplication:function(){
			var typeRequestGroup = this.getView().byId("typeRequestGroup");
			switch(typeRequestGroup.getSelectedIndex()){
			case 0:
				this.changeDataRequestForm();
				break;
			case 1:
				this.changeDataApplicationChangeWork();
				break;
			}
		},
////////////////////////////////////////////////////////////////////Функция для определения Формы данных о заявке КОНЕЦ
		
////////////////////////////////////////////////////////////////////Функция для формирования времени при выборе даты НАЧАЛО
		createFiltersForClock:function(oEvent){
			var oFilters = [];
			var listTypeRequest = this.getView().byId("typeRequest");
			var selectItem= listTypeRequest.getSelectedItem();
			
			 var inputDataChangeWork = this.getView().byId("inputDataChangeWork");
			 var inputDataFromChangeWork = this.getView().byId("inputDataFromChangeWork");
			 var inputDataOnChangeWork = this.getView().byId("inputDataOnChangeWork");
			 var inputProcessingDateChangeWork = this.getView().byId("inputProcessingDateChangeWork");
			 
			 var inputDateProcessing = this.getView().byId("inputDateProcessing");
			 var inputDateFrom = this.getView().byId("inputDateFrom");
			 var inputDateOn = this.getView().byId("inputDateOn");
			 var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd"});
			
			 var inputClock = this.getView().byId("inputClock");
			 var inputClockChangeWork = this.getView().byId("inputClockChangeWork");
			 
			 switch(selectItem.getKey()){
			 	case'13':
			 		if(inputDateProcessing.getValue()!==""){
			 			oFilters.push( new sap.ui.model.Filter("Begda",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputDateProcessing.getDateValue()))));
			 			oFilters.push( new sap.ui.model.Filter("Endda",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputDateProcessing.getDateValue()))));	
			 			oFilters.push( new sap.ui.model.Filter("Type",sap.ui.model.FilterOperator.EQ,selectItem.getKey()));	
			 			this.loadClockModel(inputClock,oFilters)
			 			this.feelingTableRuntimeTable(oDateFormat.format(new Date(inputDateProcessing.getDateValue())));
			 		}
			 		break;
			 	case'14':
			 		if(inputDateOn.getValue()!=="" && inputDateFrom.getValue()!==""){
			 			oFilters.push( new sap.ui.model.Filter("Begda",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputDateFrom.getDateValue()))));
			 			oFilters.push( new sap.ui.model.Filter("Endda",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputDateOn.getDateValue()))));	
			 			oFilters.push( new sap.ui.model.Filter("Type",sap.ui.model.FilterOperator.EQ,selectItem.getKey()));	
			 			this.loadClockModel(inputClock,oFilters)
			 		}
			 		break;
			 	case'15':
			 		if(inputDateOn.getValue()!=="" && inputDateFrom.getValue()!==""){
			 			oFilters.push( new sap.ui.model.Filter("Begda",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputDateFrom.getDateValue()))));
			 			oFilters.push( new sap.ui.model.Filter("Endda",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputDateOn.getDateValue()))));	
			 			oFilters.push( new sap.ui.model.Filter("Type",sap.ui.model.FilterOperator.EQ,selectItem.getKey()));	
			 			this.loadClockModel(inputClock,oFilters)
			 		}
			 		break;
			 	case'17':
			 		if(inputDateOn.getValue()!=="" && inputDateFrom.getValue()!==""){
			 			oFilters.push( new sap.ui.model.Filter("Begda",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputDateFrom.getDateValue()))));
			 			oFilters.push( new sap.ui.model.Filter("Endda",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputDateOn.getDateValue()))));	
			 			oFilters.push( new sap.ui.model.Filter("Type",sap.ui.model.FilterOperator.EQ,selectItem.getKey()));	
			 			this.loadClockModel(inputClock,oFilters)
			 		}
			 		break;
			 	case'20':
			 		if(inputDataChangeWork.getValue()!==""){
			 			oFilters.push( new sap.ui.model.Filter("Begda",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputDataChangeWork.getDateValue()))));
			 			oFilters.push( new sap.ui.model.Filter("Endda",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputDataChangeWork.getDateValue()))));	
			 			oFilters.push( new sap.ui.model.Filter("Type",sap.ui.model.FilterOperator.EQ,selectItem.getKey()));	
			 			this.loadClockModel(inputClockChangeWork,oFilters)
			 		}
			 		break;
			 	case'43':
			 		if(inputProcessingDateChangeWork.getValue()!==""){
			 			oFilters.push( new sap.ui.model.Filter("Begda",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputProcessingDateChangeWork.getDateValue()))));
			 			oFilters.push( new sap.ui.model.Filter("Endda",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputProcessingDateChangeWork.getDateValue()))));	
			 			oFilters.push( new sap.ui.model.Filter("Type",sap.ui.model.FilterOperator.EQ,selectItem.getKey()));	
			 			this.loadClockModel(inputClockChangeWork,oFilters)
			 		}
			 		break;	
			 	case'33':
			 		if(inputDataFromChangeWork.getValue()!=="" && inputDataOnChangeWork .getValue()!==""){
			 			oFilters.push( new sap.ui.model.Filter("Workdate",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputDataFromChangeWork.getDateValue()))));
			 			oFilters.push( new sap.ui.model.Filter("Endda",sap.ui.model.FilterOperator.EQ,oDateFormat.format(new Date(inputDataOnChangeWork.getDateValue()))));	
			 			this.tableAbsencePeriodReadDate(oFilters)
			 		}
			 		break;
			 };
			
		},
/////////////////////////////////////////////////////////////////////Функция для формирования времени при выборе даты КОНЕЦ			
		
////////////////////////////////////////////////////////////////////Функция для формирования времени при выборе даты НАЧАЛО
		loadClockModel:function(inputClockActual,oFilters){
		    //var inputClockActual=oEvent.getSource();
		    var itemClock = new sap.ui.core.Item({
		        key:"{Timez}",
		        text:"{Timez}",
		      });
			if(oFilters.length == 3){
				inputClockActual.bindItems({
			      path:'/TimezListSet',
			      template: itemClock,
			      templateShareable: true,
			      filters: oFilters,
			    });
			}
		},
/////////////////////////////////////////////////////////////////////Функция для формирования времени при выборе даты КОНЕЦ		
		
/////////////////////////////////////////////////////////////////////Функция для перехода в DetailPage на Мобильном НАЧАЛО	
		goToDetail:function(){
			var mainSplitCont = this.getView().byId("mainSplitCont");
			mainSplitCont.toDetail(this.createId("mainDetailPage"));
		},
/////////////////////////////////////////////////////////////////////Функция для перехода в DetailPage на Мобильном КОНЕЦ
		
/////////////////////////////////////////////////////////////////////Функция для перехода в MasterPage на Мобильном НАЧАЛО
		onPressDetailBack:function(){
			var mainSplitCont = this.getView().byId("mainSplitCont");
			mainSplitCont.backMaster();
		},
/////////////////////////////////////////////////////////////////////Функция для перехода в MasterPage на Мобильном КОНЕЦ		
		
/////////////////////////////////////////////// Функция для динамического изменения компонентов Данных Заявки(Заявки Изменения РЕжима Работы) НАЧАЛО
		changeDataApplicationChangeWork:function(){
			var listTypeRequest = this.getView().byId("typeRequest");
			var selectItem= listTypeRequest.getSelectedItem();
			
			var labelDataChangeWork = this.getView().byId("labelDataChangeWork");
			var inputDataChangeWork = this.getView().byId("inputDataChangeWork");

			var labelLocationTrip = this.getView().byId("labelLocationTrip");
			var inputLocationTrip = this.getView().byId("inputLocationTrip");

			var labelGDVrule = this.getView().byId("labelGDVrule");
			var typeGDVrule = this.getView().byId("typeGDVrule");

			var labelDataFromChangeWork = this.getView().byId("labelDataFromChangeWork");
			var inputDataFromChangeWork = this.getView().byId("inputDataFromChangeWork");

			var labelDataFOnChangeWork = this.getView().byId("labelDataFOnChangeWork");
			var inputDataOnChangeWork = this.getView().byId("inputDataOnChangeWork");

			var labelProcessingDateChangeWork = this.getView().byId("labelProcessingDateChangeWork");
			var inputProcessingDateChangeWork = this.getView().byId("inputProcessingDateChangeWork");

			var labelClockChangeWork = this.getView().byId("labelClockChangeWork");
			var inputClockChangeWork = this.getView().byId("inputClockChangeWork");

			var labelNameOrganization = this.getView().byId("labelNameOrganization");
			var inputNameOrganization = this.getView().byId("inputNameOrganization");

			var labelPurposeTrip = this.getView().byId("labelPurposeTrip");
			var inputPurposeTrip = this.getView().byId("inputPurposeTrip");

			var labelProjFactChangeWork = this.getView().byId("labelProjFactChangeWork");
			var inputFactProjChangeWork = this.getView().byId("inputFactProjChangeWork");

			var labelAbsencePeriod = this.getView().byId("labelAbsencePeriod");
			var tableAbsencePeriod = this.getView().byId("tableAbsencePeriod");
			 switch(selectItem.getKey()){
			 case '07':
				 labelDataChangeWork.setVisible(false);
				 inputDataChangeWork.setVisible(false);

				 labelLocationTrip.setVisible(true); 
				 inputLocationTrip.setVisible(true); 

				 labelGDVrule.setVisible(false); 
				 typeGDVrule.setVisible(false); 

				 labelDataFromChangeWork.setVisible(true); 
				 inputDataFromChangeWork.setVisible(true); 

				 labelDataFOnChangeWork.setVisible(true); 
				 inputDataOnChangeWork.setVisible(true); 

				 labelProcessingDateChangeWork.setVisible(false); 
				 inputProcessingDateChangeWork.setVisible(false); 

				 labelClockChangeWork.setVisible(false);
				 inputClockChangeWork.setVisible(false); 

				 labelNameOrganization.setVisible(true);
				 inputNameOrganization.setVisible(true); 

				 labelPurposeTrip.setVisible(true);
				 inputPurposeTrip.setVisible(true);

				 labelProjFactChangeWork.setVisible(true);
				 inputFactProjChangeWork.setVisible(true); 

				 labelAbsencePeriod.setVisible(false); 
				 tableAbsencePeriod.setVisible(false); 
				 break;
			 case '20':
				 labelDataChangeWork.setVisible(true);
				 inputDataChangeWork.setVisible(true);

				 labelLocationTrip.setVisible(false); 
				 inputLocationTrip.setVisible(false); 

				 labelGDVrule.setVisible(false); 
				 typeGDVrule.setVisible(false); 

				 labelDataFromChangeWork.setVisible(false); 
				 inputDataFromChangeWork.setVisible(false); 

				 labelDataFOnChangeWork.setVisible(false); 
				 inputDataOnChangeWork.setVisible(false); 

				 labelProcessingDateChangeWork.setVisible(false); 
				 inputProcessingDateChangeWork.setVisible(false); 

				 labelClockChangeWork.setVisible(true);
				 inputClockChangeWork.setVisible(true); 

				 labelNameOrganization.setVisible(false);
				 inputNameOrganization.setVisible(false); 

				 labelPurposeTrip.setVisible(false);
				 inputPurposeTrip.setVisible(false);

				 labelProjFactChangeWork.setVisible(true);
				 inputFactProjChangeWork.setVisible(true); 

				 labelAbsencePeriod.setVisible(false); 
				 tableAbsencePeriod.setVisible(false); 
				 break;
			 case '32':
				 labelDataChangeWork.setVisible(false);
				 inputDataChangeWork.setVisible(false);

				 labelLocationTrip.setVisible(false); 
				 inputLocationTrip.setVisible(false); 

				 labelGDVrule.setVisible(true); 
				 typeGDVrule.setVisible(true); 

				 labelDataFromChangeWork.setVisible(true); 
				 inputDataFromChangeWork.setVisible(true); 

				 labelDataFOnChangeWork.setVisible(true); 
				 inputDataOnChangeWork.setVisible(true); 

				 labelProcessingDateChangeWork.setVisible(false); 
				 inputProcessingDateChangeWork.setVisible(false); 

				 labelClockChangeWork.setVisible(false);
				 inputClockChangeWork.setVisible(false); 

				 labelNameOrganization.setVisible(false);
				 inputNameOrganization.setVisible(false); 

				 labelPurposeTrip.setVisible(false);
				 inputPurposeTrip.setVisible(false);

				 labelProjFactChangeWork.setVisible(false);
				 inputFactProjChangeWork.setVisible(false); 

				 labelAbsencePeriod.setVisible(false); 
				 tableAbsencePeriod.setVisible(false); 
				 break;
			 case '33':
				 labelDataChangeWork.setVisible(false);
				 inputDataChangeWork.setVisible(false);

				 labelLocationTrip.setVisible(false); 
				 inputLocationTrip.setVisible(false); 

				 labelGDVrule.setVisible(false); 
				 typeGDVrule.setVisible(false); 

				 labelDataFromChangeWork.setVisible(true); 
				 inputDataFromChangeWork.setVisible(true); 

				 labelDataFOnChangeWork.setVisible(true); 
				 inputDataOnChangeWork.setVisible(true); 

				 labelProcessingDateChangeWork.setVisible(false); 
				 inputProcessingDateChangeWork.setVisible(false); 

				 labelClockChangeWork.setVisible(false);
				 inputClockChangeWork.setVisible(false); 

				 labelNameOrganization.setVisible(false);
				 inputNameOrganization.setVisible(false); 

				 labelPurposeTrip.setVisible(false);
				 inputPurposeTrip.setVisible(false);

				 labelProjFactChangeWork.setVisible(true);
				 inputFactProjChangeWork.setVisible(true); 

				 labelAbsencePeriod.setVisible(true); 
				 tableAbsencePeriod.setVisible(true); 
				 break;
			 case '37':
				 labelDataChangeWork.setVisible(false);
				 inputDataChangeWork.setVisible(false);

				 labelLocationTrip.setVisible(false); 
				 inputLocationTrip.setVisible(false); 

				 labelGDVrule.setVisible(false); 
				 typeGDVrule.setVisible(false); 

				 labelDataFromChangeWork.setVisible(true); 
				 inputDataFromChangeWork.setVisible(true); 

				 labelDataFOnChangeWork.setVisible(true); 
				 inputDataOnChangeWork.setVisible(true); 

				 labelProcessingDateChangeWork.setVisible(false); 
				 inputProcessingDateChangeWork.setVisible(false); 

				 labelClockChangeWork.setVisible(false);
				 inputClockChangeWork.setVisible(false); 

				 labelNameOrganization.setVisible(false);
				 inputNameOrganization.setVisible(false); 

				 labelPurposeTrip.setVisible(false);
				 inputPurposeTrip.setVisible(false);

				 labelProjFactChangeWork.setVisible(true);
				 inputFactProjChangeWork.setVisible(true); 

				 labelAbsencePeriod.setVisible(false); 
				 tableAbsencePeriod.setVisible(false); 
				 break;
			 case '43':
				 labelDataChangeWork.setVisible(false);
				 inputDataChangeWork.setVisible(false);

				 labelLocationTrip.setVisible(false); 
				 inputLocationTrip.setVisible(false); 

				 labelGDVrule.setVisible(false); 
				 typeGDVrule.setVisible(false); 

				 labelDataFromChangeWork.setVisible(false); 
				 inputDataFromChangeWork.setVisible(false); 

				 labelDataFOnChangeWork.setVisible(false); 
				 inputDataOnChangeWork.setVisible(false); 

				 labelProcessingDateChangeWork.setVisible(true); 
				 inputProcessingDateChangeWork.setVisible(true); 

				 labelClockChangeWork.setVisible(true);
				 inputClockChangeWork.setVisible(true); 

				 labelNameOrganization.setVisible(false);
				 inputNameOrganization.setVisible(false); 

				 labelPurposeTrip.setVisible(false);
				 inputPurposeTrip.setVisible(false);

				 labelProjFactChangeWork.setVisible(true);
				 inputFactProjChangeWork.setVisible(true); 

				 labelAbsencePeriod.setVisible(false); 
				 tableAbsencePeriod.setVisible(false); 
				 break;
				 
			 }
		},
////////////////////////////////////////////////Функция для динамического изменения компонентов Данных Заявки(Заявки Изменения РЕжима Работы) КОНЕЦ
		
//////////////////////////////////////////////////////////// Функция для динамического изменения компонентов Данных Заявки(Заявки отсутствия) НАЧАЛО
		changeDataRequestForm:function(){
			 var oView = this.getView();
			 var listTypeRequest = oView.byId("typeRequest");
//////////////////////////////////////////////////Инициализируем элементы данных для заявки с нашей View НАЧАЛО
			 var labelIdRequest = oView.byId("labelIdRequest");
			 var inputIdRequest = oView.byId("inputRequestId");
			 
			 var typeRequestLabel = oView.byId("typeRequestLabel");
			 var typeRequestInput = oView.byId("typeRequestInput");
			 
			 var labelPernrToForm = oView.byId("labelPernrToForm");
			 var inputPernr = oView.byId("inputPernr");
			 
			 var labelPresence = oView.byId("labelPresence");
			 var typePresence = oView.byId("typePresence");
			 
			 var labelPresence = oView.byId("labelPresence");
			 var typePresence = oView.byId("typePresence");
			 
			 var labelDateProcessing = oView.byId("labelDateProcessing");
			 var inputDateProcessing = oView.byId("inputDateProcessing");
			 
			 var labelDateFrom = oView.byId("labelDateFrom");
			 var inputDateFrom = oView.byId("inputDateFrom");
			 
			 var labelDateOn = oView.byId("labelDateOn");
			 var inputDateOn = oView.byId("inputDateOn");
			 
			 var clockLabel = oView.byId("clockLabel");
			 var inputClock = oView.byId("inputClock");
			 
			 var RuntimeLabel = oView.byId("RuntimeLabel");
			 var runtimeTable = oView.byId("runtimeTable");
			 
			 var labelLoadRequest = oView.byId("labelLoadRequest");
			 var uploadLoadRequest = oView.byId("uploadLoadRequest");
			 
			 var labelFactProj = oView.byId("labelFactProj");
			 var inputFactProj = oView.byId("inputFactProj");

			//  yyd образец заявления
			var labelLoadRequestPrototype = oView.byId("labelLoadRequestPrototype"); 
			var ButtonPrototypeDownload = oView.byId("ButtonPrototypeDownload"); 


//////////////////////////////////////////////////Инициализируем элементы данных для заявки с нашей View КОНЕЦ
			 var selectItem= listTypeRequest.getSelectedItem();
			 switch(selectItem.getKey()){
			 case '13':
				 	labelIdRequest.setVisible(false);
					inputIdRequest.setVisible(false);
				 
				 	typeRequestLabel.setVisible(false);
				 	typeRequestInput.setVisible(false);
					 
					labelPernrToForm.setVisible(false);
					inputPernr.setVisible(false);
					 
					labelPresence.setVisible(false);
					typePresence.setVisible(false);
					 
					labelPresence.setVisible(false);
					typePresence.setVisible(false);
					 
					labelDateProcessing.setVisible(true);
					inputDateProcessing.setVisible(true);
					 
					labelDateFrom.setVisible(false);
					inputDateFrom.setVisible(false);
					 
					labelDateOn.setVisible(false);
					inputDateOn.setVisible(false);
					 
					clockLabel.setVisible(true);
					inputClock.setVisible(true);
					 
					RuntimeLabel.setVisible(true);
					runtimeTable.setVisible(true);
					 
					labelLoadRequest.setVisible(false);
					uploadLoadRequest.setVisible(false);

					// yyd образец заявления
					labelLoadRequestPrototype.setVisible(false);
					ButtonPrototypeDownload.setVisible(false);
					 
					labelFactProj.setVisible(false);
					inputFactProj.setVisible(false);
					
					inputPernr.setEnabled(false);
					inputDateFrom.setEnabled(true);
					inputDateOn.setEnabled(true);
					
				 break;
			 case '15':
			 case '17':	 
				    labelIdRequest.setVisible(false);
					inputIdRequest.setVisible(false);
					
				    typeRequestLabel.setVisible(false);
				    typeRequestInput.setVisible(false);
					 
					labelPernrToForm.setVisible(false);
					inputPernr.setVisible(false);
					 
					labelPresence.setVisible(false);
					typePresence.setVisible(false);
					 
					labelPresence.setVisible(false);
					typePresence.setVisible(false);
					 
					labelDateProcessing.setVisible(false);
					inputDateProcessing.setVisible(false);
					 
					labelDateFrom.setVisible(true);
					inputDateFrom.setVisible(true);
					 
					labelDateOn.setVisible(true);
					inputDateOn.setVisible(true);
					 
					clockLabel.setVisible(true);
					inputClock.setVisible(true);
					 
					RuntimeLabel.setVisible(false);
					runtimeTable.setVisible(false);
					 
					labelLoadRequest.setVisible(true);
					uploadLoadRequest.setVisible(true);

					// yyd образец заявления
					labelLoadRequestPrototype.setVisible(true);
					ButtonPrototypeDownload.setVisible(true);
					 
					labelFactProj.setVisible(false);
					inputFactProj.setVisible(false);
					
					inputPernr.setEnabled(false);
					inputDateFrom.setEnabled(true);
					inputDateOn.setEnabled(true);
				 break;
			 case '16':	 
				    labelIdRequest.setVisible(false);
					inputIdRequest.setVisible(false);
					
				    typeRequestLabel.setVisible(false);
				    typeRequestInput.setVisible(false);
					 
					labelPernrToForm.setVisible(false);
					inputPernr.setVisible(false);
					 
					labelPresence.setVisible(false);
					typePresence.setVisible(false);
					 
					labelPresence.setVisible(false);
					typePresence.setVisible(false);
					 
					labelDateProcessing.setVisible(false);
					inputDateProcessing.setVisible(false);
					 
					labelDateFrom.setVisible(true);
					inputDateFrom.setVisible(true);
					 
					labelDateOn.setVisible(true);
					inputDateOn.setVisible(true);
					 
					clockLabel.setVisible(false);
					inputClock.setVisible(false);
					 
					RuntimeLabel.setVisible(false);
					runtimeTable.setVisible(false);
					 
					labelLoadRequest.setVisible(true);
					uploadLoadRequest.setVisible(true);

					// yyd образец заявления
					labelLoadRequestPrototype.setVisible(true);
					ButtonPrototypeDownload.setVisible(true);
					 
					labelFactProj.setVisible(false);
					inputFactProj.setVisible(false);
					
					inputPernr.setEnabled(false);
					inputDateFrom.setEnabled(true);
					inputDateOn.setEnabled(true);
				 break;
			 case'23':
				    labelIdRequest.setVisible(false);
					inputIdRequest.setVisible(false);
					
					typeRequestLabel.setVisible(false);
					typeRequestInput.setVisible(false);
					 
					labelPernrToForm.setVisible(false);
					inputPernr.setVisible(false);
					 
					labelPresence.setVisible(false);
					typePresence.setVisible(false);
					 
					labelPresence.setVisible(true);
					typePresence.setVisible(true);
					 
					labelDateProcessing.setVisible(false);
					inputDateProcessing.setVisible(false);
					 
					labelDateFrom.setVisible(true);
					inputDateFrom.setVisible(true);
					 
					labelDateOn.setVisible(true);
					inputDateOn.setVisible(true);
					 
					clockLabel.setVisible(false);
					inputClock.setVisible(false);
					 
					RuntimeLabel.setVisible(false);
					runtimeTable.setVisible(false);
					 
					labelLoadRequest.setVisible(false);
					uploadLoadRequest.setVisible(false);

					// yyd образец заявления
					labelLoadRequestPrototype.setVisible(false);
					ButtonPrototypeDownload.setVisible(false);
					 
					labelFactProj.setVisible(false);
					inputFactProj.setVisible(false);
					
					inputPernr.setEnabled(false);
					inputDateFrom.setEnabled(true);
					inputDateOn.setEnabled(true);
				 break;
			 case'22':
					labelIdRequest.setVisible(true);
					inputIdRequest.setVisible(true);
					
					typeRequestLabel.setVisible(true);
					typeRequestInput.setVisible(true);
					 
					labelPernrToForm.setVisible(true);
					inputPernr.setVisible(true);
					 
					labelPresence.setVisible(false);
					typePresence.setVisible(false);
					 
					labelPresence.setVisible(false);
					typePresence.setVisible(false);
					 
					labelDateProcessing.setVisible(false);
					inputDateProcessing.setVisible(false);
					 
					labelDateFrom.setVisible(true);
					inputDateFrom.setVisible(true);
					 
					labelDateOn.setVisible(true);
					inputDateOn.setVisible(true);
					 
					clockLabel.setVisible(false);
					inputClock.setVisible(false);
					 
					RuntimeLabel.setVisible(false);
					runtimeTable.setVisible(false);
					 
					labelLoadRequest.setVisible(false);
					uploadLoadRequest.setVisible(false);

					// yyd образец заявления
					labelLoadRequestPrototype.setVisible(false);
					ButtonPrototypeDownload.setVisible(false);
					 
					labelFactProj.setVisible(true);
					inputFactProj.setVisible(true);
					
					inputPernr.setEnabled(false);
					inputDateFrom.setEnabled(false);
					inputDateOn.setEnabled(false);
				 break;
			 case'14':
					labelIdRequest.setVisible(false);
					inputIdRequest.setVisible(false);
					
					typeRequestLabel.setVisible(false);
					typeRequestInput.setVisible(false);
					 
					labelPernrToForm.setVisible(false);
					inputPernr.setVisible(false);
					 
					labelPresence.setVisible(false);
					typePresence.setVisible(false);
					 
					labelPresence.setVisible(false);
					typePresence.setVisible(false);
					 
					labelDateProcessing.setVisible(false);
					inputDateProcessing.setVisible(false);
					 
					labelDateFrom.setVisible(true);
					inputDateFrom.setVisible(true);
					 
					labelDateOn.setVisible(true);
					inputDateOn.setVisible(true);
					 
					clockLabel.setVisible(true);
					inputClock.setVisible(true);
					 
					RuntimeLabel.setVisible(false);
					runtimeTable.setVisible(false);
					 
					labelLoadRequest.setVisible(false);
					uploadLoadRequest.setVisible(false);

					// yyd образец заявления
					labelLoadRequestPrototype.setVisible(false);
					ButtonPrototypeDownload.setVisible(false);
					 
					labelFactProj.setVisible(false);
					inputFactProj.setVisible(false);
					
					inputPernr.setEnabled(false);
					inputDateFrom.setEnabled(true);
					inputDateOn.setEnabled(true);
				 break;
			default:
				labelIdRequest.setVisible(false);
				inputIdRequest.setVisible(false);
				
				typeRequestLabel.setVisible(false);
				typeRequestInput.setVisible(false);
				 
				labelPernrToForm.setVisible(false);
				inputPernr.setVisible(false);
				 
				labelPresence.setVisible(false);
				typePresence.setVisible(false);
				 
				labelPresence.setVisible(false);
				typePresence.setVisible(false);
				 
				labelDateProcessing.setVisible(false);
				inputDateProcessing.setVisible(false);
				 
				labelDateFrom.setVisible(true);
				inputDateFrom.setVisible(true);
				 
				labelDateOn.setVisible(true);
				inputDateOn.setVisible(true);
				 
				clockLabel.setVisible(false);
				inputClock.setVisible(false);
				 
				RuntimeLabel.setVisible(false);
				runtimeTable.setVisible(false);
				 
				labelLoadRequest.setVisible(false);
				uploadLoadRequest.setVisible(false);

				// yyd образец заявления
				labelLoadRequestPrototype.setVisible(false);
				ButtonPrototypeDownload.setVisible(false);
				 
				labelFactProj.setVisible(false);
				inputFactProj.setVisible(false);
				
				inputPernr.setEnabled(true);
				inputDateFrom.setEnabled(true);
				inputDateOn.setEnabled(true);
				break;
			 }
		},
////////////////////////////////////////////////////////////////////Функция для динамического изменения компонентов Данных Заявки КОНЕЦ
		
////////////////////////////////////////////////////////////////////Функция для очистки всех полей Данных Заявки НАЧАЛО
		clearDataApp: function(){
			 var oView = this.getView();
			 var inputIdRequest = oView.byId("inputRequestId");
			 var typeRequestInput = oView.byId("typeRequestInput");
			 var inputPernr = oView.byId("inputPernr");
			 var inputDateProcessing = oView.byId("inputDateProcessing");
			 var inputDateFrom = oView.byId("inputDateFrom");
			 var inputDateOn = oView.byId("inputDateOn");
			 var inputClock = oView.byId("inputClock");
			 var inputFactProj = oView.byId("inputFactProj");
			 
			 var inputDataChangeWork = this.getView().byId("inputDataChangeWork");
			 var inputLocationTrip = this.getView().byId("inputLocationTrip");
			 var inputDataFromChangeWork = this.getView().byId("inputDataFromChangeWork");
			 var inputDataOnChangeWork = this.getView().byId("inputDataOnChangeWork");
			 var inputProcessingDateChangeWork = this.getView().byId("inputProcessingDateChangeWork");
			 var inputClockChangeWork = this.getView().byId("inputClockChangeWork");
			 var inputNameOrganization = this.getView().byId("inputNameOrganization");
			 var inputPurposeTrip = this.getView().byId("inputPurposeTrip");
			 var inputFactProjChangeWork = this.getView().byId("inputFactProjChangeWork");
			 var listComment=this.getView().byId("listComment");
			 
			 var uploadLoadRequest=this.getView().byId("uploadLoadRequest");
			 
			 inputIdRequest.setValue("");
			 typeRequestInput.setValue("");
			 inputPernr.setValue("");
			 inputDateProcessing.setValue("");
			 inputDateFrom.setValue("");
			 inputDateOn.setValue("");
			 inputClock.destroyItems();
			 inputFactProj.destroyTokens();
			
			 inputDataChangeWork.setValue("");
			 inputLocationTrip.setValue("");
			 inputDataFromChangeWork.setValue("");
			 inputDataOnChangeWork.setValue("");
			 inputProcessingDateChangeWork.setValue("");
			 inputClockChangeWork.destroyItems();
			 inputNameOrganization.setValue("");
			 inputPurposeTrip.setValue("");
			 inputFactProjChangeWork.destroyTokens();
			 listComment.destroyItems();
			 
			 uploadLoadRequest.removeAllHeaderParameters();
			 uploadLoadRequest.removeAllItems(); 
			 uploadLoadRequest.removeAllParameters();
		},
////////////////////////////////////////////////////////////////////Функция для очистки всех полей Данных Заявки КОНЕЦ	


		
////////////////////////////////////////////////////////////////////Функция для динамического изменения Листбокса втипа заявки НАЧАЛО
		changeDataComboBox: function(){
			 var oView = this.getView();
			 var listTypeRequest = oView.byId("typeRequest");
			 var typeGroupBut = oView.byId("typeRequestGroup");
			 var selectBut = typeGroupBut.getSelectedIndex();
			switch(selectBut){
			case 0:
				 var typeRequestModel = new sap.ui.model.json.JSONModel(requestAbsenceCollection);
				 listTypeRequest.setModel(typeRequestModel);
				break;
			case 1:
				var typeRequestModel = new sap.ui.model.json.JSONModel(changeModeWorkCollection);
				 listTypeRequest.setModel(typeRequestModel);
				break
			}
			this.setDiscardableProperty();
		},
////////////////////////////////////////////////////////////////////Функция для динамического изменения Листбокса втипа заявки КОНЕЦ
		
////////////////////////////////////////////////////////////////////Функция для сброса прогресса Wizard при изменении типа заявки НАЧАЛО		
		setDiscardableProperty : function () {
			var wizard = this.getView().byId("requestWizard");
			var downBut = this.getView().byId("downButton");
			var TypeRequestStep = this.getView().byId("TypeRequestStep");
			if (wizard.getProgressStep() !== TypeRequestStep) {
				wizard.discardProgress(TypeRequestStep);
				downBut.setEnabled(false);
			}
		},
////////////////////////////////////////////////////////////////////Функция для сброса прогресса Wizard при изменении типа заявки КОНЕЦ		
		
//////////////////////////////////////////Функция для перехода на ПЕРВЫЙ шаг создания заявки НАЧАЛО
		toOneStepWizard:function(){
			var mainNavContainer = this.byId("mainNavContainer");
			var wizard = this.getView().byId("requestWizard");
			mainNavContainer.to( this.getView().byId("wizardContentPage"),"flip");
			wizard.goToStep(this.getView().byId("TypeRequestStep"));
		},
//////////////////////////////////////////Функция для перехода на ПЕРВЫЙ шаг создания заявки КОНЕЦ	
		
		
		
//////////////////////////////////////////Функция для перехода на ВТОРОЙ шаг создания заявки НАЧАЛО
		toTwoStepWizard:function(){
			var mainNavContainer = this.byId("mainNavContainer");
			var wizard = this.getView().byId("requestWizard");
			var typeRequestGroup = this.getView().byId("typeRequestGroup");
			switch(typeRequestGroup.getSelectedIndex()){
			case 0:
				mainNavContainer.to( this.getView().byId("wizardContentPage"),"flip");
				wizard.goToStep(this.getView().byId("DataRequestStep"));
				break;
			case 1:
				mainNavContainer.to( this.getView().byId("wizardContentPage"),"flip");
				wizard.goToStep(this.getView().byId("changeModeWorkStep"));
				break;
			}
		},
//////////////////////////////////////////Функция для перехода на ВТОРОЙ шаг создания заявки КОНЕЦ
		
////////////////////////////////////////////////////////////////////Функция при изменении(добав/удал) UploadCollection НАЧАЛО		
		onChangeUploadCollection: function(oEvent) {
			var oUploadCollection = oEvent.getSource();
			// Header Token
			var csrfToken = this.getView().getModel().getSecurityToken();
			var oCustomerHeaderToken = new UploadCollectionParameter({
				name: "x-csrf-token",
				value: csrfToken,
			});
			oUploadCollection.addHeaderParameter(oCustomerHeaderToken);
			MessageToast.show("Файл успешно загружен!");
			// токен выносится в глобальную область видимости, для валидации файла
			window._globals = {
				csrfTokenAdd: csrfToken
			}
		},
		
////////////////////////////////////////////////////////////////////Функция при изменении(добав/удал) UploadCollection КОНЕЦ		

////////////////////////////////////////////////////////////////////Функция для загрузки файла при создании заявки НАЧАЛО
		onStartUpload: function(oEvent) {
			var oUploadCollection = this.byId("uploadLoadRequest");
			var cFiles = oUploadCollection.getItems().length;
			var uploadInfo = cFiles + " file(s)";
			var fileLink = window.location.origin + '/sap/opu/odata/sap/ZCREATE_REQUEST_GW_SRV/FileSet';
			// Это клон заявления. Нужен для того, чтобы в сапе не отваливалась заявка
			// var fileLinkTwo = window.location.origin + '/sap/opu/odata/sap/ZCREATE_REQUEST_GW_SRV/FileSet';
			oUploadCollection.setUploadUrl(fileLink);
			// oUploadCollection.setUploadUrl(fileLink, fileLinkTwo);
			oUploadCollection.upload();
			MessageToast.show("Method Upload is called (" + uploadInfo + ")");

			// if (cFiles > 0) {
			
			// } 
		},
////////////////////////////////////////////////////////////////////Функция для загрузки файла при создании заявки КОНЕЦ	

///////////////////////////////////////////////////////////////////Функция для скачивания образца заявления НАЧАЛО
		DownloadSampleDocument: function() {
			var oView = this.getView();
			var typeRequest = oView.byId("typeRequest");
			var selectItem= typeRequest.getSelectedItem();
			// прямые ссылки на шаблоны заявлений
			var сivilServiceTemplate = "/sap/opu/odata/sap/ZCREATE_REQUEST_GW_SRV/FileSet('Gos.docx')/$value";
			var dayOffTemplate = "/sap/opu/odata/sap/ZCREATE_REQUEST_GW_SRV/FileSet('VacationExpense.docx')/$value";
			var vacationTemplate = "/sap/opu/odata/sap/ZCREATE_REQUEST_GW_SRV/FileSet('Vacation.docx')/$value";
		
			switch(selectItem.getKey()){
				// отпуск за свой счет
				case '15': sap.m.URLHelper.redirect(dayOffTemplate,true);
					break;
				// отпуск
				case '16': sap.m.URLHelper.redirect(vacationTemplate,true);
					break;
				// гособязанности
				case '17': sap.m.URLHelper.redirect(сivilServiceTemplate,true); 
					break;
			}	 	
		},
	///////////////////////////////////////////////////////////////////Функция для скачивания образца заявления КОНЕЦ

////////////////////////////////////////////////////////////////////Функция для загрузки файла НАЧАЛО
		StartLoad:function(oEvent){
			var csrfToken = this.getView (). getModel (). oHeaders ['x-csrf-token'];
			var oUploadCollection = this.getView().byId("uploadLoadRequest");
			var oCustomerHeaderSlug = new UploadCollectionParameter({
				name: "slug",
				value: encodeURIComponent(oEvent.getParameter("fileName"))
			});
			oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);
			MessageToast.show("BeforeUploadStarts event triggered.");
		},
////////////////////////////////////////////////////////////////////Функция для загрузки файла КОНЕЦ

////////////////////////////////////////////////////////////////////Функция для окончания заргрузки НАЧАЛО
		onUploadComplete: function(oEvent) {
			var oUploadCollection =  this.getView().byId("uploadLoadRequest");
			var sUploadedFileName = oEvent.getParameter("files")[0].fileName;
			setTimeout(function() {
				for (var i = 0; i < oUploadCollection.getItems().length; i++) {
					if (oUploadCollection.getItems()[i].getFileName() === sUploadedFileName) {
						oUploadCollection.removeItem(oUploadCollection.getItems()[i]);
						break;
					}
				}
				// delay the success message in order to see other messages before
				MessageToast.show("Event uploadComplete triggered");
			}.bind(this), 8000);
		},
////////////////////////////////////////////////////////////////////Функция для окончания заргрузки КОНЕЦ	

//////////////////////////////////////////Функция для перехода на ТРЕТИЙ шаг создания заявки НАЧАЛО
		toThreeStepWizard:function(){
			var mainNavContainer = this.byId("mainNavContainer");
			var wizard = this.getView().byId("requestWizard");
			mainNavContainer.to( this.getView().byId("wizardContentPage"),"flip");
			wizard.goToStep(this.getView().byId("CommentRequestStep"));
		},
//////////////////////////////////////////Функция для перехода на ТРЕТИЙ шаг создания заявки КОНЕЦ	
		
//////////////////////////////////////////////////////////////////////////Функция для генерации отчёта Блока Типа заявки НАЧАЛО
		typeRequestReviewFunction:function(){
			var typeRequestReviewForm = this.getView().byId("typeRequestReviewForm");
			var typeRequest = this.getView().byId("typeRequest");
			var typeRequestGroup = this.getView().byId("typeRequestGroup");
			var selectRadioBut = typeRequestGroup.getSelectedButton();
			var titleBut = selectRadioBut.getText();
			var selectItem= typeRequest.getSelectedItem();
			var self = this;
			typeRequestReviewForm.destroyContent();
			typeRequestReviewForm.addContent( new sap.m.Label ({ text: "{i18n>Category_of_application}" }) );
			typeRequestReviewForm.addContent( new sap.m.Text ({ text: titleBut }) );
			typeRequestReviewForm.addContent( new sap.m.Label ({ text: "{i18n>type_of_application}" }) );
			typeRequestReviewForm.addContent( new sap.m.Text ({ text: selectItem.getText() }) );
			typeRequestReviewForm.addContent( new sap.m.Link ({
												text: "{i18n>Edit}",
												press: function(){self.toOneStepWizard()}
											  }) 
											);
		},
//////////////////////////////////////////////////////////////////////////Функция для генерации отчёта Блока Типа заявки КОНЕЦ

///////////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для будующего периода НАЧАЛО
		dataFuturePeriodRequestReviewFunction: function(){
			var applicationDataReview = this.getView().byId("applicationDataReview");
			var inputPernr = this.getView().byId("inputPernr");
			var inputDateProcessing = this.getView().byId("inputDateProcessing");
			var inputClock = this.getView().byId("inputClock");
			var selectItemClock= inputClock.getSelectedItem();
			var self = this;
			applicationDataReview.destroyContent();
			
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Processing_date}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: inputDateProcessing.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>clock}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: selectItemClock.getText() }) );
			
			applicationDataReview.addContent( new sap.m.Link ({
				text: "{i18n>Edit}",
				press: function(){self.toTwoStepWizard()}
			  }) 
			);
		},
///////////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для будующего периода КОНЕЦ
		
///////////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Семинара/Болезни/Донарства НАЧАЛО
		dataSBDRequestReviewFunction: function(){
			var applicationDataReview = this.getView().byId("applicationDataReview");
			var inputPernr = this.getView().byId("inputPernr");
			var inputDateFrom = this.getView().byId("inputDateFrom");
			var inputDateOn = this.getView().byId("inputDateOn");
			var self = this;
			applicationDataReview.destroyContent();
			
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_From}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: inputDateFrom.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_On}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: inputDateOn.getValue() }) );
			
			applicationDataReview.addContent( new sap.m.Link ({
				text: "{i18n>Edit}",
				press: function(){self.toTwoStepWizard()}
			  }) 
			);
		},		
///////////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Семинара/Болезни/Донарстваа КОНЕЦ
		
///////////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Отпуск НАЧАЛО	
		holidayApplicationReview: function(){
			var applicationDataReview = this.getView().byId("applicationDataReview");
			var inputPernr = this.getView().byId("inputPernr");
			var inputDateFrom = this.getView().byId("inputDateFrom");
			var inputDateOn = this.getView().byId("inputDateOn");
			var self = this;
			applicationDataReview.destroyContent();
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_From}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: inputDateFrom.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_On}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: inputDateOn.getValue() }) );
			
			applicationDataReview.addContent( new sap.m.Link ({
				text: "{i18n>Edit}",
				press: function(){self.toTwoStepWizard()}
			  }) 
			);
		},		
///////////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Отпуск КОНЕЦ
		
///////////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Учебный Отпуск НАЧАЛО
		holidayStudyApplicationReview: function(){
			var applicationDataReview = this.getView().byId("applicationDataReview");
			var inputPernr = this.getView().byId("inputPernr");
			var inputDateFrom = this.getView().byId("inputDateFrom");
			var inputDateOn = this.getView().byId("inputDateOn");
			var typePresence = this.getView().byId("typePresence");
			var selectedItemTypePrecence = typePresence.getSelectedItem();
			var self = this;
			applicationDataReview.destroyContent();
			
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Presence}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: selectedItemTypePrecence.getText() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_From}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: inputDateFrom.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_On}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: inputDateOn.getValue() }) );
			
			applicationDataReview.addContent( new sap.m.Link ({
				text: "{i18n>Edit}",
				press: function(){self.toTwoStepWizard()}
			  }) 
			);
		},	
///////////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Учебный Отпуск КОНЕЦ
		
////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Гособязаностей/Отпуск за свой счёт НАЧАЛО
		stateObligationsReview: function(){
			var applicationDataReview = this.getView().byId("applicationDataReview");
			var inputPernr = this.getView().byId("inputPernr");
			var inputDateFrom = this.getView().byId("inputDateFrom");
			var inputDateOn = this.getView().byId("inputDateOn");
			var inputClock = this.getView().byId("inputClock");
			var selectItemClock= inputClock.getSelectedItem();
			var self = this;
			applicationDataReview.destroyContent();
			
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_From}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: inputDateFrom.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_On}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: inputDateOn.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>clock}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: selectItemClock.getText() }) );
			
			applicationDataReview.addContent( new sap.m.Link ({
				text: "{i18n>Edit}",
				press: function(){self.toTwoStepWizard()}
			  }) 
			);
		},
////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Гособязаностей/Отпуск за свой счёт КОНЕЦ
		
////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Запрос отмены прис/отсутс НАЧАЛО
		requestCancelApplicationReview: function(){
			var applicationDataReview = this.getView().byId("applicationDataReview");
			var inputIdRequest = this.getView().byId("inputRequestId");
			var typeRequestInput = this.getView().byId("typeRequestInput");
			var inputPernr = this.getView().byId("inputPernr");
			var inputDateFrom = this.getView().byId("inputDateFrom");
			var inputDateOn = this.getView().byId("inputDateOn");
			var inputFactProj = this.getView().byId("inputFactProj");
			var selectProject = inputFactProj.getTokens();
			var valueProject= "";
			for (var i = 0; i < selectProject.length; i++){
					if(valueProject==undefined){
						valueProject = selectProject[i].getText()+ "; ";
					}
					else{
						valueProject = valueProject + selectProject[i].getText()+ "; ";
					}
					
				}
			var self = this;
			applicationDataReview.destroyContent();
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>id_request}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputIdRequest.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>type_request}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+typeRequestInput.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Employee_employee_number}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputPernr.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_From}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputDateFrom.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_On}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputDateOn.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Selected_Projects}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+valueProject }) );
			
			applicationDataReview.addContent( new sap.m.Link ({
				text: "{i18n>Edit}",
				press: function(){self.toTwoStepWizard()}
			  }) 
			);
		},
////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Запрос отмены прис/отсут КОНЕЦ
		
////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Отгул в счёт прошлых периодов НАЧАЛО
		dueToPastPeriods: function(){
			var applicationDataReview = this.getView().byId("applicationDataReview");
			var inputPernr = this.getView().byId("inputPernr");
			var inputDateFrom = this.getView().byId("inputDateFrom");
			var inputDateOn = this.getView().byId("inputDateOn");
			var inputClock = this.getView().byId("inputClock");
			var selectItemClock= inputClock.getSelectedItem();
			var self = this;
			applicationDataReview.destroyContent();
		
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_From}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: inputDateFrom.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_On}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: inputDateOn.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>clock}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: selectItemClock.getText() }) );
			
			applicationDataReview.addContent( new sap.m.Link ({
				text: "{i18n>Edit}",
				press: function(){self.toTwoStepWizard()}
			  }) 
			);
		},
////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Отгул в счёт прошлых периодов КОНЕЦ
		
//////////////////////////////////////////////////////////////////////////Функция для добавления в отчёт комментариев  НАЧАЛО		
		commentsRequestReview:function(){
			var commentReview = this.getView().byId("commentReview");
			var feedInputComment = this.getView().byId("feedInputComment");
			var listComment 	 = this.getView().byId("listComment");
			var recordItems = listComment.getItems();
			var self = this;
			var stringComment;
			commentReview.destroyContent();
			if(recordItems.length>0){
				recordItems.forEach(function(item, i, parseListModel){
					if(stringComment==undefined){
						stringComment=item.getSender()+" ( "+item.getTimestamp()+" )"+" : "+item.getText();
					}else{
						stringComment=stringComment+""+"\n\n"+""+item.getSender()+" ( "+item.getTimestamp()+" )"+" : "+item.getText();
					}
				 });
			}
			
			commentReview.addContent(new sap.m.Label ({ text: "{i18n>Comments_on_the_application}" }))
			commentReview.addContent( new sap.m.Text ({ renderWhitespace:true, wrapping:true, maxLines: 0, text: stringComment }) );
			
			commentReview.addContent( new sap.m.Link ({
				text: "{i18n>Edit}",
				press: function(){self.toThreeStepWizard()}
			  }) 
			);
			
		},
//////////////////////////////////////////////////////////////////////////Функция для добавления в отчёт комментариев  КОНЕЦ		
		
//////////////////////////////////////////////////////////////////////////Функция для генерации отчёта (Заявки отсутчтвия) НАЧАЛО
		createContentReviewForm:function(){
			var typeRequest = this.getView().byId("typeRequest");
			var selectItem= typeRequest.getSelectedItem();
			this.typeRequestReviewFunction();
			switch(selectItem.getKey()){
			case '13':
				this.dataFuturePeriodRequestReviewFunction();
				 break;
			 case '15':
			 case '17':	 
				this.stateObligationsReview(); 
				 break;
			 case '16':	 
				 this.holidayApplicationReview(); 
				 break;
			 case'23':
				 this.holidayStudyApplicationReview(); 
				 break;
			 case'22':
				 this.requestCancelApplicationReview(); 
				 break;
			 case'14':
				 this.dueToPastPeriods();
				 break;
			default:
				this.dataSBDRequestReviewFunction();
				break;
			}
			this.commentsRequestReview();
		},
//////////////////////////////////////////////////////////////////////////Функция для генерации отчёта (Заявки отсутчтвия) КОНЕЦ	

///////////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Заявка на командировку НАЧАЛО
		dataTravelRequestReviewFunction: function(){
			var applicationDataReview = this.getView().byId("applicationDataReview");
			var inputLocationTrip = this.getView().byId("inputLocationTrip");
			var inputDataFromChangeWork = this.getView().byId("inputDataFromChangeWork");
			var inputDataOnChangeWork = this.getView().byId("inputDataOnChangeWork");
			var inputNameOrganization = this.getView().byId("inputNameOrganization");
			var inputPurposeTrip = this.getView().byId("inputPurposeTrip");
			var inputFactProjChangeWork = this.getView().byId("inputFactProjChangeWork");
			var self = this;
			var selectProject = inputFactProjChangeWork.getTokens();
			var valueProject= "";
			for (var i = 0; i < selectProject.length; i++){
					if(valueProject==undefined){
						valueProject = selectProject[i].getText()+ "; ";
					}
					else{
						valueProject = valueProject + selectProject[i].getText()+ "; ";
					}
					
				}
			applicationDataReview.destroyContent();
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Business_trip_location}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputLocationTrip.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_From}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputDataFromChangeWork.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_On}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputDataOnChangeWork.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Name_of_organization}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputNameOrganization.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Purpose_of_the_trip}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputPurposeTrip.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Selected_Projects}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+valueProject }) );
			
			applicationDataReview.addContent( new sap.m.Link ({
				text: "{i18n>Edit}",
				press: function(){self.toTwoStepWizard()}
			  }) 
			);
		},	
///////////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Заявка на командировку КОНЕЦ
		
////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Фикс.врем.в пути НАЧАЛО
		requestFixationTravelTimeReviewFunction: function(){
			var applicationDataReview = this.getView().byId("applicationDataReview");
			var inputDataChangeWork = this.getView().byId("inputDataChangeWork");
			var inputClockChangeWork = this.getView().byId("inputClockChangeWork");	
			var selectItemClock= inputClockChangeWork.getSelectedItem();
			var inputFactProjChangeWork = this.getView().byId("inputFactProjChangeWork");
			var selectProject = inputFactProjChangeWork.getTokens();
			var valueProject= "";
			for (var i = 0; i < selectProject.length; i++){
					if(valueProject==undefined){
						valueProject = selectProject[i].getText()+ "; ";
					}
					else{
						valueProject = valueProject + selectProject[i].getText()+ "; ";
					}
					
				}
			var self = this;
			applicationDataReview.destroyContent();
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputDataChangeWork.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>clock}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+selectItemClock.getText() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Selected_Projects}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+valueProject }) );
			
			applicationDataReview.addContent( new sap.m.Link ({
				text: "{i18n>Edit}",
				press: function(){self.toTwoStepWizard()}
			  }) 
			);
		},
////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Фикс.врем.в пути КОНЕЦ
		
////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Фикс.врем.в пути НАЧАЛО
		changeWorkScheduleReviewFunction: function(){
			var applicationDataReview = this.getView().byId("applicationDataReview");
			var typeGDVrule = this.getView().byId("typeGDVrule");
			var inputDataFromChangeWork = this.getView().byId("inputDataFromChangeWork");
			var inputDataOnChangeWork = this.getView().byId("inputDataOnChangeWork");
			var selectedItemGDVrule = typeGDVrule.getSelectedItem();
			var self = this;
			applicationDataReview.destroyContent();
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_From}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputDataFromChangeWork.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_On}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputDataOnChangeWork.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>GDV_rule}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: selectedItemGDVrule.getText() }) );
			
			applicationDataReview.addContent( new sap.m.Link ({
				text: "{i18n>Edit}",
				press: function(){self.toTwoStepWizard()}
			  }) 
			);
		},
////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Фикс.врем.в пути КОНЕЦ
		
///////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Удалёный доступ и Работы во время отсутствия НАЧАЛО
		remoteAccessReviewFunction: function(){
			var applicationDataReview = this.getView().byId("applicationDataReview");
			var inputDataFromChangeWork = this.getView().byId("inputDataFromChangeWork");
			var inputDataOnChangeWork = this.getView().byId("inputDataOnChangeWork");
			var inputFactProjChangeWork = this.getView().byId("inputFactProjChangeWork");
			var selectProject = inputFactProjChangeWork.getTokens();
			var valueProject= "";
			for (var i = 0; i < selectProject.length; i++){
					if(valueProject==undefined){
						valueProject = selectProject[i].getText()+ "; ";
					}
					else{
						valueProject = valueProject + selectProject[i].getText()+ "; ";
					}
					
				}
			var self = this;
			applicationDataReview.destroyContent();
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_From}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputDataFromChangeWork.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Date_On}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputDataOnChangeWork.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Selected_Projects}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+valueProject }) );
			
			applicationDataReview.addContent( new sap.m.Link ({
				text: "{i18n>Edit}",
				press: function(){self.toTwoStepWizard()}
			  }) 
			);
		},
///////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Удалёный доступ и Работы во время отсутствия КОНЕЦ
		
////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Фикс.врем.в пути НАЧАЛО
		recyclingApprovalReviewFunction: function(){
			var applicationDataReview = this.getView().byId("applicationDataReview");
			var inputProcessingDateChangeWork = this.getView().byId("inputProcessingDateChangeWork");
			var inputClockChangeWork = this.getView().byId("inputClockChangeWork");	
			var selectItemClock= inputClockChangeWork.getSelectedItem();
			var inputFactProjChangeWork = this.getView().byId("inputFactProjChangeWork");
			var selectProject = inputFactProjChangeWork.getTokens();
			var valueProject= "";
			for (var i = 0; i < selectProject.length; i++){
					if(valueProject==undefined){
						valueProject = selectProject[i].getText()+ "; ";
					}
					else{
						valueProject = valueProject + selectProject[i].getText()+ "; ";
					}
					
				}
			var self = this;
			applicationDataReview.destroyContent();
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Processing_date}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+inputProcessingDateChangeWork.getValue() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>clock}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+selectItemClock.getText() }) );
			
			applicationDataReview.addContent(new sap.m.Label ({ text: "{i18n>Selected_Projects}" }))
			applicationDataReview.addContent( new sap.m.Text ({ text: ""+valueProject }) );
			
			applicationDataReview.addContent( new sap.m.Link ({
				text: "{i18n>Edit}",
				press: function(){self.toTwoStepWizard()}
			  }) 
			);
		},
////////////////////////////////////////////////////Функция для генерации отчёта Блока Данных заявки для Фикс.врем.в пути КОНЕЦ		
		
//////////////////////////////////////////////////////////////////////////Функция для генерации отчёта (Заявки Изм.Реж.Раб) НАЧАЛО
		createContentChangeWorkReviewForm:function(){
			var typeRequest = this.getView().byId("typeRequest");
			var selectItem= typeRequest.getSelectedItem();
			this.typeRequestReviewFunction();
				switch(selectItem.getKey()){
				 case '07':
					 this.dataTravelRequestReviewFunction();
					 break;
				 case '20':
					 this.requestFixationTravelTimeReviewFunction();
					 break;
				 case '32':
					 this.changeWorkScheduleReviewFunction();
					 break;
				 case '33':
					 this.remoteAccessReviewFunction();
					 break;
				 case '37':
					 this.remoteAccessReviewFunction();
					 break;
				 case '43':
					 this.recyclingApprovalReviewFunction();
					 break;
				}
			this.commentsRequestReview();
		},
//////////////////////////////////////////////////////////////////////////Функция для генерации отчёта (Заявки Изм.Реж.Раб) КОНЕЦ
		
/////////////////////////////////////////////////////////////////////Функция для отпределения категории отчёта (Отсутствия или Изм.Реж.Раб) НАЧАЛО
		reportCategoryDefinition:function(){
			var typeRequestGroup = this.getView().byId("typeRequestGroup");
			switch(typeRequestGroup.getSelectedIndex()){
			case 0:
				this.createContentReviewForm();
				break;
			case 1:
				this.createContentChangeWorkReviewForm();
				break;
			}
		},
/////////////////////////////////////////////////////////////////////Функция для отпределения категории отчёта (Отсутствия или Изм.Реж.Раб) КОНЕЦ

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
////////////////////////////////////////////////Функции для перехода по шагам Wizard  в зависимости от выбраной категории заявки НАЧАЛО
		
//////////////////////////Функции для проверки заполненых полей для Заявок Отсутствия НАЧАЛО		
		validateAbsenceRequests:function(){
			// проверка на прикрепленный файл
			if(!window._globals || window._globals == undefined) {
			}else {
				var Token = _globals.csrfTokenAdd;
			}
			
			 var oView = this.getView();
			 var listTypeRequest = oView.byId("typeRequest");

			 var inputIdRequest = oView.byId("inputRequestId");
			 
			 var typeRequestInput = oView.byId("typeRequestInput");
			 
			 var inputPernr = oView.byId("inputPernr");
			 
			 var typePresence = oView.byId("typePresence");
			 
			 var typePresence = oView.byId("typePresence");
			 
			 var inputDateProcessing = oView.byId("inputDateProcessing");
			 
			 var inputDateFrom = oView.byId("inputDateFrom");
			 
			 var inputDateOn = oView.byId("inputDateOn");
			 
			 var inputClock = oView.byId("inputClock");
			 var selectItemClock= inputClock.getSelectedItem();
			 
			 var runtimeTable = oView.byId("runtimeTable");
			 
			 var inputFactProj = oView.byId("inputFactProj");

			 var selectItem= listTypeRequest.getSelectedItem();

			 var uploadLoadRequest = oView.byId("uploadLoadRequest");


			 switch(selectItem.getKey()){
			 case '13':
				 if((inputDateProcessing.getValue()!=="")&&(selectItemClock!==null)){
					 return true;
				 }else{
					 return false;	
				 }
				 break;
			 case '15':
				 if((inputDateFrom.getValue()!=="")&&(inputDateOn.getValue()!=="")&&(selectItemClock!==null)&&(Token!=undefined)){
					delete _globals['csrfTokenAdd'];
					 return true;
				 }else{
					 return false;	
				 }
			 case '17':	 
				 if((inputDateFrom.getValue()!=="")&&(inputDateOn.getValue()!=="")&&(selectItemClock!==null)&&(Token!=undefined)){
					delete _globals['csrfTokenAdd'];
					 return true;
				 }else{
					 return false;	
				 }
				 break;
			 case '16':	 
				 if((inputDateFrom.getValue()!=="")&&(inputDateOn.getValue()!=="")&&(Token!=undefined)){
					delete _globals['csrfTokenAdd'];
					return true;
				 }else{
					 return false;	
				 }
				 break;
			 case'23':
				 if((inputDateFrom.getValue()!=="")&&(inputDateOn.getValue()!=="")&&(typePresence.getSelectedItem()!==null)&&(Token!=undefined)){
					delete _globals['csrfTokenAdd'];
					 return true;
				 }else{
					 return false;	
				 }
				 break;
			 case'22':
				 if((inputIdRequest.getValue()!=="")&&(inputFactProj.getTokens()!==null)){
					 return true;
				 }else{
					 return false;	
				 }
				 break;
			 case'14':
				 if((inputDateFrom.getValue()!=="")&&(inputDateOn.getValue()!=="")&&(selectItemClock!==null)){
					 return true;
				 }else{
					 return false;	
				 }
				 break;
			default:
				 if((inputDateFrom.getValue()!=="")&&(inputDateOn.getValue()!=="")){
					return true;
				 }else{
					 return false;	
				 }
				break;
			 }
		},	
//////////////////////////Функции для проверки заполненых полей для Заявок Отсутствия КОНЕЦ
		
//////////////////////////Функции для проверки заполненых полей для Заявок Изменения Режима Работы НАЧАЛО		
		validateApplicationChangeWork:function(){
			var listTypeRequest = this.getView().byId("typeRequest");
			var selectItem= listTypeRequest.getSelectedItem();
			
			var inputDataChangeWork = this.getView().byId("inputDataChangeWork");

			var inputLocationTrip = this.getView().byId("inputLocationTrip");

			var typeGDVrule = this.getView().byId("typeGDVrule");

			var inputDataFromChangeWork = this.getView().byId("inputDataFromChangeWork");

			var inputDataOnChangeWork = this.getView().byId("inputDataOnChangeWork");

			var inputProcessingDateChangeWork = this.getView().byId("inputProcessingDateChangeWork");

			var inputClockChangeWork = this.getView().byId("inputClockChangeWork");
			var selectItemClock= inputClockChangeWork.getSelectedItem();

			var inputNameOrganization = this.getView().byId("inputNameOrganization");

			var inputPurposeTrip = this.getView().byId("inputPurposeTrip");

			var inputFactProjChangeWork = this.getView().byId("inputFactProjChangeWork");
			
			 switch(selectItem.getKey()){
			 case '07':
				 if((inputFactProjChangeWork.getTokens().length!==0)&&(inputLocationTrip.getValue()!=="")&&(inputDataOnChangeWork.getValue()!=="")
					 &&(inputDataFromChangeWork.getValue()!=="")&&(inputNameOrganization.getValue()!=="")&&(inputPurposeTrip.getValue()!=="")){
					 return true;
				 }else{
					 return false;	
				 }
				 break;
			 case '20':
				 if((inputDataChangeWork.getValue()!=="")&&(selectItemClock!==null)){
					 return true;
				 }else{
					 return false;	
				 }
				 break;
			 case '32':
				 if((inputDataFromChangeWork.getValue()!=="")&&(inputDataOnChangeWork.getValue()!=="")&&(typeGDVrule.getSelectedItem()!==null)){
					 return true;
				 }else{
					 return false;	
				 }
				 break;
			 case '33':
				 if((inputDataFromChangeWork.getValue()!=="")&&(inputDataOnChangeWork.getValue()!=="")&&(inputFactProjChangeWork.getTokens().length!==0)){
					
					 return true;
				 }else{
					 return false;	
				 }
				 break;
			 case '37':
				 if((inputDataFromChangeWork.getValue()!=="")&&(inputDataOnChangeWork.getValue()!=="")&&(inputFactProjChangeWork.getTokens().length!==0)){
					 return true;
				 }else{
					 return false;	
				 }
				 break;
			 case '43':
				 if((inputProcessingDateChangeWork.getValue()!=="")&&(selectItemClock!==null)&&(inputFactProjChangeWork.getTokens().length!==0)){
					 return true;
				 }else{
					 return false;	
				 }
				 break;				 
			 }
		},	
//////////////////////////Функции для проверки заполненых полей для Заявок Изменения Режима Работы КОНЕЦ	
		
//////////////////////////Функции для заполнения таблицы Период отсутствия сотрудников НАЧАЛО
		tableAbsencePeriodReadDate:function(oFilters){
			var tableAbsencePeriod = this.getView().byId("tableAbsencePeriod");
			tableAbsencePeriod.setModel(this.getView().getModel())
			tableAbsencePeriod.bindRows({
				path: "/AbsencePeriodSet",
			    filters: oFilters,
			});
		},
//////////////////////////Функции для заполнения таблицы Период отсутствия сотрудников КОНЕЦ
		
//////////////////////////Функции для определения Категории заявки НАЧАЛО
		validateStep: function (evt) {
			var flagValidate;
			var typeRequestGroup = this.getView().byId("typeRequestGroup");
			switch(typeRequestGroup.getSelectedIndex()){
			case 0:
				flagValidate=this.validateAbsenceRequests();
				break;
			case 1:
				flagValidate=this.validateApplicationChangeWork();
				break;
			};
			return flagValidate;
		},
//////////////////////////Функции для определения Категории заявки КОНЕЦ

//////////////////////////Функции для перехода на следующий шаг НАЧАЛО
		nextStep: function (evt) {
			var listTypeRequest = this.getView().byId("typeRequest");
			var wizard = this.getView().byId("requestWizard");
			var downBut = this.getView().byId("downButton");
			var downBut = this.getView().byId("downButton");
			var mainNavContainer = this.byId("mainNavContainer");
			var CommentRequestStep = this.byId("CommentRequestStep");
			var lBundle = sap.ui.getCore().getModel("i18n").getResourceBundle();
			if(wizard.getCurrentStep()!==CommentRequestStep.getId()){
				switch(wizard.getProgress()){
					case 1:
						if(listTypeRequest.getSelectedItem()!==null){
							wizard.nextStep();
							downBut.setEnabled(true);
						}else{
				            var lWarningError = lBundle.getText("Choose_application_type");
							sap.m.MessageToast.show(lWarningError);
						}
						break;
					case 2:
						if(this.validateStep()){
							wizard.nextStep();
							downBut.setEnabled(true);
						}else{
				            var lWarningError = lBundle.getText("Fill_in_all_required_fields");
							sap.m.MessageToast.show(lWarningError);
						}
						break;		
				}
			}
			else if(wizard.getCurrentStep()==CommentRequestStep.getId()){
				this.reportCategoryDefinition();
				mainNavContainer.to( this.getView().byId("reviewPage"),"flip");
			}
		
		},
//////////////////////////Функции для перехода на следующий шаг КОНЕЦ	
		
//////////////////////////Функции для перехода на предыдущий шаг НАЧАЛО
		downStep: function () {
			var wizard = this.getView().byId("requestWizard");
			var downBut = this.getView().byId("downButton");
			var downBut = this.getView().byId("downButton");
			var CommentRequestStep = this.byId("CommentRequestStep");
			if(wizard.getProgress()!==2){
			   wizard.previousStep();
			}else{
				 wizard.previousStep();
				 downBut.setEnabled(false);
			} 
		},
//////////////////////////Функции для перехода на предыдущий шаг КОНЕЦ		
		
//////////////////////////Функции для определения следующего шага в зависимости от ТИПА заявки НАЧАЛО		
		defineNextStep: function(){
			 var typeGroupBut = this.getView().byId("typeRequestGroup");
			 var selectBut = typeGroupBut.getSelectedIndex();
			switch (selectBut) {
				case 0 :
					this.byId("TypeRequestStep").setNextStep(this.getView().byId("DataRequestStep"));
					break;
				case 1 :
					this.byId("TypeRequestStep").setNextStep(this.getView().byId("changeModeWorkStep"));
					break;
			}	
		},
//////////////////////////Функции для определения следующего шага в зависимости от ТИПА заявки НАЧАЛО
		
////////////////////////////////////////////////Функции для перехода по шагам Wizard  в зависимости от выбраной категории заявки КОНЕЦ
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
//////////////////////////////////////////////////////////////////////////Функция для публикации комментариев НАЧАЛО		
		onPost:function(){
			var oView = this.getView();
			var oFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			var oDate = new Date();
			var sDate = oFormat.format(oDate);
			var feedInputComment =oView.byId("feedInputComment");
			var listComment = oView.byId("listComment");
			var dataComment =feedInputComment.getValue();
			listComment.addItem(
					new sap.m.FeedListItem({
						sender: FullName,
						icon:"sap-icon://user-edit",
						timestamp:sDate,
						text: dataComment,
					})
					);
		},
//////////////////////////////////////////////////////////////////////////Функция для публикации комментариев КОНЕЦ

//////////////////////////////////////////////////////////////////////////Создание объекта для заявки Сеинар/Болезнь/Донорство НАЧАЛО	
		createObjSBDRequest:function(object){
			var inputDateFrom = this.getView().byId("inputDateFrom");
			var inputDateOn = this.getView().byId("inputDateOn");
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			var Begda= inputDateFrom.getDateValue();
			var Endda = inputDateOn.getDateValue();
			var typeRequest = this.getView().byId("typeRequest");
			var selectItem= typeRequest.getSelectedItem();
			var objApplication =object;
			objApplication.TypeCode=selectItem.getKey();
			objApplication.Begda=oDateFormat.format(new Date(inputDateFrom.getDateValue()));
			objApplication.Endda=oDateFormat.format(new Date(inputDateOn.getDateValue()));
			return objApplication;
			
		},
//////////////////////////////////////////////////////////////////////////Создание объекта для заявки Сеинар/Болезнь/Донорство КОНЕЦ	

//////////////////////////////////////////////////////////////////////////Создание объекта для заявки отгула в счёт БУДУЮЩИХ периодов НАЧАЛО
		createObjFuturePeriod:function(obj){
			var objApplication=obj;
			var inputDateProcessing = this.getView().byId("inputDateProcessing");
			var inputClock = this.getView().byId("inputClock");
			var selectItemClock= inputClock.getSelectedItem();
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			objApplication.Begda=oDateFormat.format(new Date(inputDateProcessing.getDateValue()));
			objApplication.Endda=oDateFormat.format(new Date(inputDateProcessing.getDateValue()));
			objApplication.Timez=selectItemClock.getText();
			return objApplication;

		},
//////////////////////////////////////////////////////////////////////////Создание объекта для заявки отгула в счёт БУДУЮЩИХ периодов КОНЕЦ
		
///////////////////////////////////////////////////////////////////Создание объекта для ОТПУСК за СЧ/ГОСОБ периодов НАЧАЛО
		createObjObligations:function(obj){
			var objApplication=obj;
			var inputDateFrom = this.getView().byId("inputDateFrom");
			var inputDateOn = this.getView().byId("inputDateOn");
			var inputClock = this.getView().byId("inputClock");
			var selectItemClock= inputClock.getSelectedItem();
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			objApplication.Begda=oDateFormat.format(new Date(inputDateFrom.getDateValue()));
			objApplication.Endda=oDateFormat.format(new Date(inputDateOn.getDateValue()));
			objApplication.Timez=selectItemClock.getText();
			return objApplication;

		},
//////////////////////////////////////////////////////////////////////////Создание объекта для  ОТПУСК за СЧ/ГОСОБ КОНЕЦ
		
///////////////////////////////////////////////////////////////////Создание объекта для ОТПУСК НАЧАЛО
		createObjHoliday:function(obj){
			var objApplication=obj;
			var inputDateFrom = this.getView().byId("inputDateFrom");
			var inputDateOn = this.getView().byId("inputDateOn");
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			objApplication.Begda=oDateFormat.format(new Date(inputDateFrom.getDateValue()));
			objApplication.Endda=oDateFormat.format(new Date(inputDateOn.getDateValue()));
			return objApplication;

		},
//////////////////////////////////////////////////////////////////////////Создание объекта для  ОТПУСК КОНЕЦ
		
///////////////////////////////////////////////////////////////////Создание объекта для ОТПУСК НАЧАЛО
		createObjHolidayStudy:function(obj){
			var objApplication=obj;
			var inputDateFrom = this.getView().byId("inputDateFrom");
			var inputDateOn = this.getView().byId("inputDateOn");
			var typePresence = this.getView().byId("typePresence");
			var selectedItemTypePrecence = typePresence.getSelectedItem();
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			objApplication.Begda=oDateFormat.format(new Date(inputDateFrom.getDateValue()));
			objApplication.Endda=oDateFormat.format(new Date(inputDateOn.getDateValue()));
			objApplication.SelAbsType=selectedItemTypePrecence.getKey();
			return objApplication;

		},
//////////////////////////////////////////////////////////////////////////Создание объекта для  ОТПУСК КОНЕЦ
		
///////////////////////////////////////////////////////////////////Создание объекта для Запроса отмены НАЧАЛО
		createObjRequestCancel:function(obj){
			var objApplication=obj;
			var inputPernr = this.getView().byId("inputPernr");
			var inputDateFrom = this.getView().byId("inputDateFrom");
			var inputDateOn = this.getView().byId("inputDateOn");
		    var inputIdRequest = this.getView().byId("inputRequestId");
		    var inputFactProj = this.getView().byId("inputFactProj");
			var selectProject = inputFactProj.getTokens();
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			objApplication.Project=selectProject[0].getKey();
			objApplication.PernrEmpl=inputPernr.getValue();
			objApplication.Begda=oDateFormat.format(new Date(inputDateFrom.getDateValue()));
			objApplication.Endda=oDateFormat.format(new Date(inputDateOn.getDateValue()));
			objApplication.IDCanceledReq=inputIdRequest.getValue();
			return objApplication;

		},
//////////////////////////////////////////////////////////////////////////Создание объекта для  Запроса отмены КОНЕЦ
		
//////////////////////////////////////////////////////////////////////////Создание объекта для заявки отгула в счёт ПРОШЛЫХ периодов НАЧАЛО
		createObjLastPeriod:function(obj){
			var objApplication=obj;
			var inputDateFrom = this.getView().byId("inputDateFrom");
			var inputDateOn = this.getView().byId("inputDateOn");
			var inputClock = this.getView().byId("inputClock");
			var selectItemClock= inputClock.getSelectedItem();
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			objApplication.Begda=oDateFormat.format(new Date(inputDateFrom.getDateValue()));
			objApplication.Endda=oDateFormat.format(new Date(inputDateOn.getDateValue()));
			objApplication.Timez=selectItemClock.getText();
			return objApplication;

		},
//////////////////////////////////////////////////////////////////////////Создание объекта для заявки отгула в счёт ПРОШЛЫХ периодов КОНЕЦ
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////Создание заявки для Заявок отсутствия НАЧАЛО
		createRequestLack:function(){
			var self= this;
			var typeRequest = this.getView().byId("typeRequest");
			var selectItem= typeRequest.getSelectedItem();
			var objApplicationSend ={};
			objApplicationSend.Uname="";
			objApplicationSend.PernrEmpl="";
			objApplicationSend.Begda="";
			objApplicationSend.Endda="";
			objApplicationSend.Timez="";
			objApplicationSend.Schkz="";
			objApplicationSend.SelAbsType="";
			objApplicationSend.Dep="";
			objApplicationSend.OrgName="";
			objApplicationSend.DepTarget="";
			objApplicationSend.Project="";
			objApplicationSend.IDCanceledReq="";
			objApplicationSend.TypeCode=selectItem.getKey();
			switch(selectItem.getKey()){
			case '13':
				objApplicationSend=this.createObjFuturePeriod(objApplicationSend);
				this.sendObjToGW(objApplicationSend);
				 break;
			 case '15':
			 case '17':	 
				 this.onStartUpload();
				 objApplicationSend=this.createObjObligations(objApplicationSend);  
				 this.sendObjToGW(objApplicationSend);
				 break;
			 case '16':	 
				 this.onStartUpload();
				 objApplicationSend=this.createObjHoliday(objApplicationSend);  
				 this.sendObjToGW(objApplicationSend);
				 break;
			 case'23':
				 objApplicationSend=this.createObjHolidayStudy(objApplicationSend); 
				 this.sendObjToGW(objApplicationSend);
				 break;
			 case'22':
				 objApplicationSend=this.createObjRequestCancel(objApplicationSend); 
				 this.setProjects();
				 this.sendObjToGW(objApplicationSend);
				 break;
			 case'14':
				 objApplicationSend=this.createObjLastPeriod(objApplicationSend);
				 this.sendObjToGW(objApplicationSend);
				 break;
			default:
				objApplicationSend = this.createObjSBDRequest(objApplicationSend);
				this.sendObjToGW(objApplicationSend);
				break;
			} 
		},		
/////////////////////////////////////////////////////////////////////////////////////////////////////////Создание заявки для Заявок отсутствия КОНЕЦ
		
///////////////////////////////////////////////////////////////////Создание объекта для Заявка на командировку НАЧАЛО
		createObjTrip:function(obj){
			var objApplication=obj;
			var inputFactProjChangeWork = this.getView().byId("inputFactProjChangeWork");
			var selectProject = inputFactProjChangeWork.getTokens();
			var inputLocationTrip = this.getView().byId("inputLocationTrip");
			var inputDataFromChangeWork = this.getView().byId("inputDataFromChangeWork");
			var inputDataOnChangeWork = this.getView().byId("inputDataOnChangeWork");
			var inputNameOrganization = this.getView().byId("inputNameOrganization");
			var inputPurposeTrip = this.getView().byId("inputPurposeTrip");
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			objApplication.Project=selectProject[0].getKey();
			objApplication.Dep=inputLocationTrip.getValue();
			objApplication.Begda=oDateFormat.format(new Date(inputDataFromChangeWork.getDateValue()));
			objApplication.Endda=oDateFormat.format(new Date(inputDataOnChangeWork.getDateValue()));
			objApplication.OrgName=inputNameOrganization.getValue();
			objApplication.DepTarget=inputPurposeTrip.getValue();
			
			return objApplication;
		},
//////////////////////////////////////////////////////////////////////////Создание объекта для Заявка на командировку КОНЕЦ		
		
///////////////////////////////////////////////////////////////////Создание объекта для Заявка на командировку НАЧАЛО
		createObjFixedTime:function(obj){
			var objApplication=obj;
			var inputFactProjChangeWork = this.getView().byId("inputFactProjChangeWork");
			var selectProject = inputFactProjChangeWork.getTokens();
			var inputDataChangeWork = this.getView().byId("inputDataChangeWork");
			var inputClockChangeWork = this.getView().byId("inputClockChangeWork");
			var selectItemClock= inputClockChangeWork.getSelectedItem();
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			objApplication.Project=selectProject[0].getKey();
			objApplication.Begda=oDateFormat.format(new Date(inputDataChangeWork.getDateValue()));
			objApplication.Endda=oDateFormat.format(new Date(inputDataChangeWork.getDateValue()));
			objApplication.Timez=selectItemClock.getText();

			return objApplication;
		},
//////////////////////////////////////////////////////////////////////////Создание объекта для Заявка на командировку КОНЕЦ			
		
///////////////////////////////////////////////////////////////////Создание объекта для Заявка Изменения ГРВ НАЧАЛО
		createObjChangeWorkTime:function(obj){
			var objApplication=obj;
			var typeGDVrule = this.getView().byId("typeGDVrule");
			var selectedItemGDVrule = typeGDVrule.getSelectedItem();
			var inputDataFromChangeWork = this.getView().byId("inputDataFromChangeWork");
			var inputDataOnChangeWork = this.getView().byId("inputDataOnChangeWork");
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			objApplication.Schkz=selectedItemGDVrule.getKey();
			objApplication.Begda=oDateFormat.format(new Date(inputDataFromChangeWork.getDateValue()));
			objApplication.Endda=oDateFormat.format(new Date(inputDataOnChangeWork.getDateValue()));
			return objApplication;
		},
///////////////////////////////////////////////////////////////////Создание объекта для Заявка Изменения ГРВ КОНЕЦ	
		
///////////////////////////////////////////////////////////////////Создание объекта для Заявка на работу во время отсутствия НАЧАЛО
		createObjWorkWhileAway:function(obj){
			var objApplication=obj;
			var inputFactProjChangeWork = this.getView().byId("inputFactProjChangeWork");
			var selectProject = inputFactProjChangeWork.getTokens();
			var inputDataFromChangeWork = this.getView().byId("inputDataFromChangeWork");
			var inputDataOnChangeWork = this.getView().byId("inputDataOnChangeWork");
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			objApplication.Project=selectProject[0].getKey();
			objApplication.Begda=oDateFormat.format(new Date(inputDataFromChangeWork.getDateValue()));
			objApplication.Endda=oDateFormat.format(new Date(inputDataOnChangeWork.getDateValue()));
	
			return objApplication;
		},
/////////////////////////////////////////////////////////////////////Создание объекта для Заявка на работу во время отсутствия КОНЕЦ		
		
///////////////////////////////////////////////////////////////////Создание объекта для Заявка на Удалённый доступ НАЧАЛО
		createObjRemoteAccess:function(obj){
			var objApplication=obj;
			var inputFactProjChangeWork = this.getView().byId("inputFactProjChangeWork");
			var selectProject = inputFactProjChangeWork.getTokens();
			var inputDataFromChangeWork = this.getView().byId("inputDataFromChangeWork");
			var inputDataOnChangeWork = this.getView().byId("inputDataOnChangeWork");
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			objApplication.Project=selectProject[0].getKey();
			objApplication.Begda=oDateFormat.format(new Date(inputDataFromChangeWork.getDateValue()));
			objApplication.Endda=oDateFormat.format(new Date(inputDataOnChangeWork.getDateValue()));
	
			return objApplication;
		},
/////////////////////////////////////////////////////////////////////Создание объекта для Заявка на Удалённый доступ КОНЕЦ	
		
///////////////////////////////////////////////////////////////////Создание объекта для Заявка на командировку НАЧАЛО
		createObjRecyclingApproval:function(obj){
			var objApplication=obj;
			var inputFactProjChangeWork = this.getView().byId("inputFactProjChangeWork");
			var selectProject = inputFactProjChangeWork.getTokens();
			var inputProcessingDateChangeWork = this.getView().byId("inputProcessingDateChangeWork");
			var inputClockChangeWork = this.getView().byId("inputClockChangeWork");
			var selectItemClock= inputClockChangeWork.getSelectedItem();
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-ddTHH:mm:ss"});
			objApplication.Project=selectProject[0].getKey();
			objApplication.Begda=oDateFormat.format(new Date(inputProcessingDateChangeWork.getDateValue()));
			objApplication.Endda=oDateFormat.format(new Date(inputProcessingDateChangeWork.getDateValue()));
			objApplication.Timez=selectItemClock.getText();

			return objApplication;
		},
//////////////////////////////////////////////////////////////////////////Создание объекта для Заявка на командировку КОНЕЦ		
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////Создание заявки для Заявок изм. ГРВ НАЧАЛО
		createRequestChangeWork:function(){
			var self= this;
			var typeRequest = this.getView().byId("typeRequest");
			var selectItem= typeRequest.getSelectedItem();
			var objApplicationSend ={};
			objApplicationSend.Uname="";
			objApplicationSend.PernrEmpl="";
			objApplicationSend.Begda="";
			objApplicationSend.Endda="";
			objApplicationSend.Timez="";
			objApplicationSend.Schkz="";
			objApplicationSend.SelAbsType="";
			objApplicationSend.Dep="";
			objApplicationSend.OrgName="";
			objApplicationSend.DepTarget="";
			objApplicationSend.Project="";
			objApplicationSend.IDCanceledReq="";
			objApplicationSend.TypeCode=selectItem.getKey();
			switch(selectItem.getKey()){
			 case '07':
				 objApplicationSend=this.createObjTrip(objApplicationSend);
				 this.setProjects();
				 this.sendObjToGW(objApplicationSend);
				 break;
			 case '20':
				 objApplicationSend=this.createObjFixedTime(objApplicationSend);
				 this.setProjects();
				 this.sendObjToGW(objApplicationSend);
				 break;
			 case '32':
				 objApplicationSend=this.createObjChangeWorkTime(objApplicationSend);
				 this.sendObjToGW(objApplicationSend);
				 break;
			 case '33':
				 objApplicationSend=this.createObjWorkWhileAway(objApplicationSend);
				 this.setProjects();
				 this.sendObjToGW(objApplicationSend);
				 break;
			 case '37':
				 objApplicationSend=this.createObjRemoteAccess(objApplicationSend);
				 this.setProjects();
				 this.sendObjToGW(objApplicationSend);
				 break;
			 case '43':
				 objApplicationSend=this.createObjRecyclingApproval(objApplicationSend);
				 this.setProjects();
				 this.sendObjToGW(objApplicationSend);
				 break;
			} 
			
		},		
/////////////////////////////////////////////////////////////////////////////////////////////////////////Создание заявки для Заявок изм. ГРВ КОНЕЦ	
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////Отправка объекта на Бэкэнд НАЧАЛО
		sendObjToGW:function(obj){
			var self= this;
			var readMessage;
			var objApplication=obj;
			oModel.create('/RequestDataSet', objApplication,{
		    	  success: function (oData, oResponse) {
		    		  readMessage=self.getMessage(objApplication);
		    		  var lBundle = sap.ui.getCore().getModel("i18n")
	          		    .getResourceBundle();
	                 	 var lWarningError = lBundle.getText("creation_accept");
	                     sap.m.MessageToast.show (readMessage);
	                     var mainNavContainer = self.byId("mainNavContainer");
	         			 var wizard = self.getView().byId("requestWizard");
	         			 mainNavContainer.to( self.getView().byId("wizardContentPage"),"flip");
	         			 wizard.goToStep(self.getView().byId("TypeRequestStep"));
	         			wizard.discardProgress(self.getView().byId("TypeRequestStep"));
	         			self.clearDataApp();
	         			self.getView().byId("listApplication").getBinding("items").refresh();
		         },
		         error: function (oError) {
		        	 var lBundle = sap.ui.getCore().getModel("i18n")
	          		    .getResourceBundle();
	                 	 var lWarningError = lBundle.getText("creation_failed");
	                     sap.m.MessageToast.show (lWarningError);
		         }
		      })
		},
/////////////////////////////////////////////////////////////////////////////////////////////////////////Отправка объекта на Бэкэнд КОНЕЦ
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////Получение сообщения с GW НАЧАЛО
		getMessage:function(objApplication){
			var message= {};
			var valueMessage;
			oModel.read("/MessagesSet", null, null, false, function(oData, oResponse) {

				message = oData.results;

			 });
			var messageModel= new sap.ui.model.json.JSONModel(message);


			if (message.length>0){
				if(message[0].Labels==""){
					message.forEach(function(item, j, parseListModel){
						if(valueMessage==undefined){
							valueMessage=item.Messages;
						}else{
							valueMessage=valueMessage+"  "+ "\n"+item.Messages;
						}
					});
				}else{
					var titleDialog = message[0].Labels;
					var titlePage= message[1].Labels;
					this.dialogCarry(titleDialog,titlePage,messageModel,objApplication);

				}
		    }
			return valueMessage;
		},
/////////////////////////////////////////////////////////////////////////////////////////////////////////Получение сообщения с GW КОНЕЦ
		
/////////////////////////////////////////////////////////Функция перехода на следующую страницу для диалога ПЕРЕСЕЧЕНИЯ ОТПУСКА С БОЛЬНИЧНЫМ НАЧАЛО		
		nextPageCarry:function(){
			var sFragmentId = this.getView().createId("fragmentIdCarry");
			var sControlId = "carryContainer";
			 
			var navCont = sap.ui.core.Fragment.byId(sFragmentId, sControlId); 
			//var navCont= this.getView().byId("carryContainer");
			var test = navCont.getInitialPage();
			/*switch(test){
			
			}*/
		},
/////////////////////////////////////////////////////////Функция перехода на следующую страницу для диалога ПЕРЕСЕЧЕНИЯ ОТПУСКА С БОЛЬНИЧНЫМ  КОНЕЦ	
		
/////////////////////////////////////////////////////////Функция перехода на следующую страницу для диалога ПЕРЕСЕЧЕНИЯ ОТПУСКА С БОЛЬНИЧНЫМ НАЧАЛО		
		setToGWCarryButton:function(){
			var groupButCarry= this.getView().byId("groupButCarry");
		},
/////////////////////////////////////////////////////////Функция перехода на следующую страницу для диалога ПЕРЕСЕЧЕНИЯ ОТПУСКА С БОЛЬНИЧНЫМ  КОНЕЦ	
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////Отправка комментариев на GW НАЧАЛО
		setComments:function(){
			var arrObj=[];
			var feedInputComment = this.getView().byId("feedInputComment");
			var listComment 	 = this.getView().byId("listComment");
			var recordItems = listComment.getItems();
			if(recordItems.length>0){
				recordItems.forEach(function(item, i, parseListModel){
					var obj={};
					var oDateFormatTime = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "HHmmss"});
					var oDateFormatDate = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyyMMdd"});
					obj.Time = oDateFormatTime.format(new Date(item.getTimestamp()));
					obj.Date = oDateFormatDate.format(new Date(item.getTimestamp()));
					obj.Comment=item.getText();
					arrObj.push(obj);
				 });
			}
			if(arrObj.length>0){
				arrObj.forEach(function(item, i, parseListModel){
					oModel.create('/CommentsSet', item,{
						  success: function (oData, oResponse) {
							
						 },
						 error: function (oError) {
			
						 }
					})
				});
			}
		},
/////////////////////////////////////////////////////////////////////////////////////////////////////////Отправка комментариев на GW КОНЕЦ
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////Отправка выбранных проектов на GW НАЧАЛО
		setProjects:function(){
			var arrObj=[];
			var inputFactProj;
			var typeRequestGroup = this.getView().byId("typeRequestGroup");
			switch(typeRequestGroup.getSelectedIndex()){
			case 0:
				inputFactProj = this.getView().byId("inputFactProj");
				break;
			case 1:
				inputFactProj = this.getView().byId("inputFactProjChangeWork");
				break;
			}
			var selectProject = inputFactProj.getTokens();
			if(selectProject.length>0){
				selectProject.forEach(function(item, i, parseListModel){
					var obj={};
					obj.ProjectId=item.getKey();
					obj.ProjectName="";
					obj.StatusText="";
					arrObj.push(obj);
				 });
			}
			if(arrObj.length>0){
				arrObj.forEach(function(item, i, parseListModel){
					oModel.create('/ProjectsSearchToolSet', item,{
						  success: function (oData, oResponse) {
							
						 },
						 error: function (oError) {
			
						 }
					})
				});
			}
		},
/////////////////////////////////////////////////////////////////////////////////////////////////////////Отправка выбранных проектов на GW КОНЕЦ		
		
/////////////////////////////////////////////////////////////////////////////////////////////////Определение категории заявки перед созданием НАЧАЛО
		createRequestDetermineCategory:function(){
			this.setComments();
			var typeRequestGroup = this.getView().byId("typeRequestGroup");
			switch(typeRequestGroup.getSelectedIndex()){
			case 0:
				this.createRequestLack();
				break;
			case 1:
				this.createRequestChangeWork();
				break;
			}
		},		
/////////////////////////////////////////////////////////////////////////////////////////////////Определение категории заявки перед созданием КОНЕЦ		

//////////////////////////////////////////////////////////////////////////Наполнение таблицы списанного времени НАЧАЛО
		feelingTableRuntimeTable:function(selectDate){
			var oFilters = [ new sap.ui.model.Filter("Workdate",sap.ui.model.FilterOperator.EQ,selectDate) ];
			var oModel =  new sap.ui.model.odata.ODataModel(link,false);
			var tableRuntime = this.getView().byId("runtimeTable");
			var ColumnPernr = new sap.ui.table.Column({
				autoResizable:true,
			    label : new sap.m.Label({text :'{i18n>personal_number}'}),
			    template : new sap.m.Label({ text : "{Pernr}"}),
			});
			var ColumnWorkdate = new sap.ui.table.Column({
				autoResizable:true,
				minWidth:30,
				width:"auto",
			    label :new sap.m.Label({text : '{i18n>date}'}),
			    template :new sap.ui.commons.TextView({
			        text : { 
			            path : 'Workdate',
			            type: "sap.ui.model.type.Date",
			            type: 'sap.ui.model.type.Date',
			            formatOptions: {
			              source: {
			                pattern: 'yyyy-MM-ddTHH:mm:ss'
			              },
			              pattern: 'd MMM, yyyy'
			            }
			        }
			    }),
			});
			var ColumnAwart = new sap.ui.table.Column({
				autoResizable:true,
				minWidth:30,
				width:"auto",
			    label : new sap.m.Label({text : '{i18n>Type_of_absence_of_presence}'}),
			    template : new sap.m.Label({ text :"{Awart}"}),
			});
			
			var ColumnZzwork = new sap.ui.table.Column({
				autoResizable:true,
				minWidth:30,
				width:"auto",
			    label : new sap.m.Label({text : '{i18n>Type_of_attraction}'}),
			    template : new sap.m.Label({ text :"{Zztwork}"}),
			});
			
			var ColumnCatshours = new sap.ui.table.Column({
				autoResizable:true,
				minWidth:30,
				width: "auto",
			    label : new sap.m.Label({text : '{i18n>clock}'}),
			    template : new sap.m.Label({ text :"{Catshours}"}),
			});
			
			var ColumnTaskInfo = new sap.ui.table.Column({
				autoResizable:true,
				minWidth:30,
				width:"auto",
			    label : new sap.m.Label({text : '{i18n>Task_Information}'}),
			    template : new sap.m.Label({ text :"{TaskInfo}"}),
			});
			
			var ColumnProject = new sap.ui.table.Column({
				autoResizable:true,
				minWidth:30,
				width:"auto",
			    label : new sap.m.Label({text : '{i18n>Actual_project}'}),
			    template : new sap.m.Label({ text :"{Project}"}),
			});
			tableRuntime.removeAllColumns();
			//tableRuntime.addColumn(ColumnPernr);
			tableRuntime.addColumn(ColumnWorkdate);
			tableRuntime.addColumn(ColumnAwart);
			//tableRuntime.addColumn(ColumnZzwork);
			tableRuntime.addColumn(ColumnCatshours);
			tableRuntime.addColumn(ColumnTaskInfo);
			tableRuntime.addColumn(ColumnProject);
			tableRuntime.bindRows("/TimetableSet", null, null, oFilters);
		},	
//////////////////////////////////////////////////////////////////////////Наполнение таблицы списанного времени КОНЕЦ
		
/////////////////////////////////////////////////////////////////////////Йункция для заполнения MultiInput выбранными проектами НАЧАЛО		
		addTokenWidthProjectInput:function(arrListSelectProject,idElement){
			var inputFactProj = sap.ui.getCore().byId(idElement);
			var arrProj=arrListSelectProject;
			inputFactProj.destroyTokens();
			if(arrProj.length>0){
				for(var i=0; i<arrProj.length;i++){
					inputFactProj.addToken(
							new sap.m.Token({
								key: arrProj[i].ProjectId,
								text: arrProj[i].ProjectName,
							})
					);
				}
			}
			
		},
/////////////////////////////////////////////////////////////////////////Йункция для заполнения MultiInput выбранными проектами КОНЕЦ		
		
/////////////////////////////////////////////////////////////////////////Диалоговое окно для выбора проектов НАЧАЛО		
		openListProj:function(oEvent){
			var oFilters=[];
			var self=this;
			var inputIdRequest = this.getView().byId("inputRequestId");
			var idSelectedElement =oEvent.getParameter("id");
			var typeRequest = this.getView().byId("typeRequest");
	        var selectItem= typeRequest.getSelectedItem();
			var searchInput = new sap.m.SearchField({
				search: function(){
					//if (searchInput.getValue()!=="" && searchInput.getValue()!==null){
						oFilters.length = 0;
						oFilters.push( new sap.ui.model.Filter("TypeCode",sap.ui.model.FilterOperator.EQ,selectItem.getKey()));	
						oFilters.push( new sap.ui.model.Filter("ProjectId",sap.ui.model.FilterOperator.EQ,searchInput.getValue()));
						oFilters.push( new sap.ui.model.Filter("ProjectName",sap.ui.model.FilterOperator.EQ,searchInput.getValue()));	
						ProjectTable.bindRows({
						      path:'/ProjectsSearchToolSet',
						      filters: oFilters,
						    });
						//ProjectTable.getBinding("items").refresh();
					//}
				}
			});
			oFilters.push( new sap.ui.model.Filter("TypeCode",sap.ui.model.FilterOperator.EQ,selectItem.getKey()));	
			
			// Таблица с данными заявками
			
			var ColumnProjectId = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>id_project}'}),
			    template : new sap.m.Label({ text : "{ProjectId}"}),
				
			});
			var ColumnProjectName = new sap.ui.table.Column({
			    label :new sap.m.Label({text : '{i18n>name_project}'}),
			    template :new sap.m.Label({ text :"{ProjectName}"}),
			});
			var ColumnStatusText = new sap.ui.table.Column({
			    label :new sap.m.Label({text : '{i18n>Status}'}),
			    template :new sap.m.Label({ text :"{StatusText}"}),
			});
			
			var ProjectTable = new sap.ui.table.Table({
				selectionMode:sap.ui.table.SelectionMode.MultiToggle,
				columns:[
					ColumnProjectId,
					ColumnProjectName,
				]
			});
			
			
			ProjectTable.setModel(oModel);
			ProjectTable.bindRows({
			      path:'/ProjectsSearchToolSet',
			      filters: oFilters,
			    });
			
			var SerchMainPanel = new sap.ui.layout.form.SimpleForm({
				width : "100%",
				backgroundDesign : "Transparent",
				columnsL : 2,
				columnsM : 2,
				columnsXL : 2,
				content : [ 
					new sap.m.Label({
						 text:"{i18n>search}",
						}),
					searchInput ]
			}).addStyleClass("SearchForm")
			SerchMainPanel.addStyleClass("SearchMainForm");
			
			var TableForm = new sap.ui.layout.form.SimpleForm({
				width : "100%",
				columnsL : 1,
				columnsM : 1,
				columnsXL : 1,
				editable : true,
				layout : sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
				content : [  ProjectTable ]
			}).addStyleClass("table-form")
			var self = this;
			var listProjectDialog = new sap.m.Dialog({

		        title : "{i18n>list_project}",
		        icon:"sap-icon://capital-projects",
		        contentWidth : "550px",
		        content:[
		        	SerchMainPanel,
		        	TableForm
		        	
		        ],
		        beginButton : [ new sap.m.Button({
		        text : "OK",
		        press: function(){
		        		var arrObj=[];
		        	 	var selectRow = ProjectTable.getSelectedIndices();
			            if(selectRow.length>0){
			                for (var i = 0; i <selectRow.length; i ++) {
			                	var idx = selectRow [i];
				                var cxt = ProjectTable.getContextByIndex (idx);
				                var path = cxt.sPath;
				                var obj = ProjectTable.getModel().getProperty (path);
				                arrObj.push(obj);
			                }
			                self.addTokenWidthProjectInput(arrObj,idSelectedElement);
			                listProjectDialog.close();
			            }
			            
		          	}
		        }) ],
		        endButton : [ new sap.m.Button({
		        text : "Cancel",
		        press : function() {
		        	listProjectDialog.close();
		        		},
		        }) ]
		    });
			listProjectDialog.open();			
		},
		
/////////////////////////////////////////////////////////////////////////Диалоговое окно для выбора проектов КОНЕЦ		
		
/////////////////////////////////////////////////////////////////////////Диалоговое окно для выбора заявок НАЧАЛО
		openApplicationDialog:function(){
			
			var inputIdRequest = this.getView().byId("inputRequestId");
			var typeRequestInput = this.getView().byId("typeRequestInput");
			var inputPernr = this.getView().byId("inputPernr");
			var inputDateFrom = this.getView().byId("inputDateFrom");
			var inputDateOn = this.getView().byId("inputDateOn");
			var searchInput = new sap.m.SearchField({
				
			})
			
			// Таблица с данными заявками
			
			var ColumnPernr = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>personal_number}'}),
			    template : new sap.m.Label({ text : "{PernrEmpl}"}),
				
			});
			var ColumnSurname = new sap.ui.table.Column({
			    label :new sap.m.Label({text : '{i18n>Surname}'}),
			    template :new sap.m.Label({ text :"{Nachn}"}),
			});
			var ColumnName = new sap.ui.table.Column({
			    label :new sap.m.Label({text : '{i18n>Name}'}),
			    template :new sap.m.Label({ text :"{Vorna}"}),
			});
			var ColumnIdApp = new sap.ui.table.Column({
			    label : new sap.m.Label({text : '{i18n>id_request}'}),
			    template : new sap.m.Label({ text :"{IdApp}"}),
			});
			var ColumnTypeApp = new sap.ui.table.Column({
			    label : new sap.m.Label({text : '{i18n>type_of_application}'}),
			    template : new sap.m.Label({ text :"{Type}"}),
			});
			var ColumnTypeText = new sap.ui.table.Column({
			    label : new sap.m.Label({text : '{i18n>Description_type_applications}'}),
			    template : new sap.m.Label({ text :"{TypeText}"}),
			});
			var ColumnStatus = new sap.ui.table.Column({
			    label : new sap.m.Label({text : '{i18n>Status}'}),
			    template : new sap.m.Label({ text :"{Status}"}),
			});
			var ColumnBegda = new sap.ui.table.Column({
			    label : new sap.m.Label({text : '{i18n>Valid_with}'}),
			    template : new sap.m.Label({ text :"{Begda}"}),
			});
			var ColumnEndda = new sap.ui.table.Column({
			    label : new sap.m.Label({text : '{i18n>Valid_by}'}),
			    template : new sap.m.Label({ text :"{Endda}"}),
			});
			var ColumnTimez2 = new sap.ui.table.Column({
			    label : new sap.m.Label({text : '{i18n>Hours_of_absence}'}),
			    template : new sap.m.Label({ text :"{Timez2}"}),
			});
			var ColumnTimez = new sap.ui.table.Column({
			    label : new sap.m.Label({text : '{i18n>clock}'}),
			    template : new sap.m.Label({ text :"{Timez}"}),
			});
			
			var ApplicationTable = new sap.ui.table.Table({
				selectionMode:sap.ui.table.SelectionMode.Single,
				columns:[
					ColumnPernr,
					ColumnSurname,
					ColumnName,
					ColumnIdApp,
					ColumnTypeApp,
					ColumnStatus,
					ColumnBegda,
					ColumnEndda,
				]
			});
			
			
			ApplicationTable.setModel(oModel);
			ApplicationTable.bindRows("/RequestSearchToolSet");
			
			var SerchMainPanel = new sap.ui.layout.form.SimpleForm({
				width : "100%",
				backgroundDesign : "Transparent",
				columnsL : 2,
				columnsM : 2,
				columnsXL : 2,
				content : [ 
					new sap.m.Label({
						 text:"{i18n>search}",
						}),
					searchInput ]
			}).addStyleClass("SearchForm")
			SerchMainPanel.addStyleClass("SearchMainForm");
			
			var TableForm = new sap.ui.layout.form.SimpleForm({
				width : "100%",
				columnsL : 1,
				columnsM : 1,
				columnsXL : 1,
				editable : true,
				layout : sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
				content : [  ApplicationTable ]
			}).addStyleClass("table-form")
			
			var listApplicationDialog = new sap.m.Dialog({

		        title : "{i18n>List_of_application}",
		        icon:"sap-icon://nutrition-activity",
		        contentWidth : "950px",
		        content:[
		        	SerchMainPanel,
		        	TableForm
		        	
		        ],
		        beginButton : [ new sap.m.Button({
		        text : "OK",
		        press: function(){
		        	 	var selectRow = ApplicationTable.getSelectedIndices();
			            if(selectRow.length>0){
			            	var idx = selectRow [0];
			                var cxt = ApplicationTable.getContextByIndex (idx);
			                var path = cxt.sPath;
			                var obj = ApplicationTable.getModel().getProperty (path);
			                inputIdRequest.setValue(obj.IdApp);
			                typeRequestInput.setValue(obj.TypeText);
			                inputPernr.setValue(obj.PernrEmpl);
			                inputDateFrom.setValue(obj.Begda);
			                inputDateOn.setValue(obj.Endda);
			                
			                listApplicationDialog.close();
			            }
		          	}
		        }) ],
		        endButton : [ new sap.m.Button({
		        text : "Cancel",
		        press : function() {
		        	listApplicationDialog.close();
		        		},
		        }) ]
		    });
			listApplicationDialog.open();			
		},
/////////////////////////////////////////////////////////////////////////Диалоговое окно для выбора заявок КОНЕЦ
		
/////////////////////////////////////////////////////////////////////////Диалоговое окно для выбора пользователя

		openListEMPDialog:function(){
////////////////////////////////////////////////Список ФН
			var oView = this.getView();
			var pernrInput =oView.byId("inputPernr");
			var listFA =  new sap.m.ComboBox({
				
			})
			var searchInput = new sap.m.SearchField({
			
			})
			
			// Таблица с данными пользователей
			
			var ColumnPernr = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>personal_number}'}),
			    template : new sap.m.Label({ text : "{Pernr}"}),
				
			});
			var ColumnFIO = new sap.ui.table.Column({
			    label :new sap.m.Label({text : '{i18n>full_name}'}),
			    template :new sap.m.Label({ text :"{NachnVorna}"}),
			
			
			});
			var ColumnFA = new sap.ui.table.Column({
			    label : new sap.m.Label({text : '{i18n>FA}'}),
			    template : new sap.m.Label({ text :"{Dep}"}),
			
			   
			});
			var UserTable = new sap.ui.table.Table({
				selectionMode:sap.ui.table.SelectionMode.Single,
				columns:[
					ColumnPernr,
					ColumnFIO,
					ColumnFA
				]
			});
			empListMain= {};
			oModel.read("/SearchToolSet", null, null, false, function(oData, oResponse) {

				empListMain = oData.results;

			 });
			UserTable.bindRows("/");
			var localEMPLModel  = new sap.ui.model.json.JSONModel(empListMain);
			UserTable.setModel(localEMPLModel);
			
			var TableForm = new sap.ui.layout.form.SimpleForm(
				{
				    width : "100%",
				    columnsL : 1,
				    columnsM : 1,
				    columnsXL : 1,
				    editable : true,
				    layout : sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
				    content : [  UserTable ]
				}).addStyleClass("table-form")
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Основная форма в окне поиска
			var SerchMainPanel = new sap.ui.layout.form.SimpleForm(
				{
				    width : "100%",
				    backgroundDesign : "Transparent",
				    columnsL : 2,
				    columnsM : 2,
				    columnsXL : 2,
				    content : [ 
				    	new sap.m.Label({
				    	 text:"{i18n>FA}",
				    	}),
				    	listFA,
				    	new sap.m.Label({
					    	 text:"{i18n>search}",
					    	}),
						searchInput ]
				}).addStyleClass("SearchForm")
			SerchMainPanel.addStyleClass("SearchMainForm");
			var self=this;
			var listEMPDialog = new sap.m.Dialog({

		        title : "{i18n>List_of_employees}",
		        icon:"sap-icon://activity-individual",
		        contentWidth : "700px",
		        content:[
		        	SerchMainPanel,
		        	TableForm
		        	
		        ],
		        beginButton : [ new sap.m.Button({
		        text : "OK",
		        press: function(){
		        	
		        	 var typeRequest = self.getView().byId("typeRequest");
		        	 var selectItem= typeRequest.getSelectedItem();
		        	
		            var selectRow = UserTable.getSelectedIndices();
		            if(selectRow.length>0){
		            	var idx = selectRow [0];
		                var cxt = UserTable.getContextByIndex (idx);
		                var path = cxt.sPath;
		                var obj = UserTable.getModel (). getProperty (path);
		                pernrInput.setValue(obj.Pernr);
		                listEMPDialog.close();
		                if(selectItem.getKey()=='13'){self.feelingTableRuntimeTable(obj.Pernr);};
		            }else{
		            	listEMPDialog.close();
		            }
		            
		        }
		          }) ],
		          endButton : [ new sap.m.Button({
		        text : "Cancel",
		        press : function() {
		        	listEMPDialog.close();
		        },
		          }) ]
		    });
			listEMPDialog.open();
		},
/////////////////////////////////////////////////////////////////////////Диалоговое окно НАЛОЖЕНИЯ БОЛЬНИЧНОГО НА ОТПУСК НАЧАЛО
		dialogCarry:function(titleDialog,titleNavCont,modelButton,objApplication){
			var self=this;
			var dReqIllColumn = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>id_request}'}),
			    template : new sap.m.Label({ text : "{IdReqIll}"}),
			});
			
			var IdReqColumn = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>id_cgange_request}'}),
			    template : new sap.m.Label({ text : "{IdReq}"}),
			});
			
			var OldBegdaColumn = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>old_date_from}'}),
			    template :new sap.ui.commons.TextView({
			        text : { 
			            path : 'OldBegda',
			            type: "sap.ui.model.type.Date",
			            type: 'sap.ui.model.type.Date',
			            formatOptions: {
			              source: {
			                pattern: 'yyyy-MM-ddTHH:mm:ss'
			              },
			              pattern: 'd MMM, yyyy'
			            }
			        }
			    }),
			});
			
			var OldEnddaColumn = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>old_date_on}'}),
			    template :new sap.ui.commons.TextView({
			        text : { 
			            path : 'OldEndda',
			            type: "sap.ui.model.type.Date",
			            type: 'sap.ui.model.type.Date',
			            formatOptions: {
			              source: {
			                pattern: 'yyyy-MM-ddTHH:mm:ss'
			              },
			              pattern: 'd MMM, yyyy'
			            }
			        }
			    }),
			});
			
			var NewBegdaColumn = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>new_date_from}'}),
			    template :new sap.ui.commons.TextView({
			        text : { 
			            path : 'NewBegda',
			            type: "sap.ui.model.type.Date",
			            type: 'sap.ui.model.type.Date',
			            formatOptions: {
			              source: {
			                pattern: 'yyyy-MM-ddTHH:mm:ss'
			              },
			              pattern: 'd MMM, yyyy'
			            }
			        }
			    }),
			});
			
			var NewEnddaColumn = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>new_date_on}'}),
			    template :new sap.ui.commons.TextView({
			        text : { 
			            path : 'NewEndda',
			            type: "sap.ui.model.type.Date",
			            type: 'sap.ui.model.type.Date',
			            formatOptions: {
			              source: {
			                pattern: 'yyyy-MM-ddTHH:mm:ss'
			              },
			              pattern: 'd MMM, yyyy'
			            }
			        }
			    }),
			});
			
			var IdReqNewColumn = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>id_req_new}'}),
			    template : new sap.m.Label({ text : "{IdReqNew}"}),
			});
			
			var TypeOfBreakColumn = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>Type_Of_Break}'}),
			    template : new sap.m.Label({ text : "{TypeOfBreak}"}),
			});
			
			var TypeColumn = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>type}'}),
			    template : new sap.m.Label({ text : "{Type}"}),
			});
		
			var StatusNewColumn = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>New_Status}'}),
			    template : new sap.m.Label({ text : "{StatusNew}"}),
			});
			
			var NeedChangeWfColumn = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>stream_will_be_changed}'}),
			    template : new sap.m.Label({ text : "{NeedChangeWf}"}),
			});
			
			var StatusTextColumn = new sap.ui.table.Column({
			    label : new sap.m.Label({text :'{i18n>Status}'}),
			    template : new sap.m.Label({ text : "{StatusText}"}),
			});
			
			var tableCarry= new sap.ui.table.Table({
				selectionMode: sap.ui.table.SelectionMode.None,
				columns:[
					//IdReqIllColumn,
					IdReqColumn,
					OldBegdaColumn,
					OldEnddaColumn,
					NewBegdaColumn,
					NewEnddaColumn,
					IdReqNewColumn,
					//TypeOfBreakColumn,
					//TypeColumn,
					//StatusNewColumn,
					//NeedChangeWfColumn,
					StatusTextColumn,
				]
			});
			
			var groupBut= new sap.m.RadioButton({
				text:"{Buttons}",
			});
			var radioGroupCarry= new sap.m.RadioButtonGroup({
				columns: 3,
				selectedIndex: -1,
				buttons:[
					
				],
				select:function(){
					self.changeCarry(radioGroupCarry,tableCarry,objApplication)
				}, 
			});
			
			radioGroupCarry.setModel(modelButton);
			radioGroupCarry.bindButtons({
			        path:'/',
			        template: groupBut,
			        templateShareable: true
			      });
			var butPanel = new sap.m.Panel({
				headerText:titleNavCont,
				content:[
					radioGroupCarry
				]
			});
			
			var tablePanel = new sap.m.Panel({
				headerText:"{i18n>Transfer_results}",
				content:[
					tableCarry
				]
			});
			
			var carryDialog= new sap.m.Dialog({

		        title : titleDialog,
		        icon:"sap-icon://activity-individual",
		        contentWidth : "700px",
		        content:[
		        	butPanel,
		        	tablePanel
		        ],
		        beginButton : [ new sap.m.Button({
		        text : "{i18n>Confirm}",
		        press: function(){
		        	var setButIndex= (radioGroupCarry.getSelectedIndex()+1);
		        	var selectButObj= {};
		        	var readMessage;
		        	
					selectButObj.UserEnter=setButIndex;
					selectButObj.IsConfirm=true;
		        	oModel.create('/RequestDataSet', objApplication,{
				    	  success: function (oData, oResponse) {
				    		 
				         },
				         error: function (oError) {
				        	
				         }
				      });
				      
				     oModel.create('/RadiobuttonDataSet', selectButObj,{
						  success: function (oData, oResponse) {
							
						 },
						 error: function (oError) {
			
						 }
					});
				     readMessage = self.getMessage();
				     sap.m.MessageToast.show (readMessage);
				     carryDialog.close();
		        }
		          }) ],
		          endButton : [ new sap.m.Button({
		        text : "{i18n>Cancel}",
		        press : function() {
		        	carryDialog.close();
		        },
		          }) ]
		    });
			carryDialog.open();
		},
/////////////////////////////////////////////////////////////////////////Диалоговое окно НАЛОЖЕНИЯ БОЛЬНИЧНОГО НА ОТПУСК КОНЕЦ
		
/////////////////////////////////////////////////////////////////////////Функция для изменения данных в таблицы пересечения НАЧАЛО	
		changeCarry:function(radioGroupCarry,tableCarry,objApplication){
			var self=this;
			var dataTable= tableCarry.getModel();
			var test= dataTable.oData;
			var setButIndex= (radioGroupCarry.getSelectedIndex()+1);
			if(JSON.stringify(dataTable.oData)=={}){
				this.SendSelectButton(setButIndex,tableCarry);
			}else{
				this.repeatSendDataApplication(objApplication,setButIndex,tableCarry);
			}
			
		},
/////////////////////////////////////////////////////////////////////////Функция для изменения данных в таблицы пересечения КОНЕЦ
		
/////////////////////////////////////////////////////////////////////////Функция для изменения данных в таблицы пересечения НАЧАЛО	
		setDataToCarryTable:function(tableCarry){
			var carryList= {};
			oModel.read("/IllnessRequestsSet", null, null, false, function(oData, oResponse) {

				carryList = oData.results;

			 });
			tableCarry.bindRows("/");
			var carryListModel  = new sap.ui.model.json.JSONModel(carryList);
			tableCarry.setModel(carryListModel);
		},
/////////////////////////////////////////////////////////////////////////Функция для изменения данных в таблицы пересечения КОНЕЦ		

/////////////////////////////////////////////////////////////////////////Функция повторной отправки данных о Созданной заявке НАЧАЛО	
		repeatSendDataApplication:function(objApplication,setButIndex,tableCarry){
			var self=this;
			oModel.create('/RequestDataSet', objApplication,{
		    	  success: function (oData, oResponse) {
		    		  self.SendSelectButton(setButIndex,tableCarry);
		         },
		         error: function (oError) {
		        	
		         }
		      })
		},
/////////////////////////////////////////////////////////////////////////Функция повторной отправки данных о Созданной заявке КОНЕЦ	
		
/////////////////////////////////////////////////////////////////////////Функция повторной отправки данных о Созданной заявке НАЧАЛО	
		SendSelectButton:function(indexButton,tableCarry){
			var self=this;
			var selectButObj= {};
			selectButObj.UserEnter=indexButton;
			oModel.create('/RadiobuttonDataSet', selectButObj,{
				  success: function (oData, oResponse) {
					  self.setDataToCarryTable(tableCarry);
				 },
				 error: function (oError) {
	
				 }
			})
		},
/////////////////////////////////////////////////////////////////////////Функция повторной отправки данных о Созданной заявке КОНЕЦ	
		
	});

});

