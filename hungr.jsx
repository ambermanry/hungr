// Define a collection to hold our suggestions
Suggestions = new Mongo.Collection("suggestions");

if (Meteor.isClient) {
    // This code is executed on the client only
    Meteor.startup(()=>{
        React.render(<App />, document.getElementById("render-target"))
    });
    //Meteor.startup(function () {
        // Use Meteor.startup to render the component after the page is ready
    //    React.render(<App />, document.getElementById("render-target"));
    //});
}
