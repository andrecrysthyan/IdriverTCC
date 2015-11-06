Router.route('/upload',{
  waitOn: function () {
    return Meteor.subscribe('uploads')
  },
  action: function () {
    if (this.ready())
      this.render('upload');
  }
})