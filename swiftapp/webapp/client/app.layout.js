Session.setDefault('receivedData', false);
Session.set("resize", null);
Meteor.startup(function () {
  $(window).resize(function(evt) {
    Session.set("resize", new Date());
  });
});

UI.body.resized = function(){

  $('#westPanel').sidebar();
  $('#eastPanel')
    .sidebar({overlay: false});

  $('#errorPanel').sidebar();
  $('#contextPanel').sidebar();

  return Session.get('resize');
};

Meteor.autorun(function(){
  Meteor.subscribe('customerAccounts');
  Meteor.subscribe('workerAccounts');
});


UI.body.getErrorMessage = function(){
  return "Error Message!";
};


//----------------------------------------------
// helper functions

toggleWestPanel = function(){
  if($('body').hasClass('leftSidebar')){
    $('body').removeClass('leftSidebar');
    $('#westPanel').removeClass('active');
  }else{
    $('body').addClass('leftSidebar');
    $('#westPanel').addClass('active');
  }
}
toggleEastPanel = function(){
  if($('body').hasClass('rightSidebar')){
    $('body').removeClass('rightSidebar');
    $('#eastPanel').removeClass('active');
  }else{
    $('body').addClass('rightSidebar');
    $('#eastPanel').addClass('active');
  }
}
