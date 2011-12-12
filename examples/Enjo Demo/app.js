enyo.kind({
	kind: "VFlexBox",
	name: "loginBlock",
	components: [
		{kind: "HFlexBox", components: [
			{kind: "Button", caption: "Login", flex: 3},
			{kind: "Button", caption: "Cancel", flex: 1}
		]}
	]
});

enyo.kind({
	kind: "VFlexBox",
	name: "myApp",
	x: 5,
	components: [		
		{kind: "Header", content: "Enjo Demo"},
		{height: "20px"},
		{kind: "Pane", transitionKind: "enyo.transitions.LeftRightFlyin", components: [
		    {name: "mainView", components: [
		    	{kind: "Button", caption: "Push new view.", onclick: function(inSender){
		    		//this.$.Pane.jo().forward();
		    		//this.$.Pane.jo().push();
		    		this.$.Pane.selectView(this.$.otherView);
		    	}},
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
		    ]},
		    
		    {name: "otherView", components: [
		    	{kind: "Button", caption: "Other View", onclick: function(inSender){
		    		this.$.Pane.selectView(this.$.mainView);
		    	}},
		    ]}
		]},
		
		{height: "40px"},
		{kind: "Toolbar", content: "Check out this cool Footer!"},
		
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
	
	theClickMethod: function(inSender){
		
		//Change input values:
		this.$.Input.getValue();
		this.$.Input.setValue("It works!");
		
		//You can manipulate the variables in the kind:
		this.x++;
		console.log(this.x);
		
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
/*
myApp = (function(){
	this.renderInto = function(){
		// initialize jo
		jo.load();
		var stack
		new joScreen([
			new joContainer([
				new joFlexcol([
					new joNavbar("Header"),
					new joNavbar("Header"),
					stack = new joStackScroller()
				]),
				new joToolbar("Footer"),
			])
		]);
		
		stack.push([
			card = new joCard([
				new joTitle("Select an option below"),
				new joMenu([
					{ title: "About", id: "about" },
					{ title: "Form Widgets", id: "widgets" },
					{ title: "List Views", id: "lists" },
					{ title: "Table View", id: "tables" },
					{ title: "Popup Dialogs", id: "popups" },
					{ title: "Ajax Calls", id: "ajax" },
					{ title: "Themes and CSS", id: "themes" }
				]).selectEvent.subscribe(function(id) {

				})
			])
		]);
	};
})
*/
