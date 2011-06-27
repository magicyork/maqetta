/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/mobile/app/StageController",["dojo","dijit","dojox","dojox/mobile/app/SceneController"],function(_1,_2,_3){
_1.getObject("dojox.mobile.app.StageController",1);
_1.experimental("dojox.mobile.app.StageController");
_1.declare("dojox.mobile.app.StageController",null,{scenes:null,effect:"fade",constructor:function(_4){
this.domNode=_4;
this.scenes=[];
if(_1.config.mobileAnim){
this.effect=_1.config.mobileAnim;
}
},getActiveSceneController:function(){
return this.scenes[this.scenes.length-1];
},pushScene:function(_5,_6){
if(this._opInProgress){
return;
}
this._opInProgress=true;
var _7=_1.create("div",{"class":"scene-wrapper",style:{visibility:"hidden"}},this.domNode);
var _8=new _3.mobile.app.SceneController({},_7);
if(this.scenes.length>0){
this.scenes[this.scenes.length-1].assistant.deactivate();
}
this.scenes.push(_8);
var _9=this;
_1.forEach(this.scenes,this.setZIndex);
_8.stageController=this;
_8.init(_5,_6).addCallback(function(){
if(_9.scenes.length==1){
_8.domNode.style.visibility="visible";
_9.scenes[_9.scenes.length-1].assistant.activate(_6);
_9._opInProgress=false;
}else{
_9.scenes[_9.scenes.length-2].performTransition(_9.scenes[_9.scenes.length-1].domNode,1,_9.effect,null,function(){
_9.scenes[_9.scenes.length-1].assistant.activate(_6);
_9._opInProgress=false;
});
}
});
},setZIndex:function(_a,_b){
_1.style(_a.domNode,"zIndex",_b+1);
},popScene:function(_c){
if(this._opInProgress){
return;
}
var _d=this;
if(this.scenes.length>1){
this._opInProgress=true;
this.scenes[_d.scenes.length-2].assistant.activate(_c);
this.scenes[_d.scenes.length-1].performTransition(_d.scenes[this.scenes.length-2].domNode,-1,this.effect,null,function(){
_d._destroyScene(_d.scenes[_d.scenes.length-1]);
_d.scenes.splice(_d.scenes.length-1,1);
_d._opInProgress=false;
});
}else{
}
},popScenesTo:function(_e,_f){
if(this._opInProgress){
return;
}
while(this.scenes.length>2&&this.scenes[this.scenes.length-2].sceneName!=_e){
this._destroyScene(this.scenes[this.scenes.length-2]);
this.scenes.splice(this.scenes.length-2,1);
}
this.popScene(_f);
},_destroyScene:function(_10){
_10.assistant.deactivate();
_10.assistant.destroy();
_10.destroyRecursive();
}});
return _1.getObject("dojox.mobile.app.StageController");
});
require(["dojox/mobile/app/StageController"]);
