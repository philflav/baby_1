Profiles = new Mongo.Collection("profiles");

//Routes

Router.route('/',{
  template: 'login'
});
Router.route('/register');
Router.route('/search');
Router.route('/home');
Router.route('/editProfile');
Router.route('/messages');
Router.route('/subscription');
Router.route('/favourites');
Router.route('/likesMe');
Router.route('/lookedAt');
Router.route('/lookedAtMe');
Router.route('/logout');
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

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        });
        Router.go('home');
    }
});
Template.home.events({
    'click .logout': function(event){
      console.log('Logout clicked');
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
});
Template.login.events({
    'submit form': function(event){
      console.log('Login clicked');
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
          if(error){
            console.log(error.reason);
          } else {
          Router.go("/home");
          }
        }
        );
      }
    });
}