function ucfirst(e){return e?e[0].toUpperCase()+e.substr(1):e}function addNamespace(e){return(CONST.IMPLICIT_NAMESPACES[e]||CONST.NAMESPACE_DEFAULT)+"."+e}function processStyle(e,t,n,i,r){i=i||{},i.classes=n,t.apiName&&(i.apiName=t.apiName),t.id&&(i.id=t.id),t.applyProperties(exports.createStyle(e,i,r)),t.classes=n}function isTabletFallback(){return Math.min(Ti.Platform.displayCaps.platformHeight,Ti.Platform.displayCaps.platformWidth)>=700}function deepExtend(){var e,t,n,i,r,o,a=arguments[0]||{},s=1,l=arguments.length,u=!1;for("boolean"==typeof a&&(u=a,a=arguments[1]||{},s=2),"object"==typeof a||_.isFunction(a)||(a={});l>s;s++)if(e=arguments[s],null!=e){"string"==typeof e&&(e=e.split(""));for(t in e)n=a[t],i=e[t],a!==i&&(u&&i&&!_.isFunction(i)&&_.isObject(i)&&((r=_.isArray(i))||!_.has(i,"apiName"))?(r?(r=!1,o=n&&_.isArray(n)?n:[]):o=_.isDate(i)?new Date(i.valueOf()):n&&_.isObject(n)?n:{},a[t]=deepExtend(u,o,i)):a[t]=i)}return a}var _=require("alloy/underscore")._,Backbone=require("alloy/backbone"),CONST=require("alloy/constants");exports.version="1.7.0",exports._=_,exports.Backbone=Backbone;var DEFAULT_WIDGET="widget",TI_VERSION=Ti.version,MW320_CHECK=!1,IDENTITY_TRANSFORM=Ti.UI.create2DMatrix(),RESET={bottom:null,left:null,right:null,top:null,height:null,width:null,shadowColor:null,shadowOffset:null,backgroundImage:null,backgroundRepeat:null,center:null,layout:null,backgroundSelectedColor:null,backgroundSelectedImage:null,opacity:1,touchEnabled:!0,enabled:!0,horizontalWrap:!0,zIndex:0,backgroundColor:"transparent",font:null,visible:!0,color:"#000",transform:IDENTITY_TRANSFORM,backgroundGradient:null,borderColor:null,borderRadius:null,borderWidth:null};RESET=_.extend(RESET,{backgroundDisabledColor:null,backgroundDisabledImage:null,backgroundFocusedColor:null,backgroundFocusedImage:null,focusable:!1,keepScreenOn:!1}),exports.M=function(e,t,n){var i,r=(t||{}).config||{},o=r.adapter||{},a={},s={};o.type?(i=require("alloy/sync/"+o.type),a.sync=function(e,t,n){return i.sync(e,t,n)}):a.sync=function(e,t){Ti.API.warn("Execution of "+e+"#sync() function on a model that does not support persistence"),Ti.API.warn("model: "+JSON.stringify(t.toJSON()))},a.defaults=r.defaults,n&&(s.migrations=n),i&&_.isFunction(i.beforeModelCreate)&&(r=i.beforeModelCreate(r,e)||r);var l=Backbone.Model.extend(a,s);return l.prototype.config=r,_.isFunction(t.extendModel)&&(l=t.extendModel(l)||l),i&&_.isFunction(i.afterModelCreate)&&i.afterModelCreate(l,e),l},exports.C=function(e,t,n){var i,r={model:n},o=(n?n.prototype.config:{})||{};o.adapter&&o.adapter.type?(i=require("alloy/sync/"+o.adapter.type),r.sync=function(e,t,n){return i.sync(e,t,n)}):r.sync=function(e,t){Ti.API.warn("Execution of "+e+"#sync() function on a collection that does not support persistence"),Ti.API.warn("model: "+JSON.stringify(t.toJSON()))};var a=Backbone.Collection.extend(r);return a.prototype.config=o,_.isFunction(t.extendCollection)&&(a=t.extendCollection(a)||a),i&&_.isFunction(i.afterCollectionCreate)&&i.afterCollectionCreate(a),a},exports.UI={},exports.UI.create=function(controller,apiName,opts){opts=opts||{};var baseName,ns,parts=apiName.split(".");if(1===parts.length)baseName=apiName,ns=opts.ns||CONST.IMPLICIT_NAMESPACES[baseName]||CONST.NAMESPACE_DEFAULT;else{if(!(parts.length>1))throw"Alloy.UI.create() failed: No API name was given in the second parameter";baseName=parts[parts.length-1],ns=parts.slice(0,parts.length-1).join(".")}opts.apiName=ns+"."+baseName,baseName=baseName[0].toUpperCase()+baseName.substr(1);var style=exports.createStyle(controller,opts);return eval(ns)["create"+baseName](style)},exports.createStyle=function(e,t,n){var i,r;if(!t)return{};i=_.isArray(t.classes)?t.classes.slice(0):_.isString(t.classes)?t.classes.split(/\s+/):[],r=t.apiName,r&&-1===r.indexOf(".")&&(r=addNamespace(r));var o;o=require(e&&_.isObject(e)?"alloy/widgets/"+e.widgetId+"/styles/"+e.name:"alloy/styles/"+e);var a,s,l={};for(a=0,s=o.length;s>a;a++){var u=o[a],c=u.key;if(u.isApi&&-1===c.indexOf(".")&&(c=(CONST.IMPLICIT_NAMESPACES[c]||CONST.NAMESPACE_DEFAULT)+"."+c),u.isId&&t.id&&u.key===t.id||u.isClass&&_.contains(i,u.key));else{if(!u.isApi)continue;if(-1===u.key.indexOf(".")&&(u.key=addNamespace(u.key)),u.key!==r)continue}u.queries&&u.queries.formFactor&&!Alloy[u.queries.formFactor]||u.queries&&u.queries["if"]&&("false"===u.queries["if"].trim().toLowerCase()||-1!==u.queries["if"].indexOf("Alloy.Globals")&&!1===Alloy.Globals[u.queries["if"].split(".")[2]])||deepExtend(!0,l,u.style)}var d=_.omit(t,[CONST.CLASS_PROPERTY,CONST.APINAME_PROPERTY]);return deepExtend(!0,l,d),l[CONST.CLASS_PROPERTY]=i,l[CONST.APINAME_PROPERTY]=r,MW320_CHECK&&delete l[CONST.APINAME_PROPERTY],n?_.defaults(l,n):l},exports.addClass=function(e,t,n,i){if(!n)return void(i&&(MW320_CHECK&&delete i.apiName,t.applyProperties(i)));var r=t[CONST.CLASS_PROPERTY]||[],o=r.length;n=_.isString(n)?n.split(/\s+/):n;var a=_.union(r,n||[]);return o===a.length?void(i&&(MW320_CHECK&&delete i.apiName,t.applyProperties(i))):void processStyle(e,t,a,i)},exports.removeClass=function(e,t,n,i){n=n||[];var r=t[CONST.CLASS_PROPERTY]||[],o=r.length;if(!o||!n.length)return void(i&&(MW320_CHECK&&delete i.apiName,t.applyProperties(i)));n=_.isString(n)?n.split(/\s+/):n;var a=_.difference(r,n);return o===a.length?void(i&&(MW320_CHECK&&delete i.apiName,t.applyProperties(i))):void processStyle(e,t,a,i,RESET)},exports.resetClass=function(e,t,n,i){n=n||[],n=_.isString(n)?n.split(/\s+/):n,processStyle(e,t,n,i,RESET)},exports.createWidget=function(e,t,n){return"undefined"!=typeof t&&null!==t&&_.isObject(t)&&!_.isString(t)&&(n=t,t=DEFAULT_WIDGET),new(require("alloy/widgets/"+e+"/controllers/"+(t||DEFAULT_WIDGET)))(n)},exports.createController=function(e,t){return new(require("alloy/controllers/"+e))(t)},exports.createModel=function(e,t){return new(require("alloy/models/"+ucfirst(e)).Model)(t)},exports.createCollection=function(e,t){return new(require("alloy/models/"+ucfirst(e)).Collection)(t)},exports.isTablet=function(){var e=Ti.Platform.Android.physicalSizeCategory;return e===Ti.Platform.Android.PHYSICAL_SIZE_CATEGORY_LARGE||e===Ti.Platform.Android.PHYSICAL_SIZE_CATEGORY_XLARGE}(),exports.isHandheld=!exports.isTablet,exports.Globals={},exports.Models={},exports.Models.instance=function(e){return exports.Models[e]||(exports.Models[e]=exports.createModel(e))},exports.Collections={},exports.Collections.instance=function(e){return exports.Collections[e]||(exports.Collections[e]=exports.createCollection(e))},exports.CFG=require("alloy/CFG"),exports.Android={},exports.Android.menuItemCreateArgs=["itemId","groupId","title","order","actionView","checkable","checked","enabled","icon","showAsAction","titleCondensed","visible"];