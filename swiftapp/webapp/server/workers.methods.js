Meteor.methods({
  createNewWorker: function(data){
    console.log('createNewWorker', data);

    data.createdAt = new Date();
    return WorkerAccounts.insert(data);
  },
  updateWorker: function(data){
    console.log('updateWorker', data);

    data.createdAt = new Date();
    return CustomerAccounts.update({_id: data._id}, {$set:{
      first: data.first,
      middle:data.middle,
      last: data.last,
      email:data.email,
      phone:data.phone,
      address:data.address
    }});
  }
});
