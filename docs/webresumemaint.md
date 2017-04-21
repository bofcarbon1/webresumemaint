# Web Resume Maintenance Project using Angular 2

# Task Notes

**What We Are Doing**

The purpose of this project task is to build an SPA interface for maintenance of 
the web resume we previously created using a MEAN stack architecture.

Angular 2 is the newest version of Angular (version 1) for Single Page Applications.

**Where We Will Work**

Our development workspace will be on Cloud 9. We will push code changes to a 
Github remote repository

**Interfacing Library Dependencies**

- Npm
  - We use NPM to install application tools.
- Angular-cli
  - Four building our app see the notes below
- TypeScript
  - See the notes below on this scripting language
- Nodejs
  - We use Nodejs as a client side server tool
  - Latest version is 6.9.1 and we are using 6.5.0
- Express
  - We use Express to create our API calls for data usage
- MongoDB
  - We use MongoDB to store web resume data. A database tool that can be installed 
  - and run on the client side. It uses a simple key and value pair structure similar 
  - to JSON and can include array structures at a detail level if desired.



**Using angular-cli**

The Angular team created tool that would make building an Angular application
easier. Like npm and grunt it will create folders and files scaffolding the 
application and its library dependencies. For use with Cloud 9 our current IDE 
tool of choice some adjustments were made after execution. The adjustments were 
primarily about server, port and URL domain requirements.

[https://github.com/angular/angular-cli](https://github.com/angular/angular-cli)

Installing

- $ npm install -g angular-cli
- $ ng new webresume
- $ cd webresume (in Cloud 9 the workspace is at the project root already)
- $ ng serve

**GitHub Remote Repository and Cloud 9 Workspace Local Repository**

We used a remote repository on GitHub to allow code to be viewed by the 
public.

**TypeScript**

TypeScript is the scripting language that is recommended for Angular 2. It is an
open source language developed and maintained by Microsoft. TypeScript provides 
a compiler that will do some checks on syntax that would otherwise be caught only
at run time. To take advantage of this use static typing such as when creating 
variables. Type annotation is a built in feature helpful in identifying language 
usage that tools like the (Google Closure Compiler) can pick up on and expose 
potential errors.

Here is a link to TypeScript Documentation

[https://www.typescriptlang.org/docs/tutorial.html](https://www.typescriptlang.org/docs/tutorial.html)

**Installing**

We can install TypeScript using npm as show below

$ npm install -g typescript   // This command installed version 2.0.3 by entering 
tsc -v)

**Angular 2 Coding**

As stated Angular 2 script code is our choice for UI (view) with HTML5 and TypeScript
code. We take advantage of components, services, templates, directives, routing, pipes
and more.

**Angular2 Application Parts**

| **Component** | **Description** |
| --- | --- |
| Controller (class) | Controls the processing execution and navigation similar to MVC Handles user input and delegate responsibility to the service. They are constructed as a class. |
| Service | Encapsulates business logic including communication with REST, HTTP, WebSockets and WebRTC. Includes domain models and business rules. When there is repeating logic it should be handled in a service and accessed in a controller via dependency injection. |
| Directive | Encapsulate UI with manipulation of the DOM logic. Delegates business logic to a Service. May use DI to use the Service. Use with components and templates. |
| View |   |
| Component | All Angular2 code is built on components. Components extend directives and delegate business logic to services. May use DI to use services. An example might be a tag element in HTML that is customized for example dates or headers, footers. In Angular 1 this was the equivalent of the combination of directives, controllers and scope. That is now all in the component. Components can have child components that are built in a tree structure. Every Angular2 app should start with a root component that could include a header, trailer, side bar and an area for managing view content.   |
| Router | Defines the routes for the application. Only Components are rendered by the Router. The Router uses the Directive to get things like predefined hyperlinks between views. To use routing there are multiple tutorials none of which have been proven to work.   |
| Pipes | Equivalent to what filters used to be in Angular 1 they can be used with Components. You could create a Pipe that transforms data to lowercase or formats with currency for example. |

**The Angular Style Guide**

Conventions for coding in Angular can be found in the link below.

[https://angular.io/styleguide](https://angular.io/styleguide)

**Web Resume Maintenance Angular 2 Project**

Updating our web resume data via Mongo line commands was not realistic. There is a 
RoboMongo tool out there but getting it to work with a free cloud tool is a problem. 
We built a site maintenance interface to handle this. It was done in a separate 
application that uses a home page with links to web resume data interface components 
through Angular 2 **RouterModule, Router** and **Routes**.

The interfaces was broken out by personal, skills and projects. Skills and projects 
begin with a list that has edit and add action buttons. Changes in resume data are 
done through a single detail form with a submit button.

The subsequent action is an **HttpModule HTTP API** call to **Express** that 
handles the data request and returns a response. We will utilize **Observables** to 
make these calls. We use the **RxJs** feature as the structure of this request. 
Observables can handle multiple values over time and are cancellable. This makes them
more efficient in streaming of data in asynchronous call scenarios.

We take advantage of two-way binding and validation with **ReactiveFormsModule.** 
List the items, select and redirect to an updatable form. At the time of this writing
maintaining state of items when modified was a work in progress. A (change) event 
handler was used to modify model class data that interfaces with Observables to call
APIs for data updates. We utilize a service injected into components to helps us keep
this consistent across the application. In phase II of this project that code will 
be reviewed with a technique that will automatically update the model with an implied
two way binding without the need of a (change) event handler.

**What we want web resume maintenance to do**

**Features**

- Main Menu
  - Login and links to the maintenance features
- Update Personal Information (name, title, email, phone, rate, salary, objective)
- Skills
  - List, updates
- Projects
  - List, Updates

**Class Structures**

The following class structures were created

- Site Links
  - Name, URL
- Projects
  - Name, Year, Description
- Skills
  - Name, Description

**Web Resume Maintenance Components, Views, Services, Pipes**

Here are some of the main code folders and files in our application

- Create folder app
  - Create
    - File (app.module.ts)  // NgModule, directives and bootstrap of app
    - File (app.component.ts) // Main component (webresumemaint-app) of app
    - File (routes.ts) // Handle the routing for the app
    - File (webresumemaint.service.ts // Handle data requests via observables
- Create folder project
  - Create
    - File (project.ts) // model for resume projects
    - File (projectHome.ts) // list the resume projects
    - File (update.project.ts)  // Modify or add a resume project
    - Files (projectHome.html) and (update.project.html) // views
- Create folder skill
  - Create
    - File (skill.ts) // model for resume skills
    - File (skillHome.ts) // list the resume skills
    - File (skill.update.ts)  // Modify or add a resume skill
    - Files (skillHome.html) and (skill.update.html) // views
- Create folder sitelink
  - Create
    - File (sitelink.ts) // model for resume web site links
    - File (sitelinkHome.ts) // list the resume web site links
    - File (sitelink.update.ts)  // Modify or add a resume web site link
    - Files (sitelinkHome.html) and (sitelinkl.update.html) // views









**MongoDB**

We are using a MongoDB database to store data for our web resume.

- Start the mongoDB database (use option –-nojournal in Cloud9 because of space issues)
  - $ mongod  –-nojournal
- Proper close (yeah I do not know crazy documentation out there)
- Repair the MongoDB (when not cleanly shutdown
  - $ mongod – repair
-

**Web Resume Data**

MongoDB uses collections which are equivalent to tables. Documents are
structures that are equivalent to JSON value key pairs. MongoDB has a flexible 
structure that allows you to just insert data as you need it.  If you want to take
a de-normalized approach you can mix single items with arrays. We used that 
approach and inserted the single items first for the web resume data and placed 
the arrays last.

- From the Mongo Shell
  - $ mongo
  - Insert data
    - $ db.wr\_personal.insert({emailname: &quot;bofcarbon1&quot;})
  - Update data
    - $ db.wr\_personal.update({&quot;\_id&quot; : ObjectId(&quot;58548f3baf3b420bf48f6172&quot;l}, emailname: &quot;bofcarbon1&quot;)
  - Query data
    - $ db.wr\_personal.find()  // gets all the documents in the collection
    - $ db.wr\_project.count(); // gets a count of all docs in collection
  - Delete data
    - $ db.wr\_project.remove({})  //removes all documents from a collection
- Insert into database **test**
  - Create document **wr\_personal**
    - Contains web resume single string items
  - Array **wr\_services** to hold 3 string service values
  - skill array
    - ** wr\_skills**
  - project array
    - **wr\_projects**

**Express MongoDB APIs**

To get data from our MongoDB database we use an Express server to make data requests
as APIs. We previously created this workspace on Cloud 9 and the code can be found 
on GitHub. You can use my code as a model but do not expect my services to be 
available. I ca not keep them running on the development server.

**Web Resume Maintenance Phase II**

**Authentication**

We just do not want anynone getting in and changing our resume data do we?
No of course not so we added authentication to our maintenance app. 

I took a little from Jason Watmore's post using JWT and authenicating via
a Reactive login form. You can check out his post at the link below.

http://jasonwatmore.com/post/2017/02/22/mean-with-angular-2-user-registration-and-login-example-tutorial

Details are in the workspace document with a short list of highlights below
•	Example based on Jason Watmore’s presentation on authentication in an Angular app
•	User data credentials in MongoDB test document WR_USER (email password and name)
    see Fiddler Play notes for data creation (we are not building an interface to 
    register and maintain the security database. 
•	Express API to return successful credential match with generated JWT token
•	Login using a reactive form
•	Authentication service that is injected into a login component to update the 
    authentication state and to other components that are listening and updating 
    their local authentication boolean values via Input-Output communication. 
•	If you haven’t already don’t it install what you’ll need for JWT
o	$ npm install – save passport
o	$ npm install –save passport-jwt
o	$ npm install –save jsonwebtoken
o	$ npm install –save lodash

We updated our application   

- Create folder _authenticate
 - Create sub folder and files below
    - File (user.ts)  // class model for users to be authenticated
    - File (authentication.service.ts) // login sends credentials and checks token
    - File (login.component.ts)
   

*Two Way Binding**

Address the two-way binding on the reactive form. Remove the change event handler.

**Optimizing Our Application**

**Web Workers**

Web Workers allow us to utilize a multi thread processing approach one for the 
main UI and one that runs in the background. Web Workers use the bundling technique
for loading resources into memory threads. The system.js and loader.js scripts will
work together to achieve this. The background\_bootstrap.js script will start the 
application in the background. Responses to processing events will be communicated
between the main UI and background thread via messaging.

- Modify the main index.html page by adding the following scripts
  - system.source.js
  - angualr2-pollyfills.js
  - ui.dev.js
  - Inline script to configure web workers use and import the bootstrap.js
- Create the following scripts
  - bootstrap.ts
    - Transpiles to include web worker platform and include loader.js
  - loader.ts
    - Imports the scripts needed to run application using web workers



**Testing Our Code**

As mentioned we are working from a workspace on Cloud 9 called webresumemaintproject
and our application project is called webresumemaint.

- From work space webresumrmaintproject
  - nvm use 6.5.0
    - Make sure you are using node 6.5.0 or higher. The above command will set the 
    - version from the default version in your IDE tool. Note that a change was made
    - up around 6.9.0 or higher that forces code changes to configuration and I opted
    - not to be forced into that but if you go that high it will pop its ugly head 
    - out just so you know. Blame the nerds in charge.
  - Change directory to your app (cd webresumemaint)
  - ngserve--host 0.0.0.0--port 8080 --live-reload-port 8081
    - This gets our web resume maintenance app to run on Cloud 9 development

Cloud 9 has designated a URL and host ports that are allowable.  We have chosen to 
use port 8080 so our URL for the main page will look like this. I created 
(expressapis) previously and the code is out in GitHub. That runs on port 8082.

Use the links above to test the Express APIs that retrieve resume data from the MongoDB. You will have to change your domain name by using your own user name. By the way Cloud 9 offers a space for developers to learn to code. This Express API services therefore do not run continuously. I like to use tools like Fiddler 4 to test my APIs.

[https://expressapis-bofcarbon1.c9users.io:8082/api/resume/sitelinks](https://expressapis-bofcarbon1.c9users.io:8082/api/resume/sitelinks)

[https://expressapis-bofcarbon1.c9users.io:8082/api/resume/skills?skilltype=database](https://expressapis-bofcarbon1.c9users.io:8082/api/resume/skills?skilltype=database)

[https://expressapis-bofcarbon1.c9users.io:8082/api/resume/projects?projecttype=web](https://expressapis-bofcarbon1.c9users.io:8082/api/resume/projects?projecttype=web)

For our web resume maintenance enter the link below but remember to change your 
domain name.

http://webresumemaintproject-bofcarbon1.c9users.io:8080/