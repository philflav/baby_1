if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    sitters: [
      { name: "Jo" , rating:"xxxx"},
      { name: "Sam", rating:"xxxxx" },
      { name: "Katy", rating:"xx" }
    ]
  });
}