/****************************************************
	Handle Routing Actions
***************************************************/

dataReadyHold = null;

if (Meteor.isClient){
  Meteor.subscribe('employees');
}

Router.configure({
   layoutTemplate: 'appBody',  //can be any template name
   notFoundTemplate:'notFound'
 });




Router.map(function () {
  this.route('home', {
    path: '/',
  });

  this.route('employeesPage',{path:'/workers'});

  this.route('about');
  this.route('articles', {
    // articles now under `articleList` instead of `this`
    data: {
      articleList: function () {return Articles.find()},
      selectedArticle: {}
    }
  });
  this.route('article', {
    path: '/article/:_id',
    // provide data for both `articleList` and `selectedArticle`
    data: function () {
      return {
        articleList: Articles.find(),
        selectedArticle: Articles.findOne({_id: this.params._id})
      }
    },
    template: 'articles'  //change template target
  });
});

