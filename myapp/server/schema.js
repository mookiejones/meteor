EmployeeSchema = new SimpleSchema({
	first_name:{type:String,label:"first_name",max:64},
	last_name:{type:String,label:"last_name",max:64},
	address:{type:String,label:"Address",max:64},
	city:{type:String,label:"City",max:64},
	phone:{type:String,label:"Phone",regEx:/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/},
	education:{type:String,label:"Education",max:64},
	state:{type:String,label:"State",max:64},
	zip:{type:String,label:"Zip Code", regEx: /^[0-9]{5}$/ },
	email:{type:String,label:"Email",max:64},

	birthday:{type:Date,label:"Birthdate",optional:true},
	drivers_license:{type:Date,label:"Drivers License",optional:true},
	insurance:{type:Date,label:"Insurance",optional:true},
	first_aid:{type:Date,label:"First Aid",optional:true},
	cpr:{type:Date,label:"CPR",optional:true},
	medical_class:{type:Date,label:"Medical Class",optional:true},
	mandt:{type:Date,label:"Mandt",optional:true},
	mo_out:{type:Date,label:"MO Out",optional:true},
	tb_test:{type:Boolean,label:"TB Test",optional:true},

	tb_question:{type:Date,label:"TB Questionaire",optional:true},
	abuse_and_neglect:{type:Date,label:"Abuse and Neglect",optional:true},
	confidentiality:{type:Date,label:"Confidentiality",optional:true},
	documentation_training:{type:Date,label:"Documentation Training",optional:true},
	background_check:{type:Date,label:"Background Check",optional:true},

});