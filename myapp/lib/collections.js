/*************************************
	Collections
*************************************/

Tasks = new Meteor.Collection('tasks');
Resources = new Meteor.Collection('resources');
History = new Meteor.Collection('history');
Settings = new Meteor.Collection('settings');


EmployeeAccounts =  new Meteor.Collection("employeeAccounts");

EmployeeAccounts.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
});