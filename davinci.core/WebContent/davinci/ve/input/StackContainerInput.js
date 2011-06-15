dojo.provide("davinci.ve.input.StackContainerInput");
dojo.require("davinci.ve.input.ContainerInput");

dojo.require("dojo.i18n");  
dojo.requireLocalization("davinci.ve", "veLang");
var langObj = dojo.i18n.getLocalization("davinci.ve", "veLang");

dojo.declare("davinci.ve.input.StackContainerInput", davinci.ve.input.ContainerInput, {

	propertyName: "title",
	
	childType: "dijit.layout.ContentPane",
	supportsHTML: "true",
	helpText: langObj.stackContainerInputHelp

		
});