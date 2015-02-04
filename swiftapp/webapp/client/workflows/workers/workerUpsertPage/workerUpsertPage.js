
Router.map(function(){
  this.route('newworkerRoute', {
    path: '/newworker',
    template: 'workerUpsertPage'
  });
  this.route('editworkerRoute', {
    path: '/editworker/:id',
    template: 'workerUpsertPage',
    data: function(){
      return workerAccounts.findOne(this.params.id);
    }
  });
});

//-------------------------------------------------------------


Template.workerUpsertPage.events({
  'keyup #firstNameInput':function(){
    workerAccounts.update({_id: this._id}, {
      $set: {
        'FirstName': $('#firstNameInput').val()
      }
    });
  },
  'keyup #lastNameInput':function(){
    workerAccounts.update({_id: this._id}, {
      $set: {
        'LastName': $('#lastNameInput').val()
      }
    });
  },
  'keyup #companyInput':function(){
    workerAccounts.update({_id: this._id}, {
      $set: {
        'Company': $('#companyInput').val()
      }
    });
  },
  'keyup #addressInput':function(){
    workerAccounts.update({_id: this._id}, {
      $set: {
        'Address': $('#addressInput').val()
      }
    });
  },
  'keyup #cityInput':function(){
    workerAccounts.update({_id: this._id}, {
      $set: {
        'City': $('#cityInput').val()
      }
    });
  },
  'keyup #stateInput':function(){
    workerAccounts.update({_id: this._id}, {
      $set: {
        'State': $('#stateInput').val()
      }
    });
  },
  'keyup #zipInput':function(){
    workerAccounts.update({_id: this._id}, {
      $set: {
        'Zip': $('#zipInput').val()
      }
    });
  },
  'keyup #phoneInput':function(){
    workerAccounts.update({_id: this._id}, {
      $set: {
        'Phone': $('#phoneInput').val()
      }
    });
  },
  'keyup #faxInput':function(){
    workerAccounts.update({_id: this._id}, {
      $set: {
        'Fax': $('#faxInput').val()
      }
    });
  },
  'keyup #emailInput':function(){
    workerAccounts.update({_id: this._id}, {
      $set: {
        'Email': $('#emailInput').val()
      }
    });
  },
  'keyup #webInput':function(){
    workerAccounts.update({_id: this._id}, {
      $set: {
        'Web': $('#webInput').val()
      }
    });
  },
  'click #previewworkerButton':function(){
    Router.go('/worker/' + this._id);
  }
});



//-------------------------------------------------------------

Template.workerUpsertPage.helpers({
  getRecordId: function() {
    if(this._id) {
      return this._id;
    }else{
      return "---";
    }
  }
});

Template.workerUpsertPage.events({
  'click #upsertworkerButton': function() {
    console.log('creating new user...');

      // TODO:  add validation functions

      var workerObject = {
        FirstName: $('#firstNameInput').val(),
        LastName: $('#lastNameInput').val(),
        FullName: $('#firstNameInput').val() + " " + $('#lastNameInput').val(),
        Company: $('#companyInput').val(),
        Address: $('#addressInput').val(),
        City: $('#cityInput').val(),
        State: $('#stateInput').val(),
        Zip: $('#zipInput').val(),
        Phone: $('#phoneInput').val(),
        Fax: $('#faxInput').val(),
        Email: $('#emailInput').val(),
        Web: $('#webInput').val(),
        Notes: $('#notesInput').val()
      };

      if(this._id){
        console.log('upserting ' + this._id);
        var self = this;
        workerObject._id = this._id;
        Meteor.call('updateworker', workerObject, function(error, worker){
          console.log('error: ' + error);
          if(worker){
            console.log('worker: ' + worker);
            Router.go('/worker/' + self._id);
          }
        });
      }else{
        Meteor.call('createNewworker', workerObject, function(error, worker) {
          console.log('error: ' + error);
          console.log('worker: ' + worker);
          Router.go('/worker/' + worker);
        });
      }

  },
  'click #deleteUserButton': function() {
    workerAccounts.remove(Session.get('selected_user'));
  },
  'click #cancelDeleteButton': function() {
    Router.go('/workers');
  }
});
