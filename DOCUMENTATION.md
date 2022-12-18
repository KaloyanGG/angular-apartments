My Project for Renting Apartments

Angular-Apartments is a project developed to give the users the ability to rent apartments, comment on them and authenticate themselves.

It is build on Angular 15.0.3 and uses Firebase as a backend.

For the project structure, we have 3 main modules - auth, core and shared.

In the Authentication module, we have the components for login, register and the user profile.

In the Core module we have all components that are main part of the application. From them you have the ability to see all apartments, details about them with comments and adding to them, and also the ability to add new apartments and see them in the rentals section. Moreover, you have the navigation, main, footer and the page-not-found.

In the Shared module, you can see the interfaces for the data coming from Firebase, and a validator for the password.

In the main folder, there are the services for the authentication and the connection to the Firebase database.

Moreover, the app is deployed in firebase, and the AuthService is initialized at the start of the application.