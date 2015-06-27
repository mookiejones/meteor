

@Tasks = new Meteor.Collection 'tasks'
@Resources = new Meteor.Collection 'resources'
@History = new Meteor.Collection 'history'
@Settings = new Meteor.Collection 'settings'
@EmployeeAccounts =  new Meteor.Collection "employeeAccounts"

EmployeeAccounts.allow
  insert: (userId, doc) ->
    true

  update: (userId, doc, fields, modifier) ->
    true

  remove: (userId, doc) ->
    true
if Meteor.isServer
	Meteor.publish 'tasks',->
		Tasks.find()
	Meteor.publish 'resources',->
		Resources.find()
	Meteor.publish 'history',->
		History.find()
	Meteor.publish 'settings',->
		Settings.find()				
	Meteor.publish 'employeeAccounts',->
		EmployeeAccounts.find()				
if Meteor.isClient
	Meteor.subscribe 'tasks'
	Meteor.subscribe 'history'
	Meteor.subscribe 'resources'
	Meteor.subscribe 'settings'
	Meteor.subscribe 'employeeAccounts'