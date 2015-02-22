
Meteor.methods({
  createNewEmployee: function (options) {
    try{
      console.log('received a new employee: ' + JSON.stringify(options));

      options = options || {};

      // TODO:  add validation functions
      //        if (!(typeof options.text === "string" && options.text.length)){
      //            throw new Meteor.Error(400, "Required parameter missing");
      //        }
      //
      //        if (options.text.length > 100){
      //            throw new Meteor.Error(413, "Title too long");
      //        }
      //
      //        if (! options.list_id ){
      //            throw new Meteor.Error(413, "No list id!");
      //        }
      //
      //        if (! this.userId){
      //            throw new Meteor.Error(403, "You must be logged in");
      //        }

      return EmployeeAccounts.insert({
        first_name: options.first_name,
        last_name: options.last_name,
        address: options.address,
        city: options.city,
        state: options.state,
        zip: options.zip,
        phone: options.phone,
        email: options.email
      });
      Meteor.flush();
    }catch(error){
      console.log(error);
    }
  }
});