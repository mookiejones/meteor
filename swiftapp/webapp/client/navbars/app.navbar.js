Template.navbarHeader.events({
  'click #navbarBrandLink':function(){
    //$('#westPanel').sidebar('toggle');
    toggleWestPanel();
  },
  'click #keybindingsLink':function(){
    $('#keybindingsModal').modal("show");
  },
  'click #promptLink':function(){
    $('#promptModal').modal("show");
  },
  'click #confirmLink':function(){
    $('#confirmModal').modal("show");
  },
  'click #errorToggleLink':function(){
    $('#errorPanel').sidebar('toggle');
  },
  'click #eastPanelToggleLink':function(){
    //$('#eastPanel').sidebar('toggle');
    toggleEastPanel();
  }

});

Template.registerHelper("hasWorkerControls", function(argument) {
  if (Router.current()) {
    console.log("%c need to implement this","color:red;");
    return true;
/*    if (/workers/.test(Router.current().url)) {
      return true;
    } else if (/add/workers/.test(Router.current().url)) {
      return true;
    } else {
      return false;
    }*/
  }
});



Template.navbarFooter.events({
  'click #westPanelToggle':function(){
    toggleWestPanel();
  },
  'click #eastPanelToggle':function(){
    toggleEastPanel();
  }
});
