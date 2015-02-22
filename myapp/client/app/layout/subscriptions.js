Meteor.autorun(function(){
  Meteor.subscribe('employeeAccounts', Session.get('account_search_term'));
});