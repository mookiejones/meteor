App = {subs: {}, defaults:{}};

if (Meteor.isServer){
	TjSwiftHouse={};

	Meteor.startup(function(){
		console.log("STARTING.....");
		console.dir(Meteor.settings);
	});
}
