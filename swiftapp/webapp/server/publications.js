Meteor.publish('customerAccounts', function () {
  return CustomerAccounts.find();
});
Meteor.publish('workerAccounts',function(){
  return WorkerAccounts.find();
});
