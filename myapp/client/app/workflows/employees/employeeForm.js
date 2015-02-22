
//-------------------------------------------------------------
// 0. Sessions Variables
// First Name
Session.set('editing_first_name', false);
Session.set('drivers_label', 'block');

// Last Name
Session.set('editing_last_name', false);
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

/** 
/ Is this information Necessary?
*/
Session.set('editing_address', false);
Session.set('editing_city', false);
Session.set('editing_county', false);
Session.set('editing_state', false);
Session.set('editing_zip', false);
Session.set('editing_phone', false);
Session.set('editing_email', false);
Session.set('editing_web', false);
Session.set('editing_password', false);
Session.set('editing_date', false);
Session.set('editing_birthday', false);
Session.set('is_deleting_task', false);

//-------------------------------------------------------------
// A.  Index Functions
Template.employeeFormTemplate.rendered = function(){

    /*******************************************************
    Setup Date Picker
    *******************************************************/
    var dateOpt = { todayBtn:'linked',clearBtn:true,autoclose:true,todayHighlight:true};

    $('#driversLicenseInput').datepicker(dateOpt);
    $('#birthOrSSInput').datepicker(dateOpt);
    $('#birthdayInput').datepicker(dateOpt);
    $('#insuranceInput').datepicker(dateOpt);
    $('#firstAidInput').datepicker(dateOpt);
    $('#cprInput').datepicker(dateOpt);
    $('#medicalClassInput').datepicker(dateOpt);
    $('#mandtInput').datepicker(dateOpt);
    $('#moOutInput').datepicker(dateOpt);
    $('#pbsInput').datepicker(dateOpt);
    $('#tbDateInput').datepicker(dateOpt);
    $('#abuseNeglectInput').datepicker(dateOpt);
    $('#confidentialityInput').datepicker(dateOpt);
    $('#docTrainingInput').datepicker(dateOpt);
    $('#backgroundCheckInput').datepicker(dateOpt);

}

function getClass(value,years){
    var day_to_milli=86400000;
        
//Convert years to days.this will allow me to determine when to show warning
    var days = parseInt(years * 365);
// Convert date to millseconds then subtract from now
    var now = Date.parse(new Date())/day_to_milli;
        
    var date = new Date(value)/day_to_milli;
    
    var result =  parseInt(now-date);
    
    if (result>days)
        return 'notify expired';
    
    if (result>30)
        return 'notify warning';
//    return Date.parse(result);  
    return '';
}

Template.employeeFormTemplate.helpers({
    cpr_class:function(){ return getClass(this.cpr,1);},
    first_aid_class:function(){ return getClass(this.first_aid,1);},
    medical_class_class:function(){ return getClass(this.medical_class,1);},
    mandt_class:function(){ return getClass(this.mandt,1);},
    mo_out_class:function(){ return getClass(this.mo_out,1);},
    pbs_class:function(){ return getClass(this.pbs,1);}
})

Template.employeeFormTemplate.events({
    'focus #driversLicenseInput': function ()   {   $('#driversLicenseInput').datepicker('show');},  
    'focus #birthOrSSInput':function()          {   $('#birthOrSSInput').datepicker('show');},
    'focus #birthdayInput': function ()         {   $('#birthdayInput').datepicker('show');},
    'focus #insuranceInput': function ()         {   $('#insuranceInput').datepicker('show');},
    'focus #firstAidInput': function ()         {   $('#firstAidInput').datepicker('show');},
    'focus #cprInput': function ()         {   $('#cprInput').datepicker('show');},
    'focus #medicalClassInput': function ()         {   $('#medicalClassInput').datepicker('show');},
    'focus #mandtInput': function ()         {   $('#mandtInput').datepicker('show');},
    'focus #moOutInput': function ()         {   $('#moOutInput').datepicker('show');},
    'focus #pbsInput': function ()         {   $('#pbsInput').datepicker('show');},
    'focus #tbDateInput': function ()         {   $('#tbDateInput').datepicker('show');},
    'focus #abuseNeglectInput': function ()         {   $('#abuseNeglectInput').datepicker('show');},
    'focus #confidentialityInput': function ()         {   $('#confidentialityInput').datepicker('show');},
    'focus #docTrainingInput': function ()         {   $('#docTrainingInput').datepicker('show');},
    'focus #backgroundCheckInput': function ()         {   $('#backgroundCheckInput').datepicker('show');}
});
// Fix the depreciation
Template.employeesListTemplate.helpers({
    employeesList: function() {
        try {
            return EmployeeAccounts.find({
                $or: [{
                    'first_name': {
                        $regex: Session.get('account_search_term'),
                        $options: 'i'
                    }
                }, {
                    'last_name': {
                        $regex: Session.get('account_search_term'),
                        $options: 'i'
                    }
                }]
            }, {
                limit: 20
            });
        } catch (error) {
            console.log(error);
        }
    }
});


Template.employeesListItemTemplate.events({
    'click .list-group-item': function(event, template) {
        Session.set('selected_user', this._id);
        Session.set('current_task', 'view');
        Session.set('global_edit', false);
    }
});

Template.employeesListItemTemplate.events({
    'keyup #employeeSearchInput': function(evt, tmpl) {
        try {
            Session.set('account_search_term', $('#employeeSearchInput').val());
            console.log($('#employeeSearchInput').val());
            Meteor.flush();
        } catch (err) {
            console.log(err);
        }
    }
});


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
                return EmployeeAccounts.findOne(Session.get('selected_user'));
            }
        } catch (error) {
            console.log(error);
        }
    }
});


//-------------------------------------------------------------
// C. Event Map

Template.employeeFormTemplate.events({
    //-------------------------------------------------------------
    // 1. Desktop Clicks - Editing

    'click #firstNameInput': function() {
        Session.set('editing_first_name', true);
        Meteor.flush();
    },
    'click #lastNameInput': function() {
        Session.set('editing_last_name', true);
        Meteor.flush();
    },
    'click #birthOrSSInput': function() {
        Session.set('editing_birth_or_ss', true);
        Meteor.flush();
    },
    'click #driversLicenseInput': function() {
        Session.set('editing_drivers_license', true);
        Meteor.flush();
    },
    'click #insuranceInput': function() {
        Session.set('editing_insurance', true);
        Meteor.flush();
    },
    'change #educationInput':function(evt){
        console.log('change occurred to education');
        console.log(evt);
    },
    'click #educationInput': function() {
        Session.set('editing_education', true);
        Meteor.flush();
    },
    'click #firstAidInput': function() {
        Session.set('editing_first_aid', true);
        Meteor.flush();
    },
    'click #cprInput': function() {
        Session.set('editing_cpr', true);
        Meteor.flush();
    },
    'click #medicalClassInput': function() {
        Session.set('editing_medical_class', true);
        Meteor.flush();
    },
    'click #mandtInput': function() {
        Session.set('editing_mandt', true);
        Meteor.flush();
    },
    'click #moOutInput': function() {
        Session.set('editing_mo_out', true);
        Meteor.flush();
    },
    'click #pbsInput': function() {
        Session.set('editing_pbs', true);
        Meteor.flush();
    },
    'click #tbInput': function() {
        Session.set('editing_tb', true);
        Meteor.flush();
    },
    'click #tbDateInput': function() {
        Session.set('editing_tb_date', true);
        Meteor.flush();
    },
    'click #abuseNeglectInput': function() {
        Session.set('editing_abuse_neglect', true);
        Meteor.flush();
    },
    'click #confidentialityInput': function() {
        Session.set('editing_confidentiality', true);
        Meteor.flush();
    },
    'click #docTrainingInput': function() {
        Session.set('editing_doc_training', true);
        Meteor.flush();
    },
    'click #backgroundCheckInput': function() {
        Session.set('editing_background_check', true);
        Meteor.flush();
    },
    'click #addressInput': function() {
        Session.set('editing_address', true);
        Meteor.flush();
    },
    'click #cityInput': function() {
        Session.set('editing_city', true);
        Meteor.flush();
    },
    'click #countyInput': function() {
        Session.set('editing_county', true);
        Meteor.flush();
    },
    'click #stateInput': function() {
        Session.set('editing_state', true);
        Meteor.flush();
    },
    'click #zipInput': function() {
        Session.set('editing_zip', true);
        Meteor.flush();
    },
    'click #phoneInput': function() {
        Session.set('editing_phone', true);
        Meteor.flush();
    },
    'click #emailInput': function() {
        Session.set('editing_email', true);
        Meteor.flush();
    },
    'click #birthdayInput': function() {
        Session.set('editing_birthday', true);
        Meteor.flush();
    },

    //-------------------------------------------------------------
    // 2. Mobile Tabs - Editing

    'mouseout #birthOrSSInput': function() {
        Session.set('editing_birth_or_ss', false);
        Meteor.flush();
    },
    'mouseout #driversLicenseInput': function() {
        Session.set('editing_drivers_license', false);
        Meteor.flush();
    },
    'mouseout #insuranceInput': function() {
        Session.set('editing_insurance', false);
        Meteor.flush();
    },
    'mouseout #educationInput': function() {
        Session.set('editing_education', false);
        Meteor.flush();
    },
    'mouseout #firstAidInput': function() {
        Session.set('editing_first_aid', false);
        Meteor.flush();
    },
    'mouseout #cprInput': function() {
        Session.set('editing_cpr', false);
        Meteor.flush();
    },
    'mouseout #moOutInput': function() {
        Session.set('editing_mo_out', false);
        Meteor.flush();
    },
    'mouseout #pbsInput': function() {
        Session.set('editing_pbs', false);
        Meteor.flush();
    },
    'mouseout #tbInput': function() {
        Session.set('editing_tb', false);
        Meteor.flush();
    },
    'mouseout #tbDateInput': function() {
        Session.set('editing_tb_date', false);
        Meteor.flush();
    },
    'mouseout #abuseNeglectInput': function() {
        Session.set('editing_abuse_neglect', false);
        Meteor.flush();
    },
    'mouseout #confidentialityInput': function() {
        Session.set('editing_confidentiality', false);
        Meteor.flush();
    },
    'mouseout #docTrainingInput': function() {
        Session.set('editing_doc_training', false);
        Meteor.flush();
    },
    'mouseout #backgroundCheckInput': function() {
        Session.set('editing_background_check', false);
        Meteor.flush();
    },
    'mouseout #firstNameInput': function() {
        Session.set('editing_first_name', false);
        Meteor.flush();
    },
    'mouseout #lastNameInput': function() {
        Session.set('editing_last_name', false);
        Meteor.flush();
    },
    'mouseout #companyInput': function() {
        Session.set('editing_company', false);
        Meteor.flush();
    },
    'mouseout #addressInput': function() {
        Session.set('editing_address', false);
        Meteor.flush();
    },
    'mouseout #cityInput': function() {
        Session.set('editing_city', false);
        Meteor.flush();
    },
    'mouseout #countyInput': function() {
        Session.set('editing_county', false);
        Meteor.flush();
    },
    'mouseout #stateInput': function() {
        Session.set('editing_state', false);
        Meteor.flush();
    },
    'mouseout #zipInput': function() {
        Session.set('editing_zip', false);
        Meteor.flush();
    },
    'mouseout #phoneInput': function() {
        Session.set('editing_phone', false);
        Meteor.flush();
    },
    'mouseout #emailInput': function() {
        Session.set('editing_email', false);
        Meteor.flush();
    },
    'mouseout #birthdayInput': function() {
        Session.set('editing_birthday', true);
        Meteor.flush();
    }
})

//-------------------------------------------------------------
// 3. Submit
// 4. Stop Editing

Template.employeeFormTemplate.events(
    okCancelEvents('#firstNameInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'first_name': value}});
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
                EmployeeAccounts.update(Session.get('selected_user'), {$set:{'last_name': value}});
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
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'address': value}});
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
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'city': value}});
            Session.set('editing_city', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_city', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#stateInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'state': value}});
            Session.set('editing_state', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_state', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#zipInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'zip': value}});
            Session.set('editing_zip', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_zip', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#phoneInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'phone': value}});
            Session.set('editing_phone', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_phone', false);
        }
    })
);

Template.employeeFormTemplate.events(
    okCancelEvents('#emailInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'email': value}});
            Session.set('editing_email', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_email', false);
        }
    })
);



Template.employeeFormTemplate.events(
    okCancelEvents('#birthOrSSInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'birth_ss': value}});
            Session.set('editing_birth_or_ss', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_birth_or_ss', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#driversLicenseInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'drivers_license': value}});
            Session.set('editing_drivers_license', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_drivers_license', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#insuranceInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'insurance': value}});
            Session.set('editing_insurance', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_insurance', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#educationInput', {
        ok: function(value) { 
            console.log('education ' + value);
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'education': value}});
            Session.set('editing_education', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_education', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#firstAidInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'first_aid': value}});
            Session.set('editing_first_aid', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_first_aid', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#cprInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'cpr': value}});
            Session.set('editing_cpr', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_cpr', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#medicalClassInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'med_class': value}});
            Session.set('editing_medical_class', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_medical_class', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#mandtInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'mandt': value}});
            Session.set('editing_mandt', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_mandt', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#moOutInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'mo_out': value}});
            Session.set('editing_mo_out', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_mo_out', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#pbsInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'pbs': value}});
            Session.set('editing_pbs', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_pbs', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#tbInput', {
        ok: function(value) {
            console.log('tb value = ' + value);
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'tb_test': (value==='on')}});
            Session.set('editing_tb', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_tb', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#tbDateInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'tb_question': value}});
            Session.set('editing_tb_date', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_tb_date', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#abuseNeglectInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'abuse_neglect': value}});
            Session.set('editing_abuse_neglect', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_abuse_neglect', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#confidentialityInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'confidentiality': value}});
            Session.set('editing_confidentiality', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_confidentiality', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#docTrainingInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'documentation_training': value}});
            Session.set('editing_doc_training', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_doc_training', false);
        }
    })
);
Template.employeeFormTemplate.events(
    okCancelEvents('#backgroundCheckInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'background_check': value}});
            Session.set('editing_background_check', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_background_check', false);
        }
    })
);

Template.employeeFormTemplate.events(
    okCancelEvents('#birthdayInput', {
        ok: function(value) {
            EmployeeAccounts.update(Session.get('selected_user'), {$set:{'birthday': value}});
            Session.set('editing_birthday', false);
            Meteor.flush();
        },
        cancel: function() {
            Session.set('editing_birthday', false);
        }
    })
);

Template.employeeFormTemplate.helpers({
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
    company_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_company')) {
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
    birthday_enabled:function(){
         if (Session.get('global_edit')) {
            return "enabled";
        } else if (Session.get('editing_birthday')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    generic_enabled: function() {
        if (Session.get('global_edit')) {
            return "enabled";
        } else {
            return "readonly";
        }
    },
    isNewTask: function() {
        if (Session.get('current_task') === 'new') {
            return true;
        } else {
            return false;
        }
    },
    isDeletingTask: function() {
        if (Session.get('current_task') === 'delete') {
            return true;
        } else {
            return false;
        }
    }
});


Template.employeeFormTemplate.events({
    'click #newUserButton': function() {
        try {

            // TODO:  add validation functions
            if ($('#firstNameInput').val().length) {

                Meteor.call('createNewEmployee', {
                    first_name: $('#firstNameInput').val(),
                    last_name: $('#lastNameInput').val(),
                    address: $('#addressInput').val(),
                    city: $('#cityInput').val(),
                    birth_ss: $('#birthOrSSInput').val(),
                    drivers_license: $('#driversLicenseInput').val(),
                    insurance: $('#insuranceInput').val(),
                    education: $('#educationInput').val(),
                    first_aid: $('#firstAidInput').val(),
                    cpr: $('#cprInput').val(),
                    mo_out: $('#moOutInput').val(),
                    pbs: $('#pbsInput').val(),
                    tb_test: $('#tbInput').val(),
                    tb_question: $('#tbDateInput').val(),
                    abuse_neglect: $('#abuseNeglectInput').val(),
                    confidentiality: $('#confidentialityInput').val(),
                    documentation_training: $('#docTrainingInput').val(),
                    background_check: $('#backgroundCheckInput').val(),
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

        Session.set('current_task', 'view');
    },
    'click #deleteUserButton': function() {
        EmployeeAccounts.remove(Session.get('selected_user'));
        Session.set('current_task', 'view');
    },
    'click #cancelDeleteButton': function() {
        Session.set('current_task', 'view');
    }
});