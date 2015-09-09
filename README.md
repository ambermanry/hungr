# hungr
This website/app uses Meteor and React JSX.  It provides a way for co-workers to make lunch plans.  This website can be demo'ed at http://icfi-hungr.meteor.com

As part of a POC, the Hungr app was created using React JSX for the front-end components and Meteor instead of using Flux.  Meteor is an isomorphic javascript framework that comes bundled with Node.js and MongoDB as the data store.  For more info on Meteor, go to http://www.meteor.com.  
Before starting this POC, I viewed this video: http://info.meteor.com/blog/two-weeks-with-react-and-meteor
This POC followed the Meteor/React TODOS tutorial at http://tutorial-viewer.meteor.com/tutorial/0/react

To start working with this project with a Mac, do the following:

1. curl https://install.meteor.com/ | sh
2. cd <directory where you want your code to reside>
3. git clone https://github.com/ambermanry/hungr.git
4. cd hungr
5. meteor
6. go to http://localhost:3000

Before step 5, we may need to do the following (Please let me know if these steps are needed since I would like to update the README):
meteor add react
meteor add firfi:meteor-react-bootstrap

In order to deploy to the publicly available hungr website at http://icfi-hungr.meteor.com, you will need to create a Meteor developer account at http://www.meteor.com.  You must then email amber.manry@icfi.com to be added to the icfi group.  This is only intended for ICF employees.  To test whether you can deploy your changes to meteor version, do the following:

1. cd <hungr dir>
2. meteor add accounts-meteor-developer
3. meteor deploy icfi-hungr.meteor.com



