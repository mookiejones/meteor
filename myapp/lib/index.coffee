@App=
	subs:{}
	defaults:{}

if Meteor.isServer
		TjSwiftHouse={}
	Meteor.startup ->
		console.log 'STARTING....'
		console.dir Meteor.settings
