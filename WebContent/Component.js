sap.ui.define([ 'jquery.sap.global', 'sap/ui/core/UIComponent' ], function(
	jQuery, UIComponent) {
    "use strict";

    var Component = UIComponent.extend("sap.myApps.Component", {
	metadata : {
	    manifest : "json",
	    config : {
		"titleResource" : "WorkDate",
		"resourceBundle" : "i18n/i18n.properties",
		"routerClass" : "sap.m.routing.Router",
	    },
	},
	init : function() {
	 var oModelBundle = new sap.ui.model.resource.ResourceModel(
				    {

					bundleUrl : "i18n/i18n.properties"

				    });
			    sap.ui.getCore().setModel(oModelBundle, "i18n");
	    //UIComponent.prototype.init.apply(this, arguments);
	    var sLink = "/sap/opu/odata/sap/ZCREATE_REQUEST_GW_SRV/";
	    var loModel = new sap.ui.model.odata.v2.ODataModel(sLink, false);
	        loModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
	        sap.ui.getCore().setModel(loModel);

	},


    });
    return Component;
});
