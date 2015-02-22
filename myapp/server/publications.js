
Meteor.publish('employeeAccounts', function (account_search_term) {
  try{
    return EmployeeAccounts.find({
      full_name: { $regex: account_search_term, $options: 'i' }
    },{limit: 10});
  }catch(error){
    console.log(error);
  }
});