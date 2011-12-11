Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};

var enyo = {
	_kinds: {
		/*
		 * FORMS:
		 */
		"Button": {
			"name": "Button",
			"f": function(fO){
				//Create a joButton with the caption, and pass a blank function for the click if none is defined.
				if(fO.disabled === true){
					return enyo._joVariables[this.name] = new joButton(fO.caption || "Button").disable();
				}else{
					return enyo._joVariables[this.name] = new joButton(fO.caption || "Button");
				}
			},
			"setCaption": function(fO){
				enyo._joVariables[this.name].setData(fO);
				return true;
			},
			"setDisabled": function(fO){
				//Enable/Disable the button.
				if(fO === true){
					enyo._joVariables[this.name].disable();
				}else if(fO === false){
					enyo._joVariables[this.name].enable();
				}
				//We did it!
				return true;
			}
		},
		"RadioGroup": {
			"name": "RadioGroup",
			"f": function(fO){
				return enyo._joVariables[this.name] = new joOption();
			},
			"getValue": function(fO){
				//Return the text value of the currently selected option.
				return enyo._joVariables[this.name].getData()[enyo._joVariables[this.name].getValue()];
			},
			"getIndex": function(fO){
				//Return the index of the currently selected items.
				return enyo._joVariables[this.name].getValue();
			}
		},
		"Input": {
			"name": "Input",
			"f": function(fO){
				return enyo._joVariables[this.name] = new joInput(fO.content);
			},
			"getValue": function(fO){
				return enyo._joVariables[this.name].getData();
			},
			"setValue": function(fO){
				enyo._joVariables[this.name].setData(fO);
				return true;
			}
		},
		"PasswordInput": {
			"name": "PasswordInput",
			"f": function(fO){
				return new joPasswordInput(fO.content);
			}
		},
		"HtmlContent": {
			"name": "HtmlContent",
			"f": function(fO){
				return enyo._joVariables[this.name] = new joHTML(fO.content);
			},
			"setContent": function(fO){
				enyo._joVariables[this.name].setData(fO);
			}
		},
		"Label": {
			"name": "Label",
			"f": function(fO){
				return new joLabel(fO.content);
			}
		},
		"Caption": {
			"name": "Caption",
			"f": function(fO){
				return new joCaption(fO.content);
			}
		},
		"Header": {
			"name": "Header",
			"f": function(fO){
				return new joNavbar(fO.content);
			}
		},
		"Footer": {
			"name": "Footer",
			"f": function(fO){
				return new joToolbar(fO.content);
			}
		},
		"Image": {
			"name": "Image",
			"f": function(fO){
				return;
			}
		},
		
		"Drawer": {
			"name": "Drawer",
			"f": function(fO){
				if(fO.open === true){
					return enyo._joVariables[this.name] = new joExpando([
					    new joExpandoTitle(fO.caption || "Expand")
					]).open();
				}else{
					return enyo._joVariables[this.name] = new joExpando([
					    new joExpandoTitle(fO.caption || "Expand")
					]);
				}
			},
			"close": function(fO){
				enyo._joVariables[this.name].close();
				return true;
			},
			"open": function(fO){
				enyo._joVariables[this.name].open();
				return true;
			},
			"toggleOpen": function(fO){
				enyo._joVariables[this.name].toggle();
				return true;
			}
		},
		
		"Title": {
			"name": "Title",
			"f": function(fO){
				return new joTitle(fO.content);
			}
		},
		
		"VFlexBox": {
			"name": "VFlexBox",
			"f": function(fO){
				return new joFlexcol();
			}
		},
		"HFlexBox": {
			"name": "HFlexBox",
			"f": function(fO){
				return new joFlexrow();
			}
		},
		"Scrim": {
			"name": "Scrim",
			"f": function(fO){
				if(fO.showing && fO.showing === true){
					return enyo._joVariables[this.name] = new joShim().show();
				}else{
					return enyo._joVariables[this.name] = new joShim();
				}
			},
			"setShowing": function(fO){
				if(fO === true){
					enyo._joVariables[this.name].show();
				}else if(fO === false){
					enyo._joVariables[this.name].hide();
				}
			}
		},
		"Function": {
			"name": "Function",
			"f": function(fO){
				//Enpty Function kind that will run any function you assign the key "f". I personally find this useful for running inline code.
				fO.f(this);
				return enyo._joVariables[this.name] = new joContainer();
			}
		},
		"Container": {
			"name": "Container",
			"f": function(fO){
				return enyo._joVariables[this.name] = new joContainer();
			}
		}
	},
	
	__kinds: {
		
	},
	
	_joVariables: {
		
	},
	
	//These can be recursive functions:
	kind: function(enyoObject, r){
		if(!r){
			//Establish the core binder:
			enyo.__kinds[enyoObject.name || enyoObject.kind] = enyoObject;
			enyo.binder = enyo.__kinds[enyoObject.name || enyoObject.kind];
			
			//Set up object method access:
			enyo.binder["$"] = {};
			
		}
		
		//Create the initial kind which everything will be dumped into.
		if (!this.kindCompare(enyoObject.kind)) {
			if(enyoObject.caption){
				enyoObject.kind = "Caption";
			}else if(enyoObject.content){
				enyoObject.kind = "HtmlContent";
			}else{
				enyoObject.kind = "Container";
			}
		}
		
		
		//Clone our kind with all of it's methods, and it's constructor. Name it.
		var cashID = enyoObject.name || enyoObject.kind || Math.round(Math.random() * 10000);
		var methods = enyo._kinds[enyoObject.kind].clone();
		methods.name = cashID;
		
		//Create the core object. Everything gets pushed into this.
		var core = methods.f(enyoObject);
		
		////////////////////////////////////////////////////////////////
		
		/*
		 * 
		 * 
		 * Style:
		 * 
		 * 
		 */
		
		if(enyoObject.style){
			if(core.setStyle){
				//Because this hasn't been rendered into the DOM yet, we can't apply CSS on the fly. 
				//joDOM.applyCSS(enyoObject.style, core);
				
				var styleName = cashID + Math.round(Math.random() * 10000);
				var style = document.createElement("style");
				style.type = "text/css";
				style.innerHTML = "." + styleName + " {" + enyoObject.style + "}";
				document.getElementsByTagName('head')[0].appendChild(style);
				
				core.setStyle(styleName);
			}
		}
		//TODO:
		//Flex, Height, Width all inline.
		
		/*
		 * 
		 *
		 * Methods:
		 *
		 * 
		 */
		
		if(this.kindCompare(enyoObject.kind)){
			if(methods){
				//Get rid of the contructor method:
				delete methods.f;
				//Clear out/make the object that we want to push our methods to.
				enyo.binder.$[cashID] = {};
				methods = enyo.mixin(methods, {
					jo: function(){
						return enyo._joVariables[cashID];
					}
				});
				enyo.mixin(enyo.binder.$[cashID], methods);
			}
		}
		
		/*
		 * 
		 * 
		 * Universal Onclick
		 * 
		 * 
		 */
		
		if (enyoObject.onclick){
			if(core.selectEvent){
				if(typeof(enyoObject.onclick) == "string"){
					//Defined in the object itself.
					core.selectEvent.subscribe(enyo.binder[enyoObject.onclick].bind(enyo.binder, enyo.binder.$[cashID]) || function(){});
				}else if(typeof(enyoObject.onclick) == "function"){
					//Defined the function inline, set we just set the onclick handler to itself.
					core.selectEvent.subscribe(enyoObject.onclick.bind(enyo.binder) || function(){});
				}else{
					//Do nothing.
				}
			}
		}
		
		//Jo's menu's don't support the push method used with other components, so we have this custom catch:
		if (enyoObject.kind == "RadioGroup" || enyoObject.kind == "Menu") {
			eOcR = [];
			for (x in enyoObject.components) {
				if(enyoObject.components.hasOwnProperty(x)){
					eOcR.push(enyoObject.components[x].caption)
				}
			}
			core.setData(eOcR);
			core.refresh();
			delete enyoObject.components;
		}
		//Expando uses some interesting Syntax, so we'll do this customly:
		if (enyoObject.kind == "Drawer"){
			dCfE = new joExpandoContent();
			for (x in enyoObject.components) {
				if(enyoObject.components.hasOwnProperty(x)){
					dCfE.push(enyo.kind(enyoObject.components[x], true))
				}
			}
			core.push(dCfE);
			delete enyoObject.components;
		}
		if (enyoObject.components) {
			//if the core even allows us to push onto it:
			if(core.push){
				//Create a container for the components.
				for (x in enyoObject.components) {
					if(enyoObject.components.hasOwnProperty(x)){
						//Call the function recursively, and let it know that it's recursive.
						core.push(enyo.kind(enyoObject.components[x], true));
					}
				}
			}
		}
		
		//Add the function that returns the UI of the kind.
		enyoObject.f = function(){
			return core;
		}
		
		
		/*
		 *
		 * 
		 * Define the kind so we can use it in the future.
		 * 
		 *  
		 */
		if(enyoObject.name && !enyo._kinds[enyoObject.name] && !r){
			//This breaks our style applyer:
			enyo._kinds[enyoObject.name] = enyoObject;
			
			window[enyoObject.name] = function() {
			    //constructor
			};
			window[enyoObject.name].extend(window[enyoObject.name], {
			    renderInto: function(location) {
			    	//Load up all of Jo.
			    	jo.load();
			        //Render the application. Jo doesn't have a way to render it anywhere specifically, so we'll just assume they're calling with document.body.
			        var card = new joCard([
			        	core
			        ]);
			        // setup our stack and screen
					var stack = new joStack();
					var screen = new joScreen(stack);
					
					// put the card on our view stack
					stack.push(card);
			    }
			});
		}
		
		//At this point, we only want to return the UI elements. At some later point, we'll need to create the actual constructor for the rest of the Jo scene.
		return core;
	},
	
	kindCompare: function(name){
		if (enyo._kinds[name]) {
			return enyo._kinds[name];
		} else {
			return false;
		}
	},
	
	depends: function(){
		for(x in arguments){
			if(arguments.hasOwnProperty(x)){
				d = arguments[x];
				if(d.slice(-3) == "css"){
					enyo.sheet(arguments[x]);
				}else if(d.slice(-2) == "js"){
					enyo.script(arguments[x]);
				}
			}
		}
	},
	
	script: function(s){
		var tag = document.createElement("script");
		tag.type = "text/javascript";
		tag.src = s;
		document.getElementsByTagName('head')[0].appendChild(tag);
	},
	
	sheet: function(s){
		var tag = document.createElement("link");
		tag.rel = "stylesheet";
		tag.href = s;
		tag.type = "text/css";
		document.getElementsByTagName('head')[0].appendChild(tag);
	},
	
	mixin: function(destination, source){
		for (var k in source) {
			if (source.hasOwnProperty(k)) {
				destination[k] = source[k];
			}
		}
		return destination; 
	}
};

//Enable the joDOM. This is all we need to get going. The renderInto function will load the rest.

if(!("ENJOSETTINGS" in window)){
	ENJOSETTINGS = {
		"css": "css/jo2.css",
		"jo": "jo.js"
	}
}

if("joDOM" in window){
	joDOM.enable();
	//Load up the CSS:
	enyo.sheet(ENJOSETTINGS.css || "css/jo2.css");
	//Load up our depends.js file.
	enyo.script("depends.js");
}else{
	return false;
}