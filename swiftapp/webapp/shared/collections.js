CustomerAccounts =  new Meteor.Collection("customerAccounts");
WorkerAccounts = new Meteor.Collection("workerAccounts");
WorkerAccounts.allow({
  insert:function(){
    return true;
  },
  update:function(){
    return true;
  },
  remove:function(){
    return true;
  }
});
CustomerAccounts.allow({
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

WorkerAccounts.attachSchema(Schemas.Worker);
CustomerAccounts.attachSchema(Schemas.Customer);
