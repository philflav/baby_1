Profiles = new Mongo.Collection("profiles");

//Routes

Router.route('/');
Router.route('/search');
Router.route('/results' ,{
  template: 'profiles'
});
Router.route('/profile/:_id', {
    template: 'ProfilePage',
    data: function(){
        var currentProfile = this.params._id;
        console.log("This is a profile page for ", currentProfile);
        return Profiles.findOne({ _id: currentProfile});
    }

});


//Helpers
 
if (Meteor.isClient) {
  // This code only runs on the client
  Template.profiles.helpers({
    profiles: function () {
      console.log("This is a the profiles function.");
      return Profiles.find({});
    }
  });

//Events

  Template.body.events({
    "submit .new-profile": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var name = event.target.name.value;
 
      // Insert a task into the collection
      Profiles.insert({
        ProfileTitle: name,
        rating: "***",
        Location: "Singapore",
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.name.value = "";
    }
  });
}