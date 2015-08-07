Sitters = new Mongo.Collection("sitters");
 
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    sitters: function () {
      return Sitters.find({});
    }
  });

  Template.body.events({
    "submit .new-sitter": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var name = event.target.name.value;
 
      // Insert a task into the collection
      Sitters.insert({
        name: name,
        rating: "***",
        location: "Singapore",
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.name.value = "";
    }
  });
}