//-------------------------------------------------------------
// 0. Sessions Variables

Session.set('editing_first_name', false);
Session.set('editing_last_name', false);
Session.set('editing_company', false);
Session.set('editing_address', false);
Session.set('editing_city', false);
Session.set('editing_county', false);
Session.set('editing_state', false);
Session.set('editing_zip', false);
Session.set('editing_phone', false);
Session.set('editing_email', false);
Session.set('editing_web', false);
Session.set('editing_birth_or_ss', false);
Session.set('editing_drivers_license', false);
Session.set('editing_insurance', false);
Session.set('editing_education', false);
Session.set('editing_first_aid', false);
Session.set('editing_cpr', false);
Session.set('editing_medical_class', false);
Session.set('editing_mandt', false);
Session.set('editing_mo_out', false);
Session.set('editing_pbs', false);
Session.set('editing_tb', false);
Session.set('editing_tb_date', false);
Session.set('editing_abuse_neglect', false);
Session.set('editing_confidentiality', false);
Session.set('editing_doc_training', false);
Session.set('editing_background_check', false);
Session.set('editing_date', false);
Session.set('editing_birthday', false);
Session.set('is_deleting_task', false);

//-------------------------------------------------------------
// A.  Index Functions


Template.employeesListItemTemplate.events({
  'click .list-group-item': function(event, template) {
    Session.set('selected_user', this._id);
    Session.set('current_task', 'view');
    Session.set('global_edit', false);
  }});

Template.employeesListTemplate.events({
  'keyup #employeeSearchInput': function(evt, tmpl) {
    try {
      //Session.set('user_search_term', $('#employeeSearchInput').val());
      Session.set('account_search_term', $('#employeeSearchInput').val());
      console.log($('#employeeSearchInput').val());
      Meteor.flush();
    } catch (err) {
      console.log(err);
    }
  }});


//-------------------------------------------------------------
// B.  Helpers

Template.employeeFormTemplate.helpers({
  user: function() {
    try {
      if (Session.get('current_task') == 'new') {
        return {
          "first_name": "",
          "last_name": "",
          "address": "",
          "city": "",
          "state": "",
          "zip": "",
          "phone": "",
          "email": ""
        };
      } else {
        var worker = EmployeeAccounts.findOne(Session.get('selected_user'));
        return EmployeeAccounts.findOne(Session.get('selected_user'));
      }
    } catch (error) {
      console.log(error);
    }
  }});

//-------------------------------------------------------------
// C. Event Map
Template.employeeFormTemplate.events({

  //-------------------------------------------------------------
  // 1. Desktop Clicks - Editing

  'click #firstNameInput':        function() { Session.set('editing_first_name',true);Meteor.flush();},
  'click #lastNameInput':         function() { Session.set('editing_last_name', true); Meteor.flush();},
  'click #addressInput':          function() { Session.set('editing_address', true); Meteor.flush();},
  'click #cityInput':             function() { Session.set('editing_city', true); Meteor.flush();},
  'click #stateInput':            function() { Session.set('editing_state', true); Meteor.flush();},
  'click #zipInput':              function() { Session.set('editing_zip', true); Meteor.flush();},
  'click #phoneInput':            function() { Session.set('editing_phone', true); Meteor.flush();},
  'click #emailInput':            function() { Session.set('editing_email', true); Meteor.flush();},
  'click #birthdayInput':         function() { Session.set('editing_birthday', true); Meteor.flush();},
  'click #birthOrSSInput':        function() { Session.set('editing_birth_or_ss', true); Meteor.flush();},
  'click #driversLicenseInput':   function() { Session.set('editing_drivers_license', true); Meteor.flush();},
  'click #insuranceInput':        function() { Session.set('editing_insurance', true); Meteor.flush();},
  'click #educationInput':        function() { Session.set('editing_education', true); Meteor.flush();},
  'click #firstAidInput':         function() { Session.set('editing_first_aid', true); Meteor.flush();},
  'click #cprInput':              function() { Session.set('editing_cpr', true); Meteor.flush();},
  'click #medicalClassInput':     function() { Session.set('editing_medical_class', true); Meteor.flush();},
  'click #mandtInput':            function() { Session.set('editing_mandt', true); Meteor.flush();},
  'click #moOutInput':            function() { Session.set('editing_mo_out', true); Meteor.flush();},
  'click #pbsInput':              function() { Session.set('editing_pbs', true); Meteor.flush();},
  'click #tbInput':               function() { Session.set('editing_tb', true); Meteor.flush();},
  'click #tbDateInput':           function() { Session.set('editing_tb_date', true); Meteor.flush();},
  'click #abuseNeglectInput':     function() { Session.set('editing_abuse_neglect', true); Meteor.flush();},
  'click #confidentialityInput':  function() { Session.set('editing_confidentiality', true); Meteor.flush();},
  'click #docTrainingInput':      function() { Session.set('editing_doc_training', true); Meteor.flush();},
  'click #backgroundCheckInput':  function() { Session.set('editing_background_check', true); Meteor.flush();},



  //-------------------------------------------------------------
  // 2. Mobile Tabs - Editing

  'mouseout #firstNameInput':function(){ Session.set('editing_first_name',false);Meteor.flush();},
  'mouseout #lastNameInput': function() { Session.set('editing_last_name', false); Meteor.flush();},
  'mouseout #addressInput': function() { Session.set('editing_address', false); Meteor.flush();},
  'mouseout #cityInput': function() { Session.set('editing_city', false); Meteor.flush();},
  'mouseout #countyInput': function() { Session.set('editing_county', false); Meteor.flush();},
  'mouseout #stateInput': function() { Session.set('editing_state', false); Meteor.flush();},
  'mouseout #zipInput': function() { Session.set('editing_zip', false); Meteor.flush();},
  'mouseout #phoneInput': function() { Session.set('editing_phone', false); Meteor.flush();},
  'mouseout #emailInput': function() { Session.set('editing_email', false); Meteor.flush();},
  'mouseout #birthdayInput':function(){ Session.set('editing_birthday', false); Meteor.flush();},
  'mouseout #birthOrSSInput': function() { Session.set('editing_birth_or_ss', false); Meteor.flush();},
    'mouseout #driversLicenseInput': function() { Session.set('editing_drivers_license', false); Meteor.flush();},
    'mouseout #insuranceInput': function() { Session.set('editing_insurance', false); Meteor.flush();},
    'mouseout #educationInput': function() { Session.set('editing_education', false); Meteor.flush();},
    'mouseout #firstAidInput': function() { Session.set('editing_first_aid', false); Meteor.flush();},
    'mouseout #cprInput': function() { Session.set('editing_cpr', false); Meteor.flush();},
    'mouseout #moOutInput': function() { Session.set('editing_mo_out', false); Meteor.flush();},
    'mouseout #pbsInput': function() { Session.set('editing_pbs', false); Meteor.flush();},
    'mouseout #tbInput': function() { Session.set('editing_tb', false); Meteor.flush();},
    'mouseout #tbDateInput': function() { Session.set('editing_tb_date', false); Meteor.flush();},
    'mouseout #abuseNeglectInput': function() { Session.set('editing_abuse_neglect', false); Meteor.flush();},
    'mouseout #confidentialityInput': function() { Session.set('editing_confidentiality', false); Meteor.flush();},
    'mouseout #docTrainingInput': function() { Session.set('editing_doc_training', false); Meteor.flush();},
    'mouseout #backgroundCheckInput': function() { Session.set('editing_background_check', false); Meteor.flush();}});

//-------------------------------------------------------------
// 3. Submit
// 4. Stop Editing
Template.employeeFormTemplate.events(
  okCancelEvents('#firstNameInput', {
    ok: function(value) {
      EmployeeAccounts.update(Session.get('selected_user'), {
        $set: {
          'first_name': value
        }
      });
      Session.set('editing_first_name', false);
      Meteor.flush();
    },
    cancel: function() {
      Session.set('editing_first_name', false);
    }
  })
);
Template.employeeFormTemplate.events(
  okCancelEvents('#lastNameInput', {
    ok: function(value) {
      try {
        EmployeeAccounts.update(Session.get('selected_user'), {
          $set: {
            'last_name': value
          }
        });
        Session.set('editing_last_name', false);
        Meteor.flush();
      } catch (error) {
        console.log(error);
      }
    },
    cancel: function() {
      Session.set('editing_last_name', false);
    }
  })
);
Template.employeeFormTemplate.events(
  okCancelEvents('#addressInput', {
    ok: function(value) {
      EmployeeAccounts.update(Session.get('selected_user'), {
        $set: {
          'address': value
        }
      });
      Session.set('editing_address', false);
      Meteor.flush();
    },
    cancel: function() {
      Session.set('editing_address', false);
    }
  })
);
Template.employeeFormTemplate.events(
  okCancelEvents('#cityInput', {
    ok: function(value) {
      EmployeeAccounts.update(Session.get('selected_user'), {
        $set: {
          'city': value
        }
      });
      Session.set('editing_city', false);
      Meteor.flush();
    },
    cancel: function() {
      Session.set('editing_city', false);
    }
  }));
Template.employeeFormTemplate.events(
  okCancelEvents('#stateInput', {
    ok: function(value) {
      EmployeeAccounts.update(Session.get('selected_user'), {
        $set: {
          'state': value
        }
      });
      Session.set('editing_state', false);
      Meteor.flush();
    },
    cancel: function() {
      Session.set('editing_state', false);
    }
  }));
Template.employeeFormTemplate.events(
  okCancelEvents('#zipInput', {
    ok: function(value) {
      EmployeeAccounts.update(Session.get('selected_user'), {
        $set: {
          'zip': value
        }
      });
      Session.set('editing_zip', false);
      Meteor.flush();
    },
    cancel: function() {
      Session.set('editing_zip', false);
    }
  }));
Template.employeeFormTemplate.events(
  okCancelEvents('#phoneInput', {
    ok: function(value) {
      EmployeeAccounts.update(Session.get('selected_user'), {
        $set: {
          'phone': value
        }
      });
      Session.set('editing_phone', false);
      Meteor.flush();
    },
    cancel: function() {
      Session.set('editing_phone', false);
    }
  }));
Template.employeeFormTemplate.events(
  okCancelEvents('#emailInput', {
    ok: function(value) {
      EmployeeAccounts.update(Session.get('selected_user'), {
        $set: {
          'email': value
        }
      });
      Session.set('editing_email', false);
      Meteor.flush();
    },
    cancel: function() {
      Session.set('editing_email', false);
    }
  }));
Template.employeeFormTemplate.events(
  okCancelEvents('#dateInput', {
    ok: function(value) {
      EmployeeAccounts.update(Session.get('selected_user'), {
        $set: {
          'date': value
        }
      });
      Session.set('editing_date', false);
      Meteor.flush();
    },
    cancel: function() {
      Session.set('editing_date', false);
    }
  }));
Template.employeeFormTemplate.events(
  okCancelEvents('#birthdayInput', {
    ok: function(value) {
      EmployeeAccounts.update(Session.get('selected_user'), {
        $set: {
          'birthday': value
        }
      });
      Session.set('editing_birthday', false);
      Meteor.flush();
    },
    cancel: function() {
      Session.set('editing_birthday', false);
    }
  }));
Template.employeeFormTemplate.events(
    okCancelEvents('#birthOrSSInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'birth_or_ss': value
                }
            });
            Session.set('editing_birth_or_ss', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_birth_or_ss', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#driversLicenseInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'drivers_license': value
                }
            });
            Session.set('editing_drivers_license', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_drivers_license', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#insuranceInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'insurance': value
                }
            });
            Session.set('editing_insurance', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_insurance', false);
        }}));
Template.employeeFormTemplate.events(
    okCancelEvents('#educationInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'education': value
                }
            });
            Session.set('editing_education', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_education', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#firstAidInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'first_aid': value
                }
            });
            Session.set('editing_first_aid', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_first_aid', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#cprInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'cpr': value
                }
            });
            Session.set('editing_cpr', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_cpr', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#medicalClassInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'med_class': value
                }
            });
            Session.set('editing_medical_class', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_medical_class', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#mandtInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'mandt': value
                }
            });
            Session.set('editing_mandt', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_mandt', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#moOutInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'mo_out': value
                }
            });
            Session.set('editing_mo_out', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_mo_out', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#pbsInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'pbs': value
                }
            });
            Session.set('editing_pbs', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_pbs', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#tbInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'tb_test': value
                }
            });
            Session.set('editing_tb', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_tb', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#tbDateInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'tb_question': value
                }
            });
            Session.set('editing_tb_date', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_tb_date', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#abuseNeglectInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'abuse_neglect': value
                }
            });
            Session.set('editing_abuse_neglect', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_abuse_neglect', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#confidentialityInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'confidentiality': value
                }
            });
            Session.set('editing_confidentiality', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_confidentiality', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#docTrainingInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'documentation_training': value
                }
            });
            Session.set('editing_doc_training', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_doc_training', false);
        }
    }));
Template.employeeFormTemplate.events(
    okCancelEvents('#backgroundCheckInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {
                $set: {
                    'background_check': value
                }
            });
            Session.set('editing_background_check', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_background_check', false);
        }
    }));

//-------------------------------------------------------------
// D. Display Readonly Value
Template.employeeFormTemplate.helpers({
  birthday_label:function(){return Session.get('editing_birthday')?'none':'block';},
  drivers_license_label:function(){
    if (Session.get('editing_drivers_license')){
      return 'none';
    }else{return 'block';}},
   first_name_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_first_name')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    //-------------------------------------------------------------
    // D. Display Readonly Value


    last_name_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_last_name')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
  
    address_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_address')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    city_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_city')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    county_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_county')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    state_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_state')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    zip_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_zip')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    phone_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_phone')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },

    birth_or_ss_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_birth_or_ss')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    drivers_license_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_drivers_license')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    insurance_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_insurance')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    education_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_education')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    first_aid_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_first_aid')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    cpr_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_cpr')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    medical_class_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_medical_class')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    mandt_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_mandt')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    mo_out_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_mo_out')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    pbs_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_pbs')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    tb_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_tb')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    tb_date_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_tb_date')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    abuse_neglect_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_abuse_neglect')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    confidentiality_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_confidentiality')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    doc_training_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_doc_training')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    background_check_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_background_check')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    email_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_email')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    date_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_date')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    generic_enabled:function(){
      if (Session.get('global_edit')){
        return 'enabled';
      }else{
        return 'readonly';
      }
    },
  isDeletingTask:function(){return (Session.get('current_task')==='delete');},
  isNewTask:function(){return (Session.get('current_task')==='new');},
  isDeletingTask:function(){return (Session.get('current_task')==='delete');}
});

Template.employeeFormTemplate.events({
  'click #newUserButton': function() {
    console.log('creating new user...');

    try {

      // TODO:  add validation functions
      if ($('#firstNameInput').val().length) {

        Meteor.call('createNewEmployee', {
          first_name: $('#firstNameInput').val(),
          last_name: $('#lastNameInput').val(),
          address: $('#addressInput').val(),
          city: $('#cityInput').val(),
          state: $('#stateInput').val(),
          zip: $('#zipInput').val(),
          phone: $('#phoneInput').val(),
          email: $('#emailInput').val(),
          birthday: $('#birthdayInput').val()
        }, function(error, employee) {
          console.log('error: ' + error);
          console.log('employee: ' + employee);
        });
      } else {
        Session.set("createError",
          "Employee needs a name, or why bother?");
      }
      evt.target.value = '';
    } catch (err) {
      console.log(err);
    }

    Session.set('current_task', 'view');},
  'click #deleteUserButton': function() { EmployeeAccounts.remove(Session.get('selected_user')); Session.set('current_task', 'view');},
  'click #cancelDeleteButton': function() {
    Session.set('current_task', 'view');
  }
});