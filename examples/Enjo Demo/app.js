enyo.kind({
	kind: "VFlexBox",
	name: "loginBlock",
	components: [
		{kind: "HFlexBox", components: [
			{kind: "Button", caption: "Login"},
			{kind: "Button", caption: "Cancel"}
		]}
	]
});


enyo.kind({
	kind: "VFlexBox",
	name: "myApp",
	components: [
		{kind: "Header", content: "Enjo Demo"},
		{style: "height: 20px;"},
		{kind: "Button", name: "eventPasser", caption: "This button passes a click event.", onclick: "theClickMethod"},
		{kind: "Button", caption: "This button defines the click method inline.", onclick: function(){
			alert("This works too!");
		}},
		{kind: "Button", disabled: true, caption: "This button is disabled."},
		
		{kind: "Label", content: "Username:"},
		{kind: "Input"},
		{kind: "Label", content: "Password:"},
		{kind: "PasswordInput"},
		
		{kind: "loginBlock"},
		
		{kind: "RadioGroup", name: "myGroup", onclick: "myGroupClick", components: [
		 	{caption: "Hey there!"},
		 	{caption: "Option 2!"}
		]},
		
		{name: "statusText", content: "Select one"},

		{kind: "Title", content: "Drawers"},
		{style: "height: 20px;"},
		{kind: "Drawer", name: "drawer", caption: "Drawer", components: [
			{content: "Now you see me now you don't"},
			{kind: "Button", caption: "Close drawer", onclick: "closeDrawer"}
		]},
		{kind: "Button", caption: "Toggle Drawer", onclick: "toggleDrawer"},
		
		{kind: "Footer", content: "Check out this cool Footer!"},
		
		{kind: "Scrim", showing: false, components: [
			{content: "Tap anywhere to dismiss...", style: "margin-top: 55px; color: white; margin-left: auto; margin-right: auto; text-align: center;"}
		]},
	],
	
	closeDrawer: function(inSender) {
	    this.$.drawer.close();
	},
	
	toggleDrawer: function(inSender) {
	    this.$.drawer.toggleOpen();
	},
	
	theClickMethod: function(){
		
		//Change input values:
		this.$.Input.getValue();
		this.$.Input.setValue("It works!");
		
		this.$.eventPasser.setDisabled(true);
		this.$.eventPasser.setCaption("This change was done using Enyo code...");
		
		window.setTimeout((function(){
			//Use the jo methods to enable it and change it's value.
			this.$.eventPasser.jo().setData("... and this change was done using Jo code.");
			this.$.eventPasser.jo().enable();
		}).bind(this), 1000);
	},
	
	myGroupClick: function(inSender, e) {
		this.$.statusText.setContent("Current selection: " + inSender.getValue());
		this.$.Scrim.setShowing(true);
	}

});

