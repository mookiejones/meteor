
Router.map(function(){
  this.route('workerPreviewPage', {
    path: '/worker/:id',
    template: 'workerPreviewPage',
    data: function () {
      return workerAccounts.findOne({_id: this.params.id});
    }
  });
});


Template.workerPreviewPage.events({
  'click #workerEditButton':function(){
    Router.go('/editworker/' + this._id);
  },
  'click #workerDeleteButton':function(){
    if(confirm('Are you sure you want to delete ' + this.first + " " + this.last + "?")){
      WorkerAccounts.remove({_id: this._id});
      Router.go('/');
    }
  }
});
